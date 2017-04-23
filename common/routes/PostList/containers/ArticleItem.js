import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ArticleCard from '../../../components/ArticleCard';

class ArticleItem extends Component {
  constructor(props) {
    super(props);
    this.articleAnnotations = props.annotations.filter(a => a.article === props.articleId);
    this.articleText = this.articleAnnotations.length > 0 ? this.articleAnnotations[0].articleText : 'subtitle';
    this.text = this.articleAnnotations.length > 0 ? this.articleAnnotations[0].text : 'annotation';
  }

  render() {
    return (
      <ArticleCard
        title="Title"
        domain={this.props.uri}
        subtitle={this.articleText}
        annotationContent={this.text}
        image="http://i.onionstatic.com/onion/5597/9/16x9/1600.jpg"
        username="merwin"
        points={16}
        timeSince="2 hours"
        numUsers={2}
        numAnnotations={this.articleAnnotations.length}
        numReplies={4}
        currentVotes={43}
        slug="slug"
      />
    );
  }
}

ArticleItem.propTypes = {
  articleId: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  annotations: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    articleText: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
};

function mapStateToProps(state) {
  const { annotations } = state.articles;
  return {
    annotations,
  };
}

export default connect(mapStateToProps)(ArticleItem);
