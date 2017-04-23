import React, { PropTypes, Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import loadArticles from '../actions';
import AnnotationItem from '../components/AnnotationItem';

const mapStateToProps = state => ({
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

class AnnotationList extends Component {

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
          this.props.annotations.map((a, i) =>
            <AnnotationItem
              key={a._id}
              post={a}
            />)}
      </div>
    );
  }
}

AnnotationList.PropTypes = {
  isLoading: PropTypes.bool.isRequired,
  annotations: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(AnnotationList);
