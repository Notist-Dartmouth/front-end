import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import ArticleCard from '../../../components/ArticleCard';

const styles = StyleSheet.create({
  root: {
    // margin: '0 auto 1.5rem',
    width: '400%',
  },
});

const PostListItem = ({ post }) => (
  <div className={css(styles.root)}>
    <ArticleCard
      title={post.title}
      domain={post.domain}
      subtitle={post.subtitle}
      annotationContent={post.annotationContent}
      image={post.image}
      username={post.username}
      points={post.points}
      timeSince={post.timeSince}
      numUsers={post.numUsers}
      numAnnotations={post.numAnnotations}
      numReplies={post.numReplies}
      currentVotes={post.currentVotes}
      slug={post.slug}
    />
  </div>
);

export default PostListItem;
