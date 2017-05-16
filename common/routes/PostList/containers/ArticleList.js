import React, { PropTypes, Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Helmet from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Toggle from 'material-ui/Toggle';
import { connect } from 'react-redux';
import loadArticles, { fetchPublicGroups } from '../actions';
import ArticleItem from '../components/ArticleItem';

/* can uncomment out articleList to have multiple cards in one row */
const styles = StyleSheet.create({
  root: {
    // backgroundColor: '#E0F7FA',
  },
  subroot: {
    paddingTop: 2,
  },
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

  fetchPublicGroups() {
    return this.props.dispatch(fetchPublicGroups());
  }

  handleChange = () => {
    console.log(this.fetchPublicGroups());
    this.props.dispatch({ type: 'TOGGLE_SHOW_GROUPS', toggled: !this.props.toggled, publicgroups: this.fetchPublicGroups() });
  }

  render() {
    const dataArticles = (this.props.searchIsEmpty ? this.props.data : this.props.search);
    const dataGroups = (this.props.searchIsEmpty ? this.props.publicgroups : this.props.search);

    const data = (this.props.toggled ? dataGroups : dataArticles);

    return (
      <div className={css(styles.root)}>
        <div className={css(styles.subroot)}>
          <Helmet title="Annotations" />
          <MuiThemeProvider>
            <Toggle id="Toggle" onToggle={this.handleChange} />
          </MuiThemeProvider>
          {this.props.isLoading &&
            <div>
              <h2>Loading....</h2>
            </div>}
          <div className={css(styles.articleList)}>
            {!this.props.isLoading && data &&
              data.map(a =>
                <ArticleItem
                  style={{ width: '100%' }}
                  key={a._id}
                  title={a.info && a.info.title ? a.info.title : ''}
                  imageURL={a.info && a.info.lead_image_url ? a.info.lead_image_url : ''}
                  articleURI={a.uri}
                  annotations={this.props.annotations.filter(annotation => annotation.article === a._id)}
                  articleID={a._id}
                  wordCount={a.word_count}
                  datePublished={a.date_published}
                  excerpt={a.excerpt}
                />)}
          </div>
        </div>
      </div>
    );
  }
}

ArticleList.PropTypes = {
  isLoading: PropTypes.bool.isRequired,
  isPublic: PropTypes.bool,
  search: PropTypes.array.isRequired,
  searchIsEmpty: PropTypes.bool,
  data: PropTypes.array.isRequired,
  annotations: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

ArticleList.defaultProps = {
  isPublic: false,
};

const mapStateToProps = state => ({
  data: state.articles.data,
  annotations: state.articles.annotations,
  toggled: state.articles.toggled,
  search: state.articles.search || [],
  searchIsEmpty: state.articles.searchIsEmpty,
  isLoading: state.articles.isLoading,
});

export default connect(mapStateToProps)(ArticleList);
