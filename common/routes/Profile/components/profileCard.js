import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import { yellow200, red400, grey100, grey900 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { StyleSheet, css } from 'aphrodite';
// import PeopleIcon from 'material-ui/svg-icons/social/people';
import { connect } from 'react-redux';
// import Avatar from 'material-ui/Avatar';
import { toggleFollowUser } from '../actions';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    paddingLeft: 30,
    paddingTop: 10,
    paddingRight: 30,
    '@media (max-width: 1000px)': {
      flexDirection: 'column-reverse',
    },
  },
  subButton: {
    fontSize: 22,
    fontWeight: 600,
  },
  buttonContainer: {
    paddingRight: 20,
  },
  groupInfo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 1000px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingBottom: 20,
    },
  },
  groupTitle: {
    fontSize: 30,
    fontWeight: 600,
  },
  groupAge: {
    fontSize: 15,
    fontWeight: 300,
  },
  groupDescription: {
    fontSize: 23,
    fontWeight: 400,
    paddingLeft: 30,
    paddingTop: 20,
  },
  memberInfo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
  },
  numMembers: {
    fontSize: 15,
    fontWeight: 600,
    paddingLeft: 5,
  },
  memberIcon: {
    paddingLeft: 15,
    fontSize: 20,
    marginTop: 7,
  },
  cardStyle: {
    margin: 20,
    paddingTop: 10,
    paddingBottom: 20,
    paddingRight: 20,
    // width: '100%',
  },
});

const isFollowing = false;

class ProfileCard extends Component {

  constructor(props) {
    super(props);
    this.handleFollowClick = this.handleFollowClick.bind(this);
  }

  handleFollowClick = () => {
    this.props.dispatch(toggleFollowUser(this.props.groupId));
  }

  render() {
    console.log('showFollowButton');
    console.log(this.props.showFollowButton);
    console.log(this.props.name);

    let followButton = null;

    if (isFollowing) { // Check if subscribed to group
      followButton = <RaisedButton className={css(styles.subButton)} label="Unfollow" onClick={this.handleFollowClick} backgroundColor={red400} labelColor={grey100} />;
    } else {
      followButton = <RaisedButton className={css(styles.subButton)} label="Follow" onClick={this.handleFollowClick} backgroundColor={yellow200} labelColor={grey900} />;
    }

    return (
      <MuiThemeProvider>
        <Card className={css(styles.cardStyle)}>
          <div className={css(styles.flexContainer)}>
            {/* <Avatar src="https://i.imgur.com/4h5V7Jp.jpg" /> */}
            <div className={css(styles.groupInfo)}>
              <div className={css(styles.groupTitle)}>
                {this.props.name}
              </div>
              <div className={css(styles.memberInfo)}>
                {/* <div className={css(styles.memberIcon)}><PeopleIcon /></div> */}
                {/* <div className={css(styles.numMembers)}>{this.props.numMembers === 1 ? `${this.props.numMembers} follower` : `${this.props.numMembers} followers`}</div> */}
              </div>
              <div className={css(styles.buttonContainer)}>
                {this.props.showFollowButton ? followButton : ''}
              </div>
            </div>
          </div>
          <div className={css(styles.groupDescription)}>
            {/*  {this.props.blurb} */}
          </div>
        </Card>
      </MuiThemeProvider>
    );
  }
}

ProfileCard.propTypes = {
  groupId: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

ProfileCard.defaultProps = {
  groupId: '',
  title: 'Group Title',
  subscribed: false,
  showFollowButton: false,
  error: '',
};

export default connect()(ProfileCard);
