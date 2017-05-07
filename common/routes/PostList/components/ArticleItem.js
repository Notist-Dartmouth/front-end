import React, { PropTypes } from 'react';
import ArticleCard from '../../../components/ArticleCard';

// set narrowCard to true here if want smaller card

const ArticleItem = props => (
  <ArticleCard
    title={props.title}
    domain={props.articleURI}
    subtitle={props.annotations.length > 0 ? props.annotations[0].articleText : 'article text'}
    annotationContent={props.annotations.length > 0 ? props.annotations[0].text : 'text'}
    image={props.imageURL}
    username="ethan"
    points={1}
    timeSince="1 minute"
    numUsers={2}
    numAnnotations={props.annotations.length}
    numReplies={1}
    currentVotes={0}
    slug={props.articleID}
  />
);

ArticleItem.propTypes = {
  articleURI: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  articleID: PropTypes.string.isRequired,
  annotations: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    articleText: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
};

export default ArticleItem;
