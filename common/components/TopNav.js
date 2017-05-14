/* eslint-disable */
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { StyleSheet, css } from 'aphrodite';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { red700, white, yellow400, grey900, grey300 } from 'material-ui/styles/colors';
// deepOrange600
import PeopleIcon from 'material-ui/svg-icons/social/people';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import BugReport from 'material-ui/svg-icons/action/bug-report';
import Fuse from 'fuse.js';
// import SettingsDialog from './SettingsDialog';
// import NotificationsDialog from './NotificationsDialog';
import config from '../../server/config';
import dfsTraversal from '../routes/Discussion/produceCommentGraph';

/* eslint-enable */

function getTotalAuthorNumber(annotations, groupId = '0') {
  if (!annotations) {
    return 0;
  }

  let filtered = annotations;

  if (groupId !== '0') {
    filtered = annotations.filter(a => a.groups.includes(groupId));
  }

  const authorArray = [];

  for (let i = 0; i < filtered.length; i += 1) {
    if (!filtered[i].author) {
      /* eslint-disable */
      continue;
      /* eslint-enable */
    }
    authorArray.push(filtered[i].author._id);
  }

  const uniqueArray = authorArray.filter((authorID, i) => { // Filter out so we don't count the same person more than once
    return authorArray.indexOf(authorID) === i;
  });

  return uniqueArray.length;
}

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    accent1Color: red700,
    accent2Color: '#F98C25',
    textColor: white,
  },
  userAgent: (typeof navigator !== 'undefined' && navigator.userAgent) || 'all',
});

const styles = StyleSheet.create({
  toolbarContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  feedDetails: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    // alignItems: 'center',
  },
  feedTopRow: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  notificationsAndSettings: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    '@media (max-width: 900px)': {
      display: 'none',
    },
  },
  searchBar: {
    '@media (max-width: 900px)': {
      display: 'none',
    },
    // flex: 1,
  },
  link: {
    maxWidth: 700,
    color: '#999',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: '.2s opacity ease',
    ':hover': {
      opacity: 0.6,
    },
  },
  topLink: {
    color: '#fff',
    fontSize: '20px',
  },
  activeLink: {
    color: '#000',
  },
  feedDescription: {
    left: 25,
    fontSize: 20,
  },
  numMembers: {
    fontSize: 14,
    textDecoration: 'underline',
  },
});

function search(list, query) { // Will return the array in sorted order
  const options = {
    shouldSort: true,
    threshold: 0.5,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      'info.title',
      'info.domain',
      'annotations[0]',
    ],
  };

  const fuse = new Fuse(list, options);
  const result = fuse.search(query);

  return result;
}

class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 2,
      subscribed: false,
    };
    this.handleSubscribeClick = this.handleSubscribeClick.bind(this);
  }

  handleChange = (event, index, value) => this.setState({ value });

  handleSubscribeClick() {
    this.setState({ subscribed: !this.state.subscribed });
  }

  handleChange = (event, index, value) => this.setState({ value });

  executeSearch = (props) => {
    const textfield = document.getElementById('Search');
    const searchResults = search(this.props.data, textfield.value);
    const searchIsEmpty = textfield.value.length === 0;
    this.props.dispatch({ type: 'EXECUTE_SEARCH', search: searchResults, searchIsEmpty });
  }

  render() {
    const subButton = null;

    /* if (window.location.href.includes('feed')) {
      if (this.state.subscribed) { // Check if subscribed to group
        subButton = <RaisedButton label="unsubscribe" onClick={this.handleSubscribeClick} backgroundColor={red700} />;
      } else {
        subButton = <RaisedButton label="subscribe" onClick={this.handleSubscribeClick} backgroundColor={yellow400} labelColor={grey900} />;
      }
    }*/

    /*
      when not yet response from button click, use
      import RefreshIndicator from 'material-ui/lib/refresh-indicator';
    <RefreshIndicator
     size={40}
     left={10}
     top={0}
     status="loading"
     style={style.refresh}
   />
      */

    /* eslint-disable */

    let annotations = [];
    let groupId = '0';
    if (window.location.href.includes("feed")) {
      groupId = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    }
    const isFeedView = window.location.href.includes('feed');
    const isFeedOrDiscussionView = isFeedView || window.location.href.includes('discussion');
    let allComments = [];
    if (isFeedOrDiscussionView) {
      annotations = isFeedView  ? this.props.annotationsF : this.props.annotationsD;
      for (let i = 0; i < annotations.length; i += 1) {
        const order = dfsTraversal(annotations[i], () => {

        });
        allComments = allComments.concat(order);
      }
    }

    const totalAuthorNumber = getTotalAuthorNumber(allComments, groupId);
    const totalNumberOfAnnotations = allComments.length; // This could go on the articleCard
    const shouldLoadMembers = (totalAuthorNumber !== 0 && isFeedOrDiscussionView);

    let feedName;
    
    if (this.props.feedDescription) {
      feedName = {
        fontSize: 33,
        paddingRight: 15,
      };
    } else {
      feedName = {
        fontSize: 37,
        paddingRight: 15,
      };
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Toolbar style={{ position: 'fixed', zIndex: 200, height: 90, top: 0, left: 0, width: '100%', color: white, fontFamily: 'Roboto, sans-serif', boxShadow: '0 2px 4px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.22)' }}>
          <div className={css(styles.toolbarContainer)}>
            <div className={css(styles.feedDetails)}>
              <div className={css(styles.feedTopRow)}>
                <div style={feedName}>{this.props.currentFeedName || <a href="http://notist.io.">'Notist'</a>}</div>
                <div style={{ paddingRight: 15 }}>{subButton}</div>
                { shouldLoadMembers ? <PeopleIcon /> : '' }
                <div className={css(styles.numMembers)}>{shouldLoadMembers ? (totalAuthorNumber.toString().concat(totalAuthorNumber === 1 ? ' member' : ' members')) : ''}</div>
              </div>
              <div className={css(styles.feedDescription)}>{this.props.feedDescription}</div>
            </div>
            <div className={css(styles.notificationsAndSettings)}>
              Found any bugs?
              <div>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScKa0F2eyB9fpUbVB9LrCGnwhnWHbiU-eJ2Ab4vPTC5LcUM9g/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">
                  <IconButton tooltip="Submit a bug report">
                    <BugReport color={white} hoverColor={grey300} />
                  </IconButton>
                </a>
              </div>
            </div>
            {isFeedView ?
              <div className={css(styles.searchBar)}>
                <TextField id="Search" floatingLabelText="Search" onChange={this.executeSearch} />
              </div> : ''}
            <div>
              <a className={css(styles.link, styles.topLink)}
                href={`${config.apiHost}/logout`}
              >Logout</a>
            </div>
          </div>
        </Toolbar>
      </MuiThemeProvider>
    );
  }
}

/* eslint-enable */

const mapStateToProps = state => ({
  data: state.articles ? state.articles.data : [],
  annotationsD: state.Discussion ? state.Discussion.annotations : [],
  annotationsF: state.articles ? state.articles.annotations : [],
});


export default connect(mapStateToProps)(TopNav);

// <div><PeopleIcon /></div>

// <div className={css(styles.searchBar)}>
//   <Search />
// </div>

// <div className={css(styles.numMembers)}>{this.props.numFeedMembers || 0} members</div>

//   <div style={{ paddingRight: 15 }}>{subButton}</div>

// <div>
//   <SettingsDialog />
// </div>

// <div>
//   <NotificationsDialog numNotifications={this.props.numNotifications || 0} />
// </div>
