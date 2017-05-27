import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileCard from './components/profileCard';
import Annotation from './components/annotation';
import getRecentUserAnnotations from './actions';
import { fetchUser } from '../../actions/groups';

class Profile extends Component {

  componentDidMount = () => {
    Promise.resolve(this.props.dispatch(fetchUser())).then(() => {
      this.props.dispatch(getRecentUserAnnotations(this.props.userId));
    });
  }

  /* eslint-disable */

  render() {
    return (
      <div>
        <ProfileCard />
        {this.props.recentAnnotations !== [] || this.props.recentAnnotations !== null ? this.props.recentAnnotations.map((annotation, i) => {
          return <Annotation key={i} annotation={annotation} />;
        }) : 'Fuck'}
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
