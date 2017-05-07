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
    const { groupId } = this.props.location.state;
    this.fetchArticles(groupId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const { groupId } = nextProps.location.state;
      this.fetchArticles(groupId);
    }
  }

  fetchArticles(groupId) {
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
        <div className={css(styles.articleList)}>
          {!this.props.isLoading &&
            this.props.data.map(a =>
              <div style={{ width: '100%' }}>
                <ArticleItem
                  key={a._id}
                  title={a.info && a.info.title ? a.info.title : ''}
                  imageURL={a.info && a.info.lead_image_url ? a.info.lead_image_url : ''}
                  articleURI={a.uri}
                  annotations={this.props.annotations.filter(annotation => annotation.article === a._id)}
                  articleID={a._id}
                />
              </div>)
          }
        </div>
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
