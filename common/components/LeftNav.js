import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { deepOrange600, red700, cyan500, white, blue500 } from 'material-ui/styles/colors';
// blueGrey700
import Drawer from 'material-ui/Drawer';
// import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router';
// import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
// import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
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
  subheaderInset: {
    color: white,
    fontSize: 24,
  },
  drawer: {
    position: 'fixed',
    // top: 90,
    zIndex: 30,
    color: white,
    fontFamily: 'Roboto, sans-serif',
  },
  subheader: {
    paddingTop: 20,
    color: white,
    fontSize: 30,
  },
  user: {
  },
});

export default class LeftNav extends React.Component {

  constructor(props) {
    super(props);
    this.groups = props.groups;
    this.personalList = props.personalList;
    this.exploreList = props.exploreList;
    this.followingList = props.followingList;
    this.profilePicture = props.profilePicture;
    this.userName = props.userName;
    this.userPoints = props.userPoints;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {/* make position: 'relative' */}
          <Drawer docked width={340} containerStyle={{ backgroundColor: '#44808C', paddingLeft: 20 }} className={css(styles.drawer)}>
            <MenuItem>Hidden 1</MenuItem>
            <MenuItem>Hidden 2</MenuItem>
            <Link to={'/profile'} style={{ textDecoration: 'none', position: 'relative', top: 10, paddingLeft: 20, color: white }}>
              <Avatar
                src={this.profilePicture}
                size={50}
              />
              <span style={{ paddingLeft: 20, position: 'relative', top: -15 }}>{this.userName}</span>
              <span style={{ fontWeight: 800, paddingLeft: 10, position: 'relative', top: -15 }}>{this.userPoints}</span>
            </Link>
            <List>
              <Subheader className={css(styles.subheader)}>Groups &ensp; <GroupDialog /> </Subheader>
              {this.groups.map(d => (
                <ListItem
                  key={d._id}
                  leftAvatar={<Avatar icon={<HourglassIcon />} />}
                  primaryText={d.name}
                />
              ))}
            </List>
            {/* <Divider */}
            <List>
              {/* removed inset */}
              <Subheader className={css(styles.subheader)}>Personal</Subheader>
              {this.personalList.map(d => (
                <Link to={d.groupLink} style={{ textDecoration: 'none' }}>
                  <ListItem
                    leftAvatar={<Avatar icon={<HourglassIcon />} backgroundColor={blue500} />}
                    primaryText={d.groupName}
                  />
                </Link>
              ))}
            </List>
            <List>
              <Subheader className={css(styles.subheader)}>Explore</Subheader>
              {this.exploreList.map(d => (
                <Link to={d.groupLink} style={{ textDecoration: 'none' }}>
                  <ListItem
                    leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={red700} />}
                    primaryText={d.groupName}
                  />
                </Link>
                ))}
            </List>
            <List>
              <Subheader className={css(styles.subheader)}>People</Subheader>
              {this.followingList.map(d => (
                <Link to={d.groupLink} style={{ textDecoration: 'none' }}>
                  <ListItem
                    leftAvatar={<Avatar icon={<ActionInfo />} backgroundColor={cyan500} />}
                    primaryText={d.groupName}
                  />
                </Link>
                ))}
            </List>
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}
