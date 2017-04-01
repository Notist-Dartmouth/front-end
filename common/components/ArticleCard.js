import React from 'react';
import { Card, CardActions, CardMedia } from 'material-ui/Card';
import { MdComment, MdForum, MdGroup } from 'react-icons/lib/md';
import { yellow200 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
{/* import Upvote from './Upvote'; */}
{/* how do I do const muiTheme = getMuiTheme */}

const styles = {
  overlayContainer: {
    position: 'relative',
    left: '70%',
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

  cardStyle: {
    position: 'relative',
    top: 80,
    left: '18%',
    width: '56%',
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
  },

  articleInfoBar: {
    float: 'right',
    lineHeight: 2,
    textAlign: 'center',
    maxWidth: '27%',
    paddingTop: '3%',
    paddingRight: '3%',
  },

  annotationAndInfo: {
    paddingLeft: '5%',
  },

};

class ArticleCard extends React.Component {
  constructor(props) {
    // spread operator?
    super(props);
    this.title = props.title;
    this.domain = props.domain;
    this.subtitle = props.subtitle;
    this.annotationContent = props.annotationContent;
    this.numUsers = props.numUsers;
    this.numAnnotations = props.numAnnotations;
    this.numReplies = props.numReplies;
    this.username = props.username;
    this.points = props.points;
    this.timeSince = props.timeSince;
    this.currentVotes = props.currentVotes;
    this.image = props.image;
  }

  render() {
    return (
      <Card style={styles.cardStyle}>
        <div style={styles.cardHeaderStyle}>
          <span style={styles.articleTitleTextStyle}>{this.title}</span>
          <span style={styles.domainTextStyle}><br></br>{this.domain}</span>
          <span style={styles.articleTextStyle}><br></br>"{this.subtitle}"</span>
          <br style={{lineHeight: 2}}></br>
          <div class="vote" style={{float: 'left'}}>
            <Upvote beforeContent={this.currentVotes}/>
          </div>
          <div style={styles.annotationAndInfo}>
            <span style={{fontWeight: 900, padding: 10}}>{this.username}</span>
            <span style={{fontStyle: 'italic', padding: 10}}>{this.points} points</span>
            <span> {this.timeSince} ago</span>
            <span style={styles.annotationTextStyle}><br></br>{this.annotationContent}</span>
          </div>
          </div>
          <aside style={styles.articleInfoBar}>
            <span><MdGroup/> {"   " + this.numUsers} users  </span>
            <span><MdComment /> {"   " + this.numAnnotations} annotations  </span>
            <span><MdForum /> {"   " + this.numReplies} replies</span>
            <CardMedia>
        // overlayContainerStyle={styles.overlayContainer}
        // overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
              <img src={this.image} />
            </CardMedia>
          </aside>
        <CardActions style={{clear: 'both', position: 'relative', left: '41%', padding: '3%'}}>
          <RaisedButton style={{top: '10%'}} label="See more"/>
        </CardActions>
      </Card>
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
};

export default ArticleCard;