import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Media from 'react-media';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyCard from './components/MyCard';
import RightSideBar from './components/RightSideBar';
import Comments from './components/Comments';

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Media query="(min-width: 4000px)" render={() => (
            <RightSideBar /> //  Only show if user's screen is big enough
            )}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <div>
            {this.props.annotations.filter(a => a.article === this.props.location.state.articleId)
              .map(a =>
                <div key={a._id} >
                  <MyCard annotation={a} />
                  <Comments replies={a.childAnnotations} />
                </div>,
              )}
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  console.log(state);
  const { annotations } = state.articles;
  return {
    annotations,
  };
}

export default connect(mapStateToProps)(App);
