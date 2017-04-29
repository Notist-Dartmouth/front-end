import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Media from 'react-media';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RightSideBar from './components/RightSideBar';
// import loadArticles from './actions';
import MyCard from './components/MyCard';
import Comments from './components/Comments';
import { loadAnnotations } from './actions';

class App extends Component {

  componentDidMount() {
    const { articleURI } = this.props.location.state;
    this.props.dispatch(loadAnnotations(articleURI));
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Media query="(min-width: 4000px)" render={() => (
            <RightSideBar />
            )}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <div>
            {console.log('Printing annotations!')}
            {console.log(this.props.annotations)}
            {this.props.annotations.filter(a => a.article === this.props.location.state.articleId)
              .map(a =>
                <div key={a._id} >
                  { console.log('A is: ') }
                  { console.log(a) }
                  <MyCard annotation={a} />
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
  console.log('Executing mapStateToProps!');
  console.log(state);
  const { annotations } = state.Discussion;
  return {
    annotations,
  };
}

export default connect(mapStateToProps)(App);
