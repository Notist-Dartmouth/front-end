import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { StyleSheet, css } from 'aphrodite';
import { yellow200 } from 'material-ui/styles/colors';
import { Card, CardText } from 'material-ui/Card';
import moment from 'moment';
import { muiTheme } from '../../Discussion/styles/styles';


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

              {/* <Avatar  */}
              {/*  src={'https://i.imgur.com/9zgiD0u.jpg'} */}
              {/*    size={35} */}
              {/*  /> */}

              <div className={css(styles.authorLine)}>
                <div className={css(styles.authorAndTime)}>
                  <div className={css(styles.authorName)}>
                    <b>{this.props.annotation.creatorName}</b>
                  </div>
                  {moment(this.props.annotation.createDate).fromNow()}
                </div>
              </div>
              {/* {madeThisComment ?
                <IconMenu
                  style={{ marginLeft: '96%', marginRight: '25px' }}
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                  <MenuItem primaryText="Edit" onClick={this.handleEditReply}/>
                  <MenuItem primaryText="Delete" onClick={this.handleDeleteReply} />
                </IconMenu> : ''}
              <br /> <br /> */}

              <div style={{
                display: 'inline',
                fontStyle: 'italic',
                backgroundColor: yellow200,
              }}
              >
                {(this.props.id === 0) ? this.props.articleText : ''}
              </div>
            </CardText>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Annotation;
