import React, { Component } from 'react';
import Helmet from 'react-helmet';
import FlatButton from 'material-ui/FlatButton';
import { red700, red300 } from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import ExploreItem from './ExploreItem';
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
          <div style={{
            textAlign: 'center',
            margin: '40px auto',
            width: '100%',
          }}
          >
            <h1>Loading...</h1>
          </div>}
        {this.props.error &&
          <div style={{ marginLeft: 30, marginTop: 30 }}>
            <h2>Unable to load articles at this time</h2>
            <br />
            <FlatButton
              label="Try again"
              primary
              style={{ color: 'white' }}
              hoverColor={red300}
              backgroundColor={red700}
              onClick={this.props.fetchExploreArticles}
            />
          </div>}
        <div>
          { !this.props.isLoading && !this.props.error && this.props.articles.map(a =>
            <ExploreItem
              style={{ width: '100%' }}
              key={a._id}
              title={a.info && a.info.title ? a.info.title : ''}
              imageURL={a.info && a.info.lead_image_url ? a.info.lead_image_url : ''}
              articleURI={a.uri}
              articleID={a._id}
              wordCount={a.info && a.info.word_count ? a.info.word_count : 0}
              datePublished={a.info && a.info.date_published ? a.info.date_published : ''}
              excerpt={a.info && a.info.excerpt ? a.info.excerpt : ''}
            />,
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.explore.articles,
  isLoading: state.explore.isLoading,
  error: state.explore.error,
});

const mapDispatchToProps = dispatch => ({
  fetchExploreArticles: () => dispatch(loadArticles()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreFeed);
