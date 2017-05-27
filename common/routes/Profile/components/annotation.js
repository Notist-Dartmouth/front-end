import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader } from 'material-ui/Card';
import { styles, muiTheme } from '../../Discussion/styles/styles';

// Pass an annotation prop in here with fields title, subtitle, and expandableText

class Annotation extends Component {

  constructor(props) {
    super(props);
    this.annotation = this.props.annotation;
  }

  render() {
    console.log('EXECUTING RENDER OF AN ANNOTATION');
    console.log(`Hi, the value inside annotation is: ${this.annotation}`);
    console.log(this.props.annotation);
    return (

      <MuiThemeProvider muiTheme={muiTheme}>
        <Card>
          <CardHeader style={styles.cardHeader}
            title={this.props.annotation.parent === null ? this.props.annotation.articleText : ''}
            subtitle={<a href={`http://localhost:5000/discussion/${this.props.annotation.article}`}>{this.props.annotation.text}</a>}
          />
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default Annotation;
