import React, { Component } from 'react';
import ArrowDropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import config from '../../server/config';

function handleLogout() {
  window.location = `${config.apiHost}/logout`;
}

export default class ArrowDropDown extends Component {

  constructor(props) {
    super(props);
    this.state = { value: 1 };
  }

  handleProfileClick = () => {
    window.location = `${config.host}/profile/${this.props.userId}`;
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
          <MenuItem primaryText="Profile" onClick={this.handleProfileClick} />
          <MenuItem primaryText="Logout" onClick={handleLogout} />
        </IconMenu>
      </div>
    );
  }
}

ArrowDropDown.defaultProps = {
  userId: '1',
};

// <MenuItem primaryText="Profile" onClick={handleProfileClick} />
// <MenuItem primaryText="Logout" onClick={handleLogout} />
