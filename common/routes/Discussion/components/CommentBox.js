import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardText } from 'material-ui/Card';
import { RaisedButton } from 'material-ui';
import { yellow200 } from 'material-ui/styles/colors';
import CommentEditor from './CommentEditor';
import { muiTheme } from '../styles/styles';
import { Node } from '../produceCommentGraph';
import { saveReply } from '../actions';


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
  }

  //  style={courses.length > 0 ? 'display: '' : 'display:none'}>

  onToggleReply() {
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
    });

    // const arrayIndex = this.getLastBeforeEnd();   //  this.getLastBeforeEnd(); //  This is where commentBox should be inserted in the array
    //  Splice this node into ordering
    const addedNode = new Node(this.state.markdown);
    addedNode.depth = this.props.node.depth + 1;
    addedNode.parent = this.props.node;

    this.props.dispatch(saveReply(this.state.markdown, addedNode.parent._id, this.props.articleURI));
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

  getTextAreaText() {
    const textInsideTextArea = document.getElementById('textarea'.concat(this.props.id.toString())).value;
    return textInsideTextArea;
  }

  updateMarkdown(event) {
    this.setState({ markdown: event.target.value });
  }

  render() {
    let textarea = <span id={'Hi'} />;

    // console.log('Precrash: ');
    // console.log(this.ordering);

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
          <RaisedButton label="Post" primary disabled={this.state.markdown === ''} onClick={this.onPostReply} style={{ marginLeft: '20px' }} />
        </div>
      );
    }

    return (
      <div style={{
        marginLeft: COMMENTINDENTAMOUNT * this.props.node.depth,
        borderLeft: '3px solid '.concat(COLORARRAY[(this.props.node.depth % 5)]),
        backgroundColor: (this.props.node.depth % 2 === 0) ? 'white' : 'grey',
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
              <br /> <br />

              <div style={{
                display: 'inline',
                fontStyle: 'italic',
                backgroundColor: yellow200,
              }}
              >
                {(this.props.id === 0) ? this.props.articleText : ''}
              </div>
              <div dangerouslySetInnerHTML={{ __html: marked(this.props.node.text || '') }} />
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

/* eslint-enable */

function mapStateToProps(state) {
  const { parentIdx, isVisible, currentlyOpen } = state.Discussion;
  return {
    parentIdx,
    isVisible,
    currentlyOpen,
  };
}

export default connect(
  mapStateToProps,
)(CommentBox);
