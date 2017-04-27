/* eslint-disable no-unused-vars */

import React from 'react';
import { Card, CardActions } from 'material-ui/Card';
import { MdComment, MdForum, MdGroup } from 'react-icons/lib/md';
import { yellow200 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router';
import Upvote from './Upvote';

const styles = StyleSheet.create({
  cardStyle: {
    margin: 40,
    // width: '70%',
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
    align: 'center',
  },
  annotationTextStyle: {
    position: 'relative',
    fontSize: 14,
    left: '2%',
  },
  articleTitleTextStyle: {
    fontWeight: 700,
    fontSize: 26,
    lineHeight: 1,
  },
  articleTextStyle: {
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: 100,
    backgroundColor: yellow200,
  },
  cardHeaderStyle: {
    position: 'relative',
    float: 'left',
    maxWidth: '65%',
    paddingLeft: '3%',
    top: 20,
  },
  domainTextStyle: {
    fontSize: 10,
    textDecoration: 'underline',
  },
  articleInfoBar: {
    float: 'right',
    lineHeight: 2,
    textAlign: 'center',
    maxWidth: '27%',
    paddingTop: '3%',
    paddingRight: '3%',
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
      timeSince,
      currentVotes,
      image,
      slug,
    } = this.props;
    return (
      <MuiThemeProvider>
        <Card className={css(styles.cardStyle)}>
          <div className={css(styles.cardHeaderStyle)}>
            <span className={css(styles.articleTitleTextStyle)}>{title}</span>
            <span className={css(styles.domainTextStyle)}><br />{domain}</span>
            <span className={css(styles.articleTextStyle)}><br />&quot;{this.props.subtitle}&quot;</span>
            <br style={{ lineHeight: 2 }} />
            <div>
              <span style={{ fontWeight: 900, padding: 10 }}>{username}</span>
              <span style={{ fontStyle: 'italic', padding: 10 }}>{points} points</span>
              <span>{timeSince} ago</span>
              <span className={css(styles.annotationTextStyle)}><br />{this.props.annotationContent}</span>
            </div>
          </div>
          <aside className={css(styles.articleInfoBar)}>
            <span><MdGroup /> {`     ${numUsers}`} users</span>
            <span><MdComment /> {`     ${this.props.numAnnotations}`} annotations</span>
            <img width={'100%'} src={image} alt="card" />
          </aside>
          <CardActions style={{ clear: 'both', position: 'relative', left: '35%', padding: '3%' }}>
            <Link
              to={{
                pathname: `/discussion/${slug}`,
                state: {
                  articleId: slug,
                },
              }}
            >
              <RaisedButton style={{ top: '10%' }} label="SEE DISCUSSION" />
            </Link>
            <a href={domain} target="_blank" rel="noopener noreferrer"><RaisedButton style={{ top: '10%', leftMargin: '20px' }} label="VIEW ORIGINAL ARTICLE" /></a>
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
  points: React.PropTypes.number.isRequired,
  timeSince: React.PropTypes.string.isRequired,
  image: React.PropTypes.string.isRequired,
  currentVotes: React.PropTypes.number.isRequired,
  slug: React.PropTypes.string.isRequired,
};

export default ArticleCard;
