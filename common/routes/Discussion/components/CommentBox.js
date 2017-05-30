import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardText } from 'material-ui/Card';
import { yellow200, grey500 } from 'material-ui/styles/colors';
// import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Avatar from 'material-ui/Avatar';
import { StyleSheet, css } from 'aphrodite';
import CommentEditor from './CommentEditor';
import { muiTheme } from '../styles/styles';
import { Node } from '../produceCommentGraph';

const styles = StyleSheet.create({
  authorLine: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  authorAndTime: {
    display: 'flex',
  },
  authorName: {
    paddingRight: 10,
  },
});


/* eslint-disable */
import { saveReply, deleteReply, editReply, loadDiscussion } from '../actions'; // loadDiscussion
/* eslint-enable */

const COMMENTINDENTAMOUNT = 50;
const COLORARRAY = ['Red', 'Green', 'Blue', 'Yellow', 'Purple'];

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: '',
      open: false,
    };
    this.ordering = this.props.ordering;
    this.id = props.id;
    this.onToggleReply = this.onToggleReply.bind(this);
    this.onPostReply = this.onPostReply.bind(this);
    this.getLastBeforeEnd = this.getLastBeforeEnd.bind(this);
    this.updateMarkdown = this.updateMarkdown.bind(this);
    this.handleDeleteReply = this.handleDeleteReply.bind(this);
    this.handleEditReply = this.handleEditReply.bind(this);
    this.onPostEdit = this.onPostEdit.bind(this);
  }

  //  style={courses.length > 0 ? 'display: '' : 'display:none'}>

  onToggleReply() {
    this.state = {
      markdown: '',
    };

    let visible = true;
    if (this.props.commentId !== this.props.currentlyOpen) {
      visible = true;
    } else {
      visible = !this.props.isVisible;
    }

    this.props.dispatch({
      type: 'TOGGLE_REPLY',
      parentIdx: this.props.id, // This is the index in the orderings array
      currentlyOpen: (visible ? this.props.commentId : '0'),
      replyText: 'hello',
      isVisible: visible,
      ordering: this.ordering,
      isEditing: false,
    });
  }

  onPostReply() {
    this.props.dispatch({
      type: 'TOGGLE_REPLY',
      parentIdx: this.props.id, // This is the index in the orderings array
      currentlyOpen: '-1',
      replyText: 'hello',
      isVisible: false,
      ordering: this.ordering,
      isEditing: false,
    });

    // const arrayIndex = this.getLastBeforeEnd();   //  this.getLastBeforeEnd(); //  This is where commentBox should be inserted in the array
    //  Splice this node into ordering
    const addedNode = new Node(this.state.markdown);
    addedNode.depth = this.props.node.depth + 1;
    addedNode.parent = this.props.node;

    this.props.dispatch(saveReply(this.state.markdown, addedNode.parent._id, this.props.articleURI));
  }

  onPostEdit() {
    // this.props.dispatch(editReply(this.props.commentId, this.state.markdown));
    // this.props.dispatch({ type: 'EDIT', isEditing: false });

    Promise.resolve(this.props.dispatch(editReply(this.props.commentId, this.state.markdown))).then(() => this.props.dispatch({ type: 'EDIT', isEditing: false }));
    this.props.dispatch(loadDiscussion(this.props.articleURI));
  }

  getLastBeforeEnd() {
    const idx = this.id;
    for (let i = idx + 1; i < this.ordering.length; i += 1) {
      if (this.ordering[i].depth <= this.props.node.depth) {
        return i;
      }
    }
    return this.ordering.length;
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDeleteReply() {
    Promise.resolve(this.props.dispatch(deleteReply(this.props.commentId))).then(() => this.props.dispatch(loadDiscussion(this.props.articleURI)));
  }

  handleEditReply() {
    this.setState({ markdown: this.props.node.text });
    this.props.dispatch({ type: 'EDIT', editText: 'Hello', editId: this.props.commentId, isEditing: !this.props.isEditing });
  }

  updateMarkdown(event) {
    this.setState({ markdown: event.target.value });
  }

  render() {
    const actions = [
      <RaisedButton
        label="Cancel"
        onTouchTap={this.handleClose}
        style={{ marginRight: 15 }}
      />,
      <RaisedButton
        label="Delete"
        primary
        keyboardFocused
        onTouchTap={this.handleDeleteReply}
      />,
    ];

    let textarea = <span id={'Hi'} />;
    const madeThisComment = this.props.node.author ? (this.props.userId === this.props.node.author._id) : false;

    /* eslint-disable */

    if (this.props.isVisible && this.props.commentId === this.props.currentlyOpen) {
      textarea = (
        <div style={{ paddingTop: 15 }}>
          <CommentEditor
            markdown={this.state.markdown}
            onMarkdownChange={this.updateMarkdown}
            style={{
              marginLeft: COMMENTINDENTAMOUNT,
              borderLeft: '3px solid '.concat(COLORARRAY[(this.props.node.depth + 1) % 5]),
            }}
          />
        <div style={{display: 'flex'}}>
            <RaisedButton label="Post" primary disabled={this.state.markdown === ''} onClick={this.onPostReply} style={{ marginLeft: '20px' }} />
            <div style={{ fontSize: '8pt', opacity: '0.5', textColor: 'grey', }} dangerouslySetInnerHTML={{ __html: marked('\\*\\***bold**\\*\\*  \\__italics_\\_  \\~\\~~~strike~~\\~\\~  \\``code`\\` \\`\\`\\````preformatted```\\`\\`\\` >quote') }} />
          </div>
        </div>
      );
    }

    return (
      <div style={{
        paddingTop: 2,
        paddingRight: 10,
        paddingLeft: 10,
        marginLeft: COMMENTINDENTAMOUNT * this.props.node.depth,
        borderLeft: '3px solid '.concat(COLORARRAY[(this.props.node.depth % 5)]),
        backgroundColor: '#E0F7FA',
      }}
      >
        <MuiThemeProvider muiTheme={muiTheme}>
          <Card>
            <CardText expandable={false}>

              {/* <Avatar  */}
              {/*  src={'https://i.imgur.com/9zgiD0u.jpg'} */}
              {/*    size={35} */}
              {/*  /> */}

              <div className={css(styles.authorLine)}>
                <div className={css(styles.authorAndTime)}>
                  <Avatar src={this.props.photoSrc} size={35} />
                  <div className={css(styles.authorName)}>
                    <b><a href={this.props.profileHref}>{' ' + this.props.authorName}</a></b>
                  </div>
                  {this.props.timeSince}
                </div>
                <div>
                  {madeThisComment || this.props.isAdmin ?
                    <span>
                      <IconButton onClick={this.handleOpen}><DeleteIcon hoverColor={grey500} /></IconButton>
                      <Dialog
                        title="Delete this post"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                      >
                        Are you sure you want to delete this post?
                      </Dialog>
                    </span>
                    : '' }
                </div>
              </div>
              {/* {madeThisComment ?
                <IconMenu
                  style={{ marginLeft: '96%', marginRight: '25px' }}
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                  <MenuItem primaryText="Edit" onClick={this.handleEditReply}/>
                  <MenuItem primaryText="Delete" onClick={this.handleDeleteReply} />
                </IconMenu> : ''}
              <br /> <br /> */}

              <div style={{
                display: 'inline',
                fontStyle: 'italic',
                backgroundColor: yellow200,
              }}
              >
                {(this.props.id === 0) ? this.props.articleText : ''}
              </div>
              {this.props.isEditing && this.props.editId === this.props.commentId ?
                <div>
                  <CommentEditor
                    markdown={this.state.markdown}
                    onMarkdownChange={this.updateMarkdown}
                    style={{
                      marginLeft: COMMENTINDENTAMOUNT,
                      borderLeft: '3px solid '.concat(COLORARRAY[(this.props.node.depth + 1) % 5]),
                    }}
                  />
                  <RaisedButton label="Post" primary disabled={this.state.markdown === ''} onClick={this.onPostEdit} style={{ marginLeft: '20px' }} />
                  <div
                    style={{ fontSize: '8pt', opacity: '0.5', textColor: 'grey', }}
                    dangerouslySetInnerHTML={{ __html: marked('\\*\\***bold**\\*\\*  \\__italics_\\_  \\~\\~~~strike~~\\~\\~  \\``code`\\` \\`\\`\\````preformatted```\\`\\`\\` >quote') }}
                  ></div>
            </div> :
              <div dangerouslySetInnerHTML={{ __html: marked(this.props.node.text || '') }} />
              }
            </CardText>
            <CardActions>
              <RaisedButton label="Reply" onClick={this.onToggleReply} />
              {madeThisComment ? <RaisedButton primary label="Edit" onClick={this.handleEditReply} /> : ''}
            </CardActions>
          </Card>
        </MuiThemeProvider>
        {textarea}
      </div>
    );
  }
}

/* eslint-disable */

CommentBox.propTypes = {
  articleURI: PropTypes.string.isRequired,
  parentIdx: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  ordering: PropTypes.array.isRequired,
};

CommentBox.defaultProps = {
  isVisible: false,
  isAdmin: false,
}

/* eslint-enable */

const mapStateToProps = state => ({
  userId: state.user ? state.user._id : '0',
  isAdmin: state.user ? state.user.isAdmin : false,
  editText: state.Discussion.editText,
  isEditing: state.Discussion.isEditing,
  editId : state.Discussion.editId,
  parentIdx: state.Discussion.parentIdx,
  isVisible: state.Discussion.isVisible,
  currentlyOpen: state.Discussion.currentlyOpen,
});

export default connect(
  mapStateToProps,
)(CommentBox);
