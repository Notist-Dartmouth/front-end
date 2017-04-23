import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import ArticleCard from '../../../components/ArticleCard';

const styles = StyleSheet.create({
  root: {
    margin: '0 auto 1.5rem',
  },
});

class AnnotationItem extends Component {
  render() {
    <div className={css(styles.root)}>
      <ArticleCard {...post} />
    </div>;
  }
}

AnnotationItem.propTypes = {
  articleId: PropTypes.string.isRequired,
};

export default AnnotationItem;
