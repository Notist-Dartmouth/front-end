import React, { PropTypes, Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import loadArticles from '../actions';
import PostListItem from '../components/PostListItem';

const mapStateToProps = state => ({
  articles: state.articles.data,
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

class AnnotationList extends Component {

  componentDidMount() {
    this.props.dispatch(loadArticles());
  }

  render() {
    return (
      <div className={css(styles.root)}>
        <Helmet title="Posts" />
        {this.props.isLoading &&
          <div>
            <h2>Loading....</h2>
          </div>}
        {!this.props.isLoading &&
          this.props.articles.map((a, i) => <PostListItem key={a._id} post={a} />)}
      </div>
    );
  }
}

AnnotationList.PropTypes = {
  posts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(AnnotationList);
