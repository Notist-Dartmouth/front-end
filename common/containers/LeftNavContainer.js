import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/groups';
import LeftNav from '../components/LeftNav';

// const groups = [
//   {
//     _id: 'abcd190d',
//     name: 'Group 1',
//     des: 'posts',
//     icon: 'iconName',
//   },
//   {
//     id: 'bacd190d',
//     groupName: 'Group 2',
//     groupLink: 'posts',
//     icon: 'iconName',
//   },
//   {
//     id: 'dacd190d',
//     groupName: 'Group 3',
//     groupLink: 'posts',
//     icon: 'iconName',
//   },
// ];
//

const personalList = [
  {
    id: 'xx',
    groupName: 'Personal 1',
    groupLink: 'posts',
    icon: 'iconName',
  },
];

const exploreList = [
  {
    id: 'xx',
    groupName: 'Explore 1',
    groupLink: 'posts',
    icon: 'iconName',
  },
  {
    id: 'xx',
    groupName: 'Explore 2',
    groupLink: 'post',
    icon: 'iconName',
  },
];

const followingList = [
  {
    id: 'xx',
    groupName: 'Person 1',
    groupLink: 'posts',
    icon: 'iconName',
  },
  {
    id: 'xx',
    groupName: 'Person 2',
    groupLink: 'posts',
    icon: 'iconName',
  },
];

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
        personalList={personalList}
        exploreList={exploreList}
        followingList={followingList}
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
