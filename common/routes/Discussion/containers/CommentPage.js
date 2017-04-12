import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import CommentBox from '../components/CommentBox'
import { loadComments } from '../actions';
import { selectComments } from '../reducer';

const redial = {
  fetch: ({ dispatch }) => dispatch(loadComments()),
};

const mapStateToProps = state => ({
  comments: selectComments(state),
});

/* I added padding so it doesn't go underneath nav */
const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7',
  },
});

const CommentPage = ({ comments }) => (
  <div className={css(styles.root)}>
    <Helmet title="Comments" />
    {comments.isLoading &&
      <div>
        <h2>Loading....</h2>
      </div>}
    {!comments.isLoading &&
      comments.data.map((post, i) => <CommentBox key={comments.id} post={comments} />)}
  </div>
);

CommentPage.PropTypes = {
  comments: PropTypes.array.isRequired,
};

export default provideHooks(redial)(connect(mapStateToProps)(CommentPage));
