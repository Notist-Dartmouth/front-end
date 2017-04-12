/* I'm being a bad dude and disabling some eslint rules on a per file basis -- Byrne */
/* eslint-disable no-unused-vars */

import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { RadioButton } from 'material-ui/RadioButton';
import { StyleSheet, css } from 'aphrodite';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import { grey300, white, fullBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle-outline';

const styles = StyleSheet.create({
  radioButton: {
    textColor: fullBlack,
    marginTop: 16,
  },
  groupInput: {
    display: 'block',
    width: '75%',
    margin: '0 auto',
  },
});

/**
 * Dialog content can be scrollable.
 */
class CreateGroupDialog extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
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
        onClick={this.props.onSubmit}
        keyboardFocused
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <span>
        <IconButton tooltip="Add a group" onTouchTap={this.handleOpen}>
          <AddCircle color={white} hoverColor={grey300} />
        </IconButton>
        <Dialog
          titleStyle={{ color: fullBlack }}
          title="Add a group"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <TextField
            className={css(styles.groupInput)}
            hintText="Group Name"
            onChange={this.props.onChange}
            errorText={this.props.validName ? '' : 'Group name is required'}
          />
          <TextField
            className={css(styles.groupInput)}
            hintText="Description"
            onChange={this.props.onChange}
            multiline
          />
        </Dialog>
      </span>
    );
  }
}

CreateGroupDialog.propTypes = {
  validName: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateGroupDialog;
