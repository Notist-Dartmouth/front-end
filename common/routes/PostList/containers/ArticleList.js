import React, { PropTypes, Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import loadArticles from '../actions';
import ArticleItem from '../components/ArticleItem';

const mapStateToProps = state => ({
  data: state.articles.data,
  annotations: state.articles.annotations,
  isLoading: state.articles.isLoading,
});

/* can uncomment out articleList to have multiple cards in one row */
const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7',
  },
  // articleList: {
  //   display: 'flex',
  //   flexWrap: 'nowrap',
  // },
});

class ArticleList extends Component {

  componentDidMount() {
    this.fetchArticles = this.fetchArticles.bind(this);
    this.fetchArticles(this.props.location.state ?
      this.props.location.state.groupId : null);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.state) {
      const currGroupId = this.props.location.state ? this.props.location.state.groupId : null;
      const nextGroupdId = nextProps.location.state.groupId;
      if (currGroupId !== nextGroupdId) {
        this.fetchArticles(nextGroupdId);
      }
    }
  }

  fetchArticles(groupId) {
    this.props.dispatch(loadArticles(groupId, groupId === null));
  }

  render() {
    return (
      <div className={css(styles.root)}>
        <Helmet title="Annotations" />
        {this.props.isLoading &&
          <div>
            <h2>Loading....</h2>
          </div>}
        <div className={css(styles.articleList)}>
          {!this.props.isLoading &&
            this.props.data.map(a =>
              <ArticleItem
                style={{ width: '100%' }}
                key={a._id}
                title={a.info && a.info.title ? a.info.title : ''}
                imageURL={a.info && a.info.lead_image_url ? a.info.lead_image_url : ''}
                articleURI={a.uri}
                annotations={this.props.annotations.filter(annotation => annotation.article === a._id)}
                articleID={a._id}
              />)}
        </div>
      </div>
    );
  }
}

ArticleList.PropTypes = {
  isLoading: PropTypes.bool.isRequired,
  isPublic: PropTypes.bool,
  data: PropTypes.array.isRequired,
  annotations: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

ArticleList.defaultProps = {
  isPublic: false,
};

export default connect(mapStateToProps)(ArticleList);
