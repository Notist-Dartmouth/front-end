import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileCard from './components/profileCard';
import Annotation from './components/annotation';
import getRecentUserAnnotations from './actions';

let hasBeenExecuted = false;

class Profile extends Component {

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.userId && !hasBeenExecuted
    ) {
      this.props.dispatch(getRecentUserAnnotations(nextProps.userId));
      hasBeenExecuted = true;
    }
  }

  /* eslint-disable */

  render() {
    return (
      <div>
        <ProfileCard />
        {this.props.recentAnnotations !== [] || this.props.recentAnnotations !== null ? this.props.recentAnnotations.map((annotation, i) => {
          return <Annotation key={i} annotation={annotation} />;
        }) : ''}
      </div>
    );
  }

/* eslint-enable */

}

Profile.defaultProps = {
  recentAnnotations: [],
};

const mapStateToProps = state => ({
  userId: state.user ? state.user._id : '',
  recentAnnotations: state.Profile ? state.Profile.recentAnnotations : [],
});


export default connect(mapStateToProps)(Profile);
