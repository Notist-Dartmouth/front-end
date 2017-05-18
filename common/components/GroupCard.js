/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

import React from 'react';
import { Card, CardActions } from 'material-ui/Card';
import { yellow200, yellow400, red400, grey100, grey900, fullBlack, deepOrange100, indigo100, amber100, teal100 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { StyleSheet, css } from 'aphrodite';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import { Link } from 'react-router';
import moment from 'moment';
import { connect } from 'react-redux';
import { toggleGroupMembership, fetchUser } from '../routes/PostList/actions';

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

class GroupCard extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubscribeClick = this.handleSubscribeClick.bind(this);
  }

  handleSubscribeClick = () => {
    this.props.dispatch(toggleGroupMembership(this.props.groupId));
  }

  render() {
    let name = 'Anonymous';
    if (this.props.creatorName) {
      name = this.props.creatorName;
      const filteredName = this.props.creatorName.split(' ');

      if (filteredName.length >= 2) {
        if (filteredName[1].charAt(0)) { // If it's not null
          name = `${`${filteredName[0]} ${filteredName[1][0]}`}.`;
        }
      }
    }

    let subButton = null;

    const timeSince = moment(this.props.createdDate).fromNow();

    if (this.props.subscribed) { // Check if subscribed to group
      subButton = <RaisedButton className={css(styles.subButton)} label="unsubscribe" onClick={this.handleSubscribeClick} backgroundColor={red400} labelColor={grey100} />;
    } else {
      subButton = <RaisedButton className={css(styles.subButton)} label="subscribe" onClick={this.handleSubscribeClick} backgroundColor={yellow200} labelColor={grey900} />;
    }

    return (
      <MuiThemeProvider>
        <Card className={css(styles.cardStyle)}>
          <div className={css(styles.flexContainer)}>
            <div className={css(styles.buttonContainer)}>
              {subButton}
            </div>
            <div className={css(styles.groupInfo)}>
              <div className={css(styles.groupTitle)}>
                {this.props.title}
              </div>
              <div className={css(styles.memberInfo)}>
                <div className={css(styles.memberIcon)}><PeopleIcon /></div>
                <div className={css(styles.numMembers)}>{this.props.numMembers === 1 ? `${this.props.numMembers} member` : `${this.props.numMembers} members`}</div>
              </div>
              <div className={css(styles.groupAge)}>
                {/* turn into momentjs call for timeSince and also use string template to get group creator */}
                {`Group created ${timeSince} by ${name}`}
              </div>
            </div>
          </div>
          <div className={css(styles.groupDescription)}>
            {this.props.description}
          </div>
        </Card>
      </MuiThemeProvider>
    );
  }
}

GroupCard.propTypes = {
  groupId: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  createdDate: React.PropTypes.string.isRequired,
  creatorName: React.PropTypes.string.isRequired,
  numMembers: React.PropTypes.number.isRequired,
  subscribed: React.PropTypes.bool.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

GroupCard.defaultProps = {
  groupId: '',
  title: 'Group Title',
  subscribed: false,
  error: '',
};

export default connect()(GroupCard);
