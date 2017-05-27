import React, { Component } from 'react';
import ArrowDropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

export default class ArrowDropDown extends Component {

  constructor(props) {
    super(props);
    this.state = { value: 1 };
  }

  handleProfileClick() {
    console.log('Profile!');
    this.state.value = 5;
  }

  handleLogout() {
    console.log('Logout!');
    this.state.value = 5;
  }

  render() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><ArrowDropDownIcon /></IconButton>}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem primaryText="Profile" onClick={this.handleProfileClick} />
        <MenuItem primaryText="Logout" onClick={this.handleLogout} />
      </IconMenu>
    );
  }
}
