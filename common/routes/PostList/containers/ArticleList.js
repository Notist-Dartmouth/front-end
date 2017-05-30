import React, { PropTypes, Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import loadArticles, { fetchPublicGroups } from '../actions';
import ArticleItem from '../components/ArticleItem';
import GroupCard from '../../../components/GroupCard';
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
    this.fetchPublicGroups = this.fetchPublicGroups.bind(this);
    this.props.dispatch(fetchPublicGroups());
    this.props.dispatch({ type: 'EXECUTE_SEARCH', search: [], searchIsEmpty: true });
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

  fetchPublicGroups() {
    this.props.dispatch(fetchPublicGroups());
  }

  fetchArticles(groupId) {
    this.props.dispatch(loadArticles(groupId, groupId === null));
  }

  render() {
    const dataArticles = (this.props.searchIsEmpty ? this.props.data : this.props.search);
    const dataGroups = (this.props.searchIsEmpty ? this.props.publicgroups : this.props.search);

    const data = (this.props.toggled ? dataGroups : dataArticles);

    return (
      <div className={css(styles.root)}>
        <div className={css(styles.subroot)}>
          <Helmet title="Annotations" />
          {this.props.isLoading &&
            <div>
              <h2>Loading....</h2>
            </div>}
          <div className={css(styles.articleList)}>
            {!this.props.isLoading && data &&
              data.map((a) => {
                return !this.props.toggled ?
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
                  /> :
                  <GroupCard
                    groupId={a._id}
                    title={a.name}
                    description={a.description}
                    createdDate={a.createDate}
                    creatorName={a.creator ? a.creator.name : ''}
                    numMembers={a.members.length}
                    subscribed={a.members.includes(this.props.userId)}
                    dispatch={this.props.dispatch}
                  />;
              })}
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
  userId: state.user._id,                        // TODO Need to update the user information obtained from API to have userID follow you around
  data: state.articles.data,
  annotations: state.articles.annotations,
  toggled: state.articles.toggled,
  publicgroups: state.articles.publicgroups,
  search: state.articles.search || [],
  searchIsEmpty: state.articles.searchIsEmpty,
  isLoading: state.articles.isLoading,
});

export default connect(mapStateToProps)(ArticleList);
