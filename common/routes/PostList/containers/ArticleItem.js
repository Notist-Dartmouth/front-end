import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ArticleCard from '../../../components/ArticleCard';
import { loadAnnotations } from '../actions';

class ArticleItem extends Component {

  componentDidMount() {
    this.props.dispatch(loadAnnotations(this.props.uri));
  }

  render() {
    return (
      <ArticleCard
        title="Title"
        domain={this.props.uri}
        subtitle={this.props.annotations.length > 0 ? this.props.annotations[0].articleText : 'article text'}
        annotationContent={this.props.annotations.length > 0 ? this.props.annotations[0].text : 'text'}
        image="http://i.onionstatic.com/onion/5597/9/16x9/1600.jpg"
        username="merwin"
        points={16}
        timeSince="2 hours"
        numUsers={2}
        numAnnotations={this.props.annotations.length}
        numReplies={4}
        currentVotes={43}
        slug="slug"
      />
    );
  }
}

ArticleItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  uri: PropTypes.string.isRequired,
  annotations: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    articleText: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
};

export default connect()(ArticleItem);
