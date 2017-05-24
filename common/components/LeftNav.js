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
import HourglassIcon from 'material-ui/svg-icons/action/hourglass-empty';
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
  user: {
  },
});

class LeftNav extends React.Component {

  render() {
    // const { profilePicture, groups, userName, userPoints, personalList, exploreList, followingList } = this.props;
    const { groups } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={css(styles.drawerContainer)}>
          <Drawer docked containerStyle={{ position: 'relative', backgroundColor: '#44808C', paddingLeft: 20, width: 320 }} className={css(styles.drawer)}>
            <List>
              <Subheader className={css(styles.subheader)}>Groups &ensp; <GroupDialog /> </Subheader>
              <Link to={{
                pathname: '/explore',
                state: {
                  groupName: 'Explore',
                  groupDescription: 'Discover new articles',
                },
              }}
              >
                <ListItem
                  primaryText="Explore"
                  leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={red700} />}
                />
              </Link>
              {groups.map(g => (
                <Link
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
                    leftAvatar={<Avatar icon={<HourglassIcon />} />}
                    primaryText={g.name}
                  />
                </Link>
              ))}
            </List>
            {/* <Divider */}

          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  toggled: state.articles ? state.articles.toggled : false,
});

export default connect(mapStateToProps)(LeftNav);

/* eslint-enable */

// <Link to={'/profile'} style={{ textDecoration: 'none', position: 'relative', top: 10, paddingLeft: 20, color: white }}>
//   <Avatar
//     src={profilePicture}
//     size={50}
//   />
//   <span style={{ paddingLeft: 20, position: 'relative', top: -15 }}>{userName}</span>
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
