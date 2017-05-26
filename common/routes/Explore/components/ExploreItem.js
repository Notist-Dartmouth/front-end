import React, { Component, PropTypes } from 'react';
import ArticleItem from '../../PostList/components/ArticleItem';
import { fetchArticleAnnotations } from '../../../api';

class ExploreItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      annotations: [],
    };
    this.updateAnnotations = this.updateAnnotations.bind(this);
    this.loadAnnotations = this.loadAnnotations.bind(this);
  }

  componentDidMount() {
    document.addEventListener(this.props.articleID, this.updateAnnotations);
    this.loadAnnotations();
  }

  componentWillUnmount() {
    document.removeEventListener(this.props.articleID, this.updateAnnotations);
  }

  loadAnnotations() {
    fetchArticleAnnotations(this.props.articleURI).then((res) => {
      const annotationsEvent = new CustomEvent(this.props.articleID, {
        detail: res,
      });
      document.dispatchEvent(annotationsEvent);
    });
  }

  updateAnnotations(annotationsEvent) {
    const annotations = annotationsEvent.detail;
    if (!annotations.ERROR) {
      this.setState({ annotations });
    }
  }

  render() {
    return (
      <ArticleItem
        title={this.props.title}
        imageURL={this.props.imageURL}
        articleURI={this.props.articleURI}
        annotations={this.state.annotations}
        articleID={this.props.articleID}
        wordCount={this.props.wordCount}
        datePublished={this.props.datePublished}
        excerpt={this.props.excerpt}
      />
    );
  }
}

ExploreItem.propTypes = {
  title: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  articleURI: PropTypes.string.isRequired,
  articleID: PropTypes.string.isRequired,
  wordCount: PropTypes.number.isRequired,
  datePublished: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
};

export default ExploreItem;
