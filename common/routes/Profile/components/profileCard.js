import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import { yellow200, red400, grey100, grey900 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { StyleSheet, css } from 'aphrodite';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { editBio, toggleFollowUser } from '../actions';

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
    this.state = {
      markdown: '',
    };
    this.handleFollowClick = this.handleFollowClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEditPost = this.handleEditPost.bind(this);
    this.updateMarkdown = this.updateMarkdown.bind(this);
  }

  handleFollowClick = () => {
    toggleFollowUser(this.props.profileId); // Will also fetch current user again and update groups
  }

  handleEditClick = () => {
    this.props.dispatch({ type: 'TOGGLE_EDIT', isEditing: this.props.isEditing });
  }

  handleEditPost = (editText) => {
    this.props.dispatch(editBio(this.props.userId, this.state.markdown));
  }

  updateMarkdown(event) {
    this.setState({ markdown: event.target.value });
  }

  render() {
    console.log('Here is the info!');
    console.log(this.props.info);
    let followButton = null;

    if (!this.props.isUsersProfile) {
      if (isFollowing) { // Check if subscribed to group
        followButton = <RaisedButton className={css(styles.subButton)} label="Unfollow" onClick={this.handleFollowClick} backgroundColor={red400} labelColor={grey100} />;
      } else {
        followButton = <RaisedButton className={css(styles.subButton)} label="Follow" onClick={this.handleFollowClick} backgroundColor={yellow200} labelColor={grey900} />;
      }
    }

    /* eslint-disable */

    return (
      <MuiThemeProvider>
        <Card className={css(styles.cardStyle)}>
          <div className={css(styles.flexContainer)}>
            <Avatar src={this.props.info.photoSrc} />
            <div className={css(styles.groupInfo)}>
              <div className={css(styles.groupTitle)}>
                {this.props.info.name}
              </div>
              <div className={css(styles.memberInfo)}>
                <div className={css(styles.memberIcon)}><PeopleIcon /></div>
                <div className={css(styles.numMembers)}>{this.props.info.usersFollowingMe.length === 1 ? `${this.props.info.usersFollowingMe.length} follower` : `${this.props.info.usersFollowingMe.length} followers`}</div>
              </div>
              <div className={css(styles.buttonContainer)}>
                {this.props.isUsersProfile ? '' : followButton}
              </div>
            </div>
          </div>
          <div className={css(styles.groupDescription)}>
            {this.props.isEditing ?
              <div>
                <textarea onChange={this.updateMarkdown}>
                  {this.props.info.bio}
                </textarea>
                <RaisedButton onClick={this.handleEditPost} label="Post" />
              </div> : this.props.info.bio}
            <div>
              {this.props.isUsersProfile ? <IconButton tooltip="Edit" onClick={this.handleEditClick} ><EditIcon /></IconButton> : ''}
            </div>
          </div>

        </Card>
      </MuiThemeProvider>
    );
  }
}

ProfileCard.defaultProps = {
  subscribed: false,
  isUsersProfile: false,
  error: '',
};

const mapStateToProps = state => ({
  isEditing: state.Profile ? state.Profile.isEditing : false,
  editText: state.Profile ? state.Profile.editText : '',
});

export default connect(mapStateToProps)(ProfileCard);
