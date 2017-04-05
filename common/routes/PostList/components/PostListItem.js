import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import ArticleCard from '../../../components/ArticleCard';

const styles = StyleSheet.create({
  root: {
    // margin: '0 auto 1.5rem',
  },
});

const PostListItem = ({ post }) => (
  <div className={css(styles.root)}>
    <ArticleCard {...post} />
  </div>
);

export default PostListItem;
