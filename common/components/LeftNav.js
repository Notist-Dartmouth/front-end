import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { deepOrange600, red700, white } from 'material-ui/styles/colors';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import SocialGroup from 'material-ui/svg-icons/social/group';
import ActionHome from 'material-ui/svg-icons/action/home';
import GroupDialog from '../containers/GroupDialog';


const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    accent1Color: red700,
    accent2Color: deepOrange600,
    textColor: white,
    primaryText: white,
    secondaryText: white,
  },
  userAgent: (typeof navigator !== 'undefined' && navigator.userAgent) || 'all',
});

const styles = StyleSheet.create({
  drawerContainer: {
    '@media (max-width: 1000px)': {
      maxWidth: '30%',
    },
  },
  subheaderInset: {
    color: white,
    fontSize: 26,
  },
  drawer: {
    position: 'fixed',
    zIndex: 190,
    height: '100%',
    color: white,
    fontFamily: 'Roboto, sans-serif',
  },
  subheader: {
    paddingTop: 20,
    color: white,
    fontSize: 33,
  },
  groupsSubheader: {
    fontSize: 28,
  },
  user: {
  },
});

class LeftNav extends React.Component {

  constructor(props) {
    super(props);
    this.groupsList = this.groupsList.bind(this);
  }

  groupsList(groups) {
    return groups.map(g =>
      <Link
        key={g._id}
        onClick={() => this.props.dispatch({ type: 'TOGGLE_SHOW_GROUPS', toggled: false, search: [] })}
        to={{
          pathname: `/feed/${g._id}`,
          state: {
            groupId: g._id,
            groupName: g.name,
            groupDescription: g.description,
          },
        }}
      >
        <ListItem
          key={g._id}
          leftAvatar={<Avatar icon={<SocialGroup />} />}
          primaryText={g.name}
        />
      </Link>,
    );
  }

  /* eslint-disable */

  // profileList(following) {
  //   return following.map(f =>
  //     <Link
  //       key={f._id}
  //       to={{
  //         pathname: `/profile/${f._id}`,
  //         state: {
  //           groupId: f._id,
  //           groupName: f.name,
  //           groupDescription: f.description,
  //         },
  //       }}
  //     >
  //       <ListItem
  //         key={f._id}
  //         leftAvatar={<Avatar href={f.photoSrc} icon={<SocialGroup />} />}
  //         primaryText={f.name}
  //       />
  //     </Link>,
  //   );
  // }

  /* eslint-enable */

  render() {
    // const { profilePicture, groups, name, userPoints, personalList, exploreList, followingList } = this.props;
    const { groups } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={css(styles.drawerContainer)}>

          <Drawer docked containerStyle={{ position: 'relative', backgroundColor: '#44808C', paddingLeft: 20, width: 320, overflowY: 'scroll' }} className={css(styles.drawer)}>
            <Link
              className={css(styles.subheader)}
              to={{
                pathname: '/',
                state: {
                  groupId: null,
                },
              }}
            >
              <ListItem
                className={css(styles.subheader)}
                primaryText="Home"
                leftAvatar={<Avatar icon={<ActionHome />} backgroundColor={'rgb(18, 98, 226)'} />}
              />
            </Link>
            <Link
              className={css(styles.subheader)}
              to={{
                pathname: '/explore',
                state: {
                  groupName: 'Explore',
                  groupDescription: 'Discover new articles',
                },
              }}
            >
              <ListItem
                className={css(styles.subheader)}
                primaryText="Explore"
                leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={red700} />}
              />
            </Link>
            <List>
              <Subheader className={css(styles.subheader, styles.groupsSubheader)}>Public Groups &ensp; <GroupDialog /> </Subheader>
              {this.groupsList(groups.filter(g => g.isPublic))}
            </List>
            {/* <Divider */}
            <List>
              <Subheader className={css(styles.subheader, styles.groupsSubheader)}>Personal Groups &ensp; <GroupDialog /> </Subheader>
              {this.groupsList(groups.filter(g => !g.isPublic))}
            </List>
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}

// <List>
//   <Subheader className={css(styles.subheader, styles.groupsSubheader)}>Following &ensp; </Subheader>
//   {this.props.followingList}
// </List>

const mapStateToProps = state => ({
  followingList: state.user ? state.user.isFollowing : '',
  toggled: state.articles ? state.articles.toggled : false,
});

export default connect(mapStateToProps)(LeftNav);

/* eslint-enable */

// <Link to={'/profile'} style={{ textDecoration: 'none', position: 'relative', top: 10, paddingLeft: 20, color: white }}>
//   <Avatar
//     src={profilePicture}
//     size={50}
//   />
//   <span style={{ paddingLeft: 20, position: 'relative', top: -15 }}>{name}</span>
//   <span style={{ fontWeight: 800, paddingLeft: 10, position: 'relative', top: -15 }}>{userPoints}</span>
// </Link>

// <List>
//   {/* removed inset */}
//   <Subheader className={css(styles.subheader)}>Personal</Subheader>
//   {personalList.map(d => (
//     <Link to={d.groupLink} style={{ textDecoration: 'none' }}>
//       <ListItem
//         leftAvatar={<Avatar icon={<HourglassIcon />} backgroundColor={blue500} />}
//         primaryText={d.groupName}
//       />
//     </Link>
//   ))}
// </List>

// <List>
//   <Subheader className={css(styles.subheader)}>Explore</Subheader>
//   {exploreList.map(d => (
//     <Link to={d.groupLink} style={{ textDecoration: 'none' }}>
//       <ListItem
//         leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={red700} />}
//         primaryText={d.groupName}
//       />
//     </Link>
//     ))}
// </List>

// <List>
//   <Subheader className={css(styles.subheader)}>People</Subheader>
//   {followingList.map(d => (
//     <Link to={d.groupLink} style={{ textDecoration: 'none' }}>
//       <ListItem
//         leftAvatar={<Avatar icon={<ActionInfo />} backgroundColor={cyan500} />}
//         primaryText={d.groupName}
//       />
//     </Link>
//     ))}
// </List>
