import React, { PropTypes } from 'react';
import ArticleCard from '../../../components/ArticleCard';

// set narrowCard to true here if want smaller card

function convertName(name) {
  const filteredName = name.split(' ');

  if (filteredName.length >= 2) {
    if (filteredName[1].charAt(0)) { // If it's not null
      return `${`${filteredName[0]} ${filteredName[1][0]}`}.`;
    }
  }
  return name;
}

const ArticleItem = props => (
  <ArticleCard
    title={props.title}
    domain={props.articleURI}
    subtitle={props.annotations.length > 0 ? props.annotations[0].articleText : 'article text'}
    annotationContent={props.annotations.length > 0 ? props.annotations[0].text : 'text'}
    image={props.imageURL}
    username={props.annotations[0] && props.annotations[0].author ? convertName(props.annotations[0].author.name) : 'Anonymous'}
    timeSince={props.annotations[0] ? props.annotations[0].createDate : String(Date.now())}
    numUsers={0}
    numAnnotations={props.annotations.length}
    numReplies={1}
    currentVotes={1}
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
