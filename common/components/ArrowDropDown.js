import React, { Component } from 'react';
import ArrowDropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import config from '../../server/config';

function handleLogout() {
  window.location = `${config.apiHost}/logout`;
}

function handleProfileClick() {
  window.location = `${config.host}/profile/1`; // ${this.props.userId}`;
}

export default class ArrowDropDown extends Component {

  constructor(props) {
    super(props);
    this.state = { value: 1 };
  }

  render() {
    return (
      <div>
        <IconMenu
          iconButtonElement={<IconButton><ArrowDropDownIcon /></IconButton>}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          listStyle={{ color: 'black !important' }}
          menuStyle={{ backgroundColor: 'red', color: 'black !important' }}
        >
          <MenuItem primaryText="Profile" onClick={handleProfileClick} />
          <MenuItem primaryText="Logout" onClick={handleLogout} />
        </IconMenu>
      </div>
    );
  }
}

// <MenuItem primaryText="Profile" onClick={handleProfileClick} />
// <MenuItem primaryText="Logout" onClick={handleLogout} />
