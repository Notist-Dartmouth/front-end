import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { styles, muiTheme } from '../styles/styles';


export default class MyCard extends Component {
  constructor(props) {
    super(props);
    this.title = props.title;
  }

  render() {
    return (

      <MuiThemeProvider muiTheme={muiTheme}>
        <Card>
          <CardHeader style={styles.cardHeader}
            title={this.title}
            subtitle="The president tends to grow frustrated if crucial\
            intelligence is not delivered within the first seven letters or so.\
            We recently gave him a briefing that consisted only of the term ‘nuclear proliferation,’\
            but he clearly became distracted by the end of the"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardActions>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions>
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}
