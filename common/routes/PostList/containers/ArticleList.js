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

/* I added padding so it doesn't go underneath nav */
const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7',
  },
});

class ArticleList extends Component {

  componentDidMount() {
    const { groupId } = this.props.location.state;
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
        {!this.props.isLoading &&
          this.props.data.map(a =>
            <ArticleItem
              key={a._id}
              articleURI={a.uri}
              annotations={this.props.annotations.filter(annotation => annotation.article === a._id)}
            />)
        }
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
