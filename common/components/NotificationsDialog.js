/* I'm being a bad dude and disabling some eslint rules on a per file basis -- Byrne */
/* eslint-disable no-unused-vars */

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { StyleSheet, css } from 'aphrodite';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import { grey300, white, fullBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchNotifications, fetchNumUnreadNotifications } from '../routes/PostList/actions';


const styles = StyleSheet.create({
  radioButton: {
    marginTop: 16,
  },
});

/**
 * Dialog content can be scrollable.
 */
class NotificationsDialog extends React.Component {

  state = {
    open: false,
    notifications: [],
  };

  handleClick = () => {
    Promise.resolve(this.props.dispatch(fetchNotifications())).then((notifications) => {
      this.props.dispatch(fetchNumUnreadNotifications);
      this.handleOpen(notifications);
    });
  }

  handleOpen = (notifications) => {
    this.setState({ open: true, notifications });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={this.handleClose}
      />,
    ];

    const radios = [];
    for (let i = 0; i < 20; i += 1) {
      radios.push(
        <RadioButton
          key={i}
          value={`value${i + 1}`}
          label={`Option ${i + 1}`}
        />,
      );
    }

    return (
      <div>
        <Badge
          badgeContent={this.props.numUnreadNotifications}
          secondary
          badgeStyle={{ top: 12, right: 12 }}
        >
          <IconButton tooltip="Notifications" onTouchTap={this.handleClick}>
            <NotificationsIcon color={white} hoverColor={grey300} />
          </IconButton>
        </Badge>
        <Dialog
          titleStyle={{ color: fullBlack }}
          title="Notifications"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          {this.props.notifications ? this.props.notifications.map((notification, i) => {
            let name = 'Anonymous';
            if (notification.sender && notification.sender.name) {
              name = notification.sender.name;
              const filteredName = notification.sender.name.split(' ');

              if (filteredName.length >= 2) {
                if (filteredName[1].charAt(0)) { // If it's not null
                  name = `${`${filteredName[0]} ${filteredName[1][0]}`}.`;
                }
              }
            }
            const timeSince = moment(notification.createDate).fromNow();
            return <a href={notification.href}>{`${name} replied to your comment ${timeSince} \n`}</a>;
          }) : ''
        }
          <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
            {radios}
          </RadioButtonGroup>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  numUnreadNotifications: state.articles ? state.articles.numUnreadNotifications : 0,
  notifications: state.articles ? state.articles.notifications : [],
});


export default connect(mapStateToProps)(NotificationsDialog);
