/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

import React from 'react';
import { Card, CardActions } from 'material-ui/Card';
import { MdComment, MdForum, MdGroup } from 'react-icons/lib/md';
import { yellow200, fullBlack, deepOrange100, indigo100, amber100, teal100 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import marked from 'marked';
import { StyleSheet, css } from 'aphrodite';
import moment from 'moment';
import { Link } from 'react-router';
import Upvote from './Upvote';

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
});

class ArticleCard extends React.Component {
  render() {
    const {
      title,
      domain,
      numUsers,
      numReplies,
      username,
      points,
      currentVotes,
      image,
      slug,
    } = this.props;
    const timeSince = moment(this.props.timeSince).fromNow();
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
            <span className={css(styles.articleTitleTextStyle)}>{title || <a href="https://docs.google.com/forms/d/e/1FAIpQLScKa0F2eyB9fpUbVB9LrCGnwhnWHbiU-eJ2Ab4vPTC5LcUM9g/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer"> No title gotten from article. Submit a bug report?</a>}</span>
          </div>
          <div className={css(styles.flexContainer)}>
            <div className={css(styles.leftFlex)}>
              <div className={css(styles.domainTextStyle)}>
                <a style={{ color: fullBlack }} href={domain} target="_blank" rel="noopener noreferrer">{domain}</a>
              </div>
              <div style={{ marginTop: 8 }}>
                <span className={css(styles.articleTextStyle)}>&quot;{this.props.subtitle}&quot;</span>
              </div>
              <div style={{ marginTop: 8 }}>
                <span style={{ fontWeight: 900 }}>{username}</span>
                <span style={{ paddingLeft: 12 }}>{timeSince}</span>
                <div className={css(styles.annotationTextStyle)} dangerouslySetInnerHTML={{ __html: marked(this.props.annotationContent || '') }} />
              </div>
            </div>
            {this.props.narrowCard ? '' :
            <div className={css(styles.rightFlex)}>
              <div className={css(styles.usersAndAnnotations)}>
                {/* <span><MdGroup /> {numUsers} users</span> */}
                <span><MdComment /> {this.props.numAnnotations} {this.props.numAnnotations > 1 ? 'annotations' : 'annotation'}</span>
              </div>
              <div className={css(styles.imageStyle)}>
                <img height={'250px'} src={image || 'https://i.imgur.com/4h5V7Jp.jpg'} alt="article top" />
              </div>
            </div> }
          </div>
          <CardActions className={css(styles.cardButtons)}>
            <Link
              to={{
                pathname: `/discussion/${slug}`,
                state: {
                  articleId: slug,
                  articleURI: domain,
                },
              }}
            >
              <RaisedButton backgroundColor={'#FFCC80'} className={css(styles.bottomButton)} label="See Discussion" />
            </Link>
            <a href={domain} target="_blank" rel="noopener noreferrer"><RaisedButton backgroundColor={'#b6d3d9'} className={css(styles.bottomButton)} label="View Original Article" /></a>
          </CardActions>
        </Card>
      </MuiThemeProvider>
    );
  }
}

ArticleCard.propTypes = {
  title: React.PropTypes.string.isRequired,
  domain: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string.isRequired,
  annotationContent: React.PropTypes.string.isRequired,
  numUsers: React.PropTypes.number.isRequired,
  numAnnotations: React.PropTypes.number.isRequired,
  numReplies: React.PropTypes.number.isRequired,
  username: React.PropTypes.string.isRequired,
  timeSince: React.PropTypes.string.isRequired,
  image: React.PropTypes.string.isRequired,
  currentVotes: React.PropTypes.number.isRequired,
  slug: React.PropTypes.string.isRequired,
};

export default ArticleCard;
