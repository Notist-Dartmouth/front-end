/* I'm being a bad dude and disabling some eslint rules on a per file basis -- Byrne */
/* eslint-disable no-unused-vars */

import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { StyleSheet, css } from 'aphrodite';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import { grey300, white, fullBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle-outline';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    textColor: fullBlack,
    primaryText: fullBlack,
    secondaryText: fullBlack,
  },
  userAgent: (typeof navigator !== 'undefined' && navigator.userAgent) || 'all',
});

const styles = StyleSheet.create({
  radioButton: {
    textColor: fullBlack,
    width: '25%',
    display: 'inline-block',
  },
  radioContainer: {
    marginTop: 15,
    textAlign: 'center',
  },
  groupInput: {
    display: 'block',
    width: '75%',
    margin: '10px auto',
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
      <MuiThemeProvider muiTheme={muiTheme}>
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
            <div>
              <TextField
                id="name"
                className={css(styles.groupInput)}
                hintText="Group Name"
                onChange={this.props.onChange}
                errorText={this.props.validName ? '' : 'Group name is required'}
              />
              <TextField
                id="description"
                className={css(styles.groupInput)}
                hintText="Description"
                onChange={this.props.onChange}
              />
            </div>
            <RadioButtonGroup
              name="groupType"
              className={css(styles.radioContainer)}
              defaultSelected="public"
              onChange={this.props.onRadioToggle}
            >
              <RadioButton
                className={css(styles.radioButton)}
                value="public"
                label="Public"
              />
              <RadioButton
                className={css(styles.radioButton)}
                value="personal"
                label="Personal"
              />
            </RadioButtonGroup>
          </Dialog>
        </span>
      </MuiThemeProvider>
    );
  }
}

CreateGroupDialog.PropTypes = {
  validName: PropTypes.bool.isRequired,
  onRadioToggle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateGroupDialog;
