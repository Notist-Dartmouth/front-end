// Almost the same as a myCard object but with an avatar section in cardHeader

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import { styles, muiTheme } from '../../Discussion/styles/styles';

// Need to get the profilePicture from the API here
// Call as props.profilePicture -- get from state


class ProfileCard extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Card>
          <CardHeader style={styles.cardHeader}
            title={this.props.name}
            subtitle={this.props.blurb}
            avatar="https://i.imgur.com/4h5V7Jp.jpg"
            actAsExpander
          />
          <CardActions>
            <FlatButton label="Follow" />
          </CardActions>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default ProfileCard;
