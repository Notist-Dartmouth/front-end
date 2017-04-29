import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Media from 'react-media';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RightSideBar from './components/RightSideBar';
// import loadArticles from './actions';
import MyCard from './components/MyCard';
import Comments from './components/Comments';

class App extends Component {

  // componentDidMount() {
  //   this.fetchArticles = this.fetchArticles.bind(this);
  //   const { groupId } = this.props.location.state;
  //   this.fetchArticles(groupId);
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.location.pathname !== this.props.location.pathname) {
  //     const { groupId } = nextProps.location.state;
  //     this.fetchArticles(groupId);
  //   }
  // }
  //
  // fetchArticles(groupId) {
  //   this.props.dispatch(loadArticles(groupId));
  // }

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
                  <Comments replies={a} />
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
  console.log('Executing mapStateToProps!');
  console.log(state);
  const { annotations } = state.articles;
  return {
    annotations,
  };
}

export default connect(mapStateToProps)(App);
