import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { styles, muiTheme } from '../../Discussion/styles/styles';

// Pass an annotation prop in here with fields title, subtitle, and expandableText

export default class MyCard extends Component {

  render() {
    return (

      <MuiThemeProvider muiTheme={muiTheme}>
        <Card>
          <CardHeader style={styles.cardHeader}
            title={this.props.annotation.articleText}
            subtitle={this.props.annotation.text}
            actAsExpander
            showExpandableButton
          />
          <CardActions>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions>
          <CardText expandable>
            {this.props.annotation.expandableText}
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}
