import React, { Component, PropTypes } from 'react';
import ArticleItem from '../../PostList/components/ArticleItem';
import { fetchArticleAnnotations } from '../../../api';

class ExploreItem extends Component {

  // Based on the cancelable promise method shown here: https://github.com/facebook/react/issues/5465#issuecomment-157888325
  // modified to check for an error from the API and return a new promise
  // Makes a cancelable promise for fetching annotations (need a cancelable promise
  // so that the callback doesn't occur after the component unmounts)
  static makeAnnotationsListener(articleURI) {
    let _canceled = false;

    const listener = fetchArticleAnnotations(articleURI).then((annotations) => {
      if (annotations.ERROR || _canceled) {
        return Promise.reject(annotations.ERROR || 'listener canceled');
      }
      return Promise.resolve(annotations);
    });

    return {
      start: listener,
      cancel: () => { _canceled = true; },
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      annotations: [],
    };
  }

  componentDidMount() {
    const updateAnnotations = annotations => this.setState({ annotations });
    this.listener = ExploreItem.makeAnnotationsListener(this.props.articleURI);
    this.listener.start.then(updateAnnotations).catch(error => console.log(error));
  }

  componentWillUnmount() {
    this.listener.cancel();
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
