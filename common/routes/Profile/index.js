import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileCard from './components/profileCard';
import Annotation from './components/annotation';
import getRecentUserAnnotations from './actions';

// const hasBeenExecuted = false;
const profileId = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);


class Profile extends Component {

  componentDidMount() {
    this.props.dispatch(getRecentUserAnnotations(profileId));
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

    const showFollowButton = profileId !== this.props.userId;

    let name = 'Anonymous';
    if (this.props.name) {
      name = this.props.name;
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
        <ProfileCard name={name} blurb={this.props.blurb} showFollowButton={showFollowButton} />
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
  name: state.user ? state.user.name : '',
  blurb: 'Hello, this is the default text',
  userId: state.user ? state.user._id : '',
  recentAnnotations: state.Profile ? state.Profile.recentAnnotations : [],
});


export default connect(mapStateToProps)(Profile);
