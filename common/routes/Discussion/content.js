/* eslint-disable */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import Media from 'react-media';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import RightSideBar from './components/RightSideBar';
import Comments from './components/Comments';
import { loadDiscussion, fetchArticleInformation } from './actions';

class App extends Component {

  componentDidMount() {
    const articleId = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    console.log(articleId);
    Promise.resolve(this.props.dispatch(fetchArticleInformation(articleId))).then((articleInfo) => {
      this.props.dispatch(loadDiscussion(this.props.articleInformation.uri));
      console.log('Hi');
    });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            {this.props.isLoading &&
              <h2>Loading...</h2>
            }
            {this.props.annotations.filter(a => a.article === this.props.articleInformation._id)
              .map(a =>
                <div key={a._id} >
                  <Comments
                    articleURI={this.props.articleInformation.uri}
                    replies={a}
                  />
                </div>,
              )}
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  annotations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  const { annotations, isLoading } = state.Discussion;
  const { articleInformation } = state.Discussion;
  return {
    annotations,
    isLoading,
    articleInformation,
  };
}

export default connect(mapStateToProps)(App);
