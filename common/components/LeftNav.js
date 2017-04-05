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
import CreateGroupDialog from './CreateGroupDialog';


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
  firstSubheader: {
    color: white,
    fontSize: 30,
  },
  subheader: {
    paddingTop: 20,
    color: white,
    fontSize: 30,
  },
});

export default class LeftNav extends React.Component {

  constructor(props) {
    super(props);
    this.groupList = props.groupList;
    this.personalList = props.personalList;
    this.exploreList = props.exploreList;
    this.followingList = props.followingList;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Drawer docked width={340} containerStyle={{ backgroundColor: '#44808C', paddingLeft: 20 }} className={css(styles.drawer)}>
            <MenuItem>Hidden 1</MenuItem>
            <MenuItem>Hidden 2</MenuItem>
            <List>
              <Subheader className={css(styles.firstSubheader)}>Groups &ensp;
                <CreateGroupDialog />
              </Subheader>
              {this.groupList.map(d => (
                <Link to={d.groupLink} style={{ textDecoration: 'none' }}>
                  <ListItem
                    leftAvatar={<Avatar icon={<HourglassIcon />} />}
                    primaryText={d.groupName}
                  />
                </Link>
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
