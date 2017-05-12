import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Media from 'react-media';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RightSideBar from './components/RightSideBar';
import Comments from './components/Comments';
import { loadDiscussion } from './actions';

class App extends Component {

  componentDidMount() {
    const { articleURI } = this.props.location.state;
    this.props.dispatch(loadDiscussion(articleURI));
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Media query="(min-width: 5000px)" render={() => (
            <RightSideBar articleURI={this.props.location.state.articleURI} />
            )}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <div>
            {this.props.isLoading &&
              <h2>Loading...</h2>
            }
            {this.props.annotations.filter(a => a.article === this.props.location.state.articleId)
              .map(a =>
                <div key={a._id} >
                  <Comments
                    articleURI={this.props.location.state.articleURI}
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
  return {
    annotations,
    isLoading,
  };
}

export default connect(mapStateToProps)(App);
