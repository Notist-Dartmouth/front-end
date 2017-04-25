import React, { PropTypes } from 'react';
import ArticleCard from '../../../components/ArticleCard';

const ArticleItem = props => (
  <ArticleCard
    title="Title"
    domain={props.articleURI}
    subtitle={props.annotations.length > 0 ? props.annotations[0].articleText : 'article text'}
    annotationContent={props.annotations.length > 0 ? props.annotations[0].text : 'text'}
    image=""
    username="merwin"
    points={16}
    timeSince="2 hours"
    numUsers={2}
    numAnnotations={props.annotations.length}
    numReplies={4}
    currentVotes={43}
    slug={props.articleID}
  />
);

ArticleItem.propTypes = {
  articleURI: PropTypes.string.isRequired,
  articleID: PropTypes.string.isRequired,
  annotations: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    articleText: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
};

export default ArticleItem;
