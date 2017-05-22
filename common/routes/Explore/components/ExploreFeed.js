import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
// import ArticleCard from '../../../components/ArticleCard';
import loadArticles from '../actions';

class ExploreFeed extends Component {

  componentDidMount() {
    this.props.fetchExploreArticles();
  }

  render() {
    return (
      <div>
        <Helmet title="Explore" />
        {this.props.isLoading &&
          <div>
            <h2>Loading...</h2>
          </div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.explore.articles,
  isLoading: state.explore.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchExploreArticles: () => dispatch(loadArticles()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreFeed);
