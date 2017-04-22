import React, { PropTypes, Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { loadPosts } from '../actions';
import PostListItem from '../components/PostListItem';

const mapStateToProps = state => ({
  posts: state.posts.data,
  isLoading: state.posts.isLoading,
});

/* I added padding so it doesn't go underneath nav */
const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7',
  },
});

class PostListPage extends Component {

  componentDidMount() {
    this.props.dispatch(loadPosts());
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
          this.props.posts.map((post, i) => <PostListItem key={post.id} post={post} />)}
      </div>
    );
  }
}

PostListPage.PropTypes = {
  posts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(PostListPage);
