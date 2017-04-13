import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/groups';
import LeftNav from '../components/LeftNav';

class LeftNavContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchUser());
  }

  render() {
    return (
      <LeftNav
        groups={this.props.groups}
        profilePicture="https://i.imgur.com/9zgiD0u.jpg"
        userName="ethan"
        userPoints={994}
      />
    );
  }
}

LeftNavContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    isPublic: PropTypes.bool,
    isPersonal: PropTypes.bool,
  })),
};

LeftNavContainer.defaultProps = {
  groups: [],
};

function mapStateToProps(state) {
  console.log(state);
  const { groups } = state.user;
  return { groups };
}

export default connect(mapStateToProps)(LeftNavContainer);
