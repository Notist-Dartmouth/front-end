import React, { Component, PropTypes } from 'react';
import ArticleItem from '../../PostList/components/ArticleItem';
import { fetchArticleAnnotations } from '../../../api';

class ExploreItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      annotations: [],
      isMounted: false,
    };
    this.updateAnnotations = this.updateAnnotations.bind(this);
    this.loadAnnotations = this.loadAnnotations.bind(this);
  }

  componentDidMount() {
    this.loadAnnotations();
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  loadAnnotations() {
    this.setState({ isMounted: true });
    fetchArticleAnnotations(this.props.articleURI).then((res) => {
      this.updateAnnotations(res);
    });
  }

  updateAnnotations(res) {
    if (!res.ERROR && this.state.isMounted) {
      this.setState({ annotations: res });
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
