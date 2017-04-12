
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  deepOrange400,
  blueGrey700,
  grey500,
  teal200,
  grey100, grey300, grey900,
  cyan500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';

const NAVBARHEIGHT = '75px';

export const muiTheme = getMuiTheme({
  palette: {
    primary1Color: deepOrange400,
    primary2Color: blueGrey700,
    primary3Color: teal200,
    accent1Color: grey900,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
});

export const styles = {
  title: {
    zIndex: 100,
    fontSize: 22,
    color: white,
    paddingLeft: '20px',
    top: '15px',
  },

  navBar: {
    width: '100%',
    height: NAVBARHEIGHT,
    position: 'fixed',
    backgroundColor: deepOrange400,
    top: '0px',
    left: '0px',
  },

  iframeContainer: {
    height: '55%',
    paddingLeft: '25px',
    paddingRight: '25px',
  },

  iframe: {
    border: 'rgba(255, 255, 255, 1)',  // Transparent
    height: '100%',
    minWidth: '330px',
    backgroundColor: 'rgba(255, 255, 255, 1)',  // Transparent
  },

  iconContainer: {
    height: NAVBARHEIGHT,
  },

  rightSidebarText: {
    fontSize: 16,
    paddingLeft: '25px',
    paddingRight: '25px',
  },

  rightSidebar: {
    position: 'fixed',
    backgroundColor: blueGrey700,
    width: '380px',
    minWidth: '380px',
    height: '100%',
    top: NAVBARHEIGHT,
    right: '0px',
  },

  leftSidebarText: {
    fontSize: 16,
    paddingLeft: '25px',
    paddingRight: '25px',
    color: white,
  },

  leftSidebar: {
    position: 'fixed',
    backgroundColor: blueGrey700,
    width: '300px',
    minWidth: '300px',
    height: '100%',
    top: NAVBARHEIGHT,
    left: '0px',
  },

  card: {
    position: 'fixed',
    height: '200px',
    top: '100px',
    left: '330px',
    right: '410px',
  },

  cardHeader: {
    color: grey500,
  },

  CommentBox: {

  },

};
