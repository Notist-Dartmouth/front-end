/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

import React from 'react';
import { Card, CardActions } from 'material-ui/Card';
import { yellow200, yellow400, red700, grey900, fullBlack, deepOrange100, indigo100, amber100, teal100 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    paddingLeft: 30,
    paddingTop: 10,
    paddingRight: 30,
    '@media (max-width: 1000px)': {
      flexDirection: 'column',
    },
  },
  articleTitleBar: {
    paddingLeft: 30,
    paddingTop: 10,
    paddingRight: 10,
  },
  leftFlex: {
    flex: 2,
  },
  rightFlex: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  imageStyle: {
    alignSelf: 'center',
  },
  usersAndAnnotations: {
    display: 'flex',
    justifyContent: 'space-around',
    '@media (max-width: 1000px)': {
      display: 'none',
    },
  },
  cardButtons: {
    paddingTop: 40,
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    '@media (max-width: 900px)': {
      flexDirection: 'column',
      margin: 10,
      alignItems: 'center',
    },
  },
  bottomButton: {
    '@media (max-width: 900px)': {
      marginTop: 15,
    },
  },
  annotationTextStyle: {
    position: 'relative',
    fontSize: 21,
  },
  articleTitleTextStyle: {
    fontWeight: 700,
    fontSize: 33,
  },
  articleTextStyle: {
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: 100,
    backgroundColor: yellow200,
  },
  domainTextStyle: {
    fontSize: 17,
    textDecoration: 'underline',
  },
  publishedTime: {
    fontSize: 15,
  },
});

class GroupCard extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubscribeClick = this.handleSubscribeClick.bind(this);
  }

  state = {
    subscribed: this.props.subscribed,
  };

  handleSubscribeClick = () => {
    this.setState({ subscribed: !this.state.subscribed });
  }

  render() {
    let subButton = null;

    if (this.state.subscribed) { // Check if subscribed to group
      subButton = <RaisedButton label="subscribe" onClick={this.handleSubscribeClick} backgroundColor={yellow400} labelColor={grey900} />;
    } else {
      subButton = <RaisedButton label="unsubscribe" onClick={this.handleSubscribeClick} backgroundColor={red700} />;
    }

    let cardStyle;
    if (this.props.narrowCard) {
      cardStyle = {
        maxWidth: '40%',
        margin: 30,
      };
    } else {
      cardStyle = {
        margin: 30,
      };
    }

    return (
      <MuiThemeProvider>
        <Card style={cardStyle}>
          <div className={css(styles.articleTitleBar)}>
            <p>{this.props.title}</p>
          </div>
          {subButton}
        </Card>
      </MuiThemeProvider>
    );
  }
}

GroupCard.propTypes = {
  title: React.PropTypes.string.isRequired,
  subscribed: React.PropTypes.bool.isrequired,
};

GroupCard.defaultProps = {
  title: 'Group Title',
  subscribed: true,
};

export default GroupCard;
