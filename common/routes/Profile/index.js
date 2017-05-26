import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileCard from './components/profileCard';
import Annotation from './components/annotation';
import getRecentUserAnnotations from './actions';

class Profile extends Component {

  componentDidMount() {
    Promise.resolve(this.props.dispatch(getRecentUserAnnotations('58feaa6738babe01a6ea315b'))).then(() => {
      this.forceUpdate();
    });
  }

  /* eslint-disable */

  render() {
    console.log(`Recent user annotations: ${this.props.recentAnnotations}`);
    return (
      <div>
        <ProfileCard />
        {this.props.recentAnnotations !== [] ? this.props.recentAnnotations.map((annotation, i) => {
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
  recentAnnotations: state.Profile ? state.Profile.recentAnnotations : [],
});


export default connect(mapStateToProps)(Profile);
