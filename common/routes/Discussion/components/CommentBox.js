import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardText } from 'material-ui/Card';
import { RaisedButton } from 'material-ui';
import { yellow200 } from 'material-ui/styles/colors';
// import DeleteIcon from 'material-ui/svg-icons/action/delete';
// import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import CommentEditor from './CommentEditor';
import { muiTheme } from '../styles/styles';
import { Node } from '../produceCommentGraph';


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
    let textarea = <span id={'Hi'} />;
    const madeThisComment = this.props.node.author ? (this.props.userId === this.props.node.author._id) : false;

    /* eslint-disable */

    if (this.props.isVisible && this.props.commentId === this.props.currentlyOpen) {
      textarea = (
        <div>
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
        marginLeft: COMMENTINDENTAMOUNT * this.props.node.depth,
        borderLeft: '3px solid '.concat(COLORARRAY[(this.props.node.depth % 5)]),
        backgroundColor: 'white',
      }}
      >
        <MuiThemeProvider muiTheme={muiTheme}>
          <Card>
            <CardText expandable={false}>

              {/* <Avatar  */}
              {/*  src={'https://i.imgur.com/9zgiD0u.jpg'} */}
              {/*    size={35} */}
              {/*  /> */}

              <b>{this.props.authorName}</b>{' '}{this.props.timeSince}
              {madeThisComment ?
                <IconMenu
                  style={{ marginLeft: '96%', marginRight: '25px' }}
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                  <MenuItem primaryText="Edit" onClick={this.handleEditReply}/>
                  <MenuItem primaryText="Delete" onClick={this.handleDeleteReply} />
                </IconMenu> : ''}
              <br /> <br />

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
              <FlatButton label="Reply" onClick={this.onToggleReply} />
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
}

/* eslint-enable */

const mapStateToProps = state => ({
  userId: state.user ? state.user._id : '0',
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
