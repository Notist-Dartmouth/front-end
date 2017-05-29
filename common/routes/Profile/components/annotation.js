import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { StyleSheet, css } from 'aphrodite';
import { yellow200 } from 'material-ui/styles/colors';
import { Card, CardText } from 'material-ui/Card';
import moment from 'moment';
import { muiTheme } from '../../Discussion/styles/styles';
import config from '../../../../server/config';

// Pass an annotation prop in here with fields title, subtitle, and expandableText

const styles = StyleSheet.create({
  authorLine: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  authorAndTime: {
    display: 'flex',
  },
  authorName: {
    paddingRight: 10,
  },
});

class Annotation extends Component {

  constructor(props) {
    super(props);
    this.annotation = this.props.annotation;
  }

  render() {
    console.log('Annotation: ');
    console.log(this.props.annotation);

    return (
      <div style={{
        paddingTop: 2,
        paddingRight: 10,
        paddingLeft: 10,
      }}
      >
        <MuiThemeProvider muiTheme={muiTheme}>
          <Card>
            <CardText expandable={false}>
              <div className={css(styles.authorLine)}>
                <div className={css(styles.authorAndTime)}>
                  <div className={css(styles.authorName)}>
                    <b>{this.props.annotation.creatorName}</b>
                  </div>
                  {moment(this.props.annotation.createDate).fromNow()}
                </div>
              </div>
              <div style={{
                display: 'inline',
                fontStyle: 'italic',
                backgroundColor: yellow200,
              }}
              >
                {this.props.annotation.articleText} <br /><br />
              </div>
              <a href={`${config.host}/discussion/${this.props.annotation.article}`}>{this.props.annotation.text}</a>
            </CardText>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Annotation;
