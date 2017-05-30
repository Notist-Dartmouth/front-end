/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileCard from './components/profileCard';
import Annotation from './components/annotation';
import getRecentUserAnnotations, { fetchUserProfileInfo } from './actions';

/* eslint-enable */

// const hasBeenExecuted = false;
const profileId = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);


class Profile extends Component {

  componentDidMount() {
    Promise.resolve(this.props.dispatch(fetchUserProfileInfo(profileId))).then(() => this.props.dispatch(getRecentUserAnnotations(profileId)));
  }

  // componentWillReceiveProps(nextProps) {
  //   if (
  //     nextProps.userId && !hasBeenExecuted
  //   ) {
  //     this.props.dispatch(getRecentUserAnnotations(nextProps.userId));
  //     hasBeenExecuted = true;
  //   }
  // }

  /* eslint-disable */

  render() {

    const isUsersProfile = profileId === this.props.userId;

    let name = 'Anonymous';
    if (this.props.info.name) {
      name = this.props.info.name;
      const filteredName = name.split(' ');

      if (filteredName.length >= 2) {
        if (filteredName[1].charAt(0)) { // If it's not null
          name = `${`${filteredName[0]} ${filteredName[1][0]}`}.`;
        }
      }
    }

    console.log('Name: ');
    console.log(name);

    return (
      <div>
        <ProfileCard userId={this.props.userId} isUsersProfile={isUsersProfile} profileId={profileId} info={this.props.info} />
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
  info: state.Profile ? state.Profile.info : {},
});


export default connect(mapStateToProps)(Profile);
