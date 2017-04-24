import React, { PropTypes, Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import loadArticles from '../actions';
import ArticleCard from '../../../components/ArticleCard';

const mapStateToProps = state => ({
  data: state.articles.data,
  annotations: state.articles.annotations,
  isLoading: state.articles.isLoading,
});

/* I added padding so it doesn't go underneath nav */
const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7',
  },
});

class ArticleList extends Component {

  componentDidMount() {
    const { groupId } = this.props.location.state;
    this.props.dispatch(loadArticles(groupId));
  }

  render() {
    return (
      <div className={css(styles.root)}>
        <Helmet title="Annotations" />
        {this.props.isLoading &&
          <div>
            <h2>Loading....</h2>
          </div>}
        {!this.props.isLoading &&
          this.props.data.map(a =>
            <ArticleCard
              key={a._id}
              title="Title"
              domain={a.uri}
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
            />)
        }
      </div>
    );
  }
}

ArticleList.PropTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  annotations: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ArticleList);
