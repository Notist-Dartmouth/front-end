import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardText } from 'material-ui/Card';
import { RaisedButton } from 'material-ui';
import { muiTheme } from '../styles/styles';
import { Node } from '../produceCommentGraph';
import { saveReply } from '../actions';

const COMMENTINDENTAMOUNT = 50;
const COLORARRAY = ['Red', 'Green', 'Blue', 'Yellow', 'Purple'];
let notAbleToPost = true;

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.ordering = this.props.ordering;
    this.id = props.id;
    this.onToggleReply = this.onToggleReply.bind(this);
    this.onPostReply = this.onPostReply.bind(this);
    this.getLastBeforeEnd = this.getLastBeforeEnd.bind(this);
    this.updateNotAbleToPost = this.updateNotAbleToPost.bind(this);
  }

  //  style={courses.length > 0 ? 'display: '' : 'display:none'}>

  onToggleReply() {
    console.log('Trying to toggle the reply box!');
    let visible = true;
    if (this.props.commentId !== this.props.currentlyOpen) {
      visible = true;
    } else {
      visible = !this.props.isVisible;
    }

    console.log(`VISIBLE IS: ${visible}`);

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
    console.log('POSTING REPLY!');
    const textInsideTextArea = this.getTextAreaText();
    // const arrayIndex = this.getLastBeforeEnd();   //  this.getLastBeforeEnd(); //  This is where commentBox should be inserted in the array
    //  Splice this node into ordering
    const addedNode = new Node(textInsideTextArea);
    addedNode.depth = this.props.node.depth + 1;
    addedNode.parent = this.props.node;

    console.log('PRE ADD: ');
    console.log(this.ordering);

    this.props.dispatch(saveReply(textInsideTextArea, addedNode.parent._id, this.props.articleURI));
  }

  getLastBeforeEnd() {
    const idx = this.id;
    for (let i = idx + 1; i < this.ordering.length; i += 1) {
      console.log('i: '.concat(i));
      console.log('ordering\'s depth: '.concat(this.ordering[i].depth));
      console.log('Node depth: '.concat(this.props.node.depth));
      if (this.ordering[i].depth <= this.props.node.depth) {
        console.log('Found matching depth!');
        return i;
      }
    }
    return this.ordering.length;
  }

  getTextAreaText() {
    const textInsideTextArea = document.getElementById('textarea'.concat(this.props.id.toString())).value;
    return textInsideTextArea;
  }

  updateNotAbleToPost() {
    const previousNotAbleToPost = notAbleToPost;
    if (document.getElementById('textarea'.concat(this.props.id.toString())) !== null) {
      if (this.getTextAreaText() === '') {
        notAbleToPost = true;
      } else {
        notAbleToPost = false;
      }
    }

    if (previousNotAbleToPost !== notAbleToPost) { // Rerender only when state changes
      this.forceUpdate();
    }
  }

  render() {
    console.log('RENDERING AGAIN!');

    let textarea = <span id={'Hi'} />;

    // console.log('Precrash: ');
    // console.log(this.ordering);

    if (this.props.isVisible && this.props.commentId === this.props.currentlyOpen) {
      textarea = (
        <div>
          <textarea id={'textarea'.concat(this.id.toString())} onChange={this.updateNotAbleToPost}
            style={{
              marginLeft: COMMENTINDENTAMOUNT,
              borderLeft: '3px solid '.concat(COLORARRAY[this.props.node.depth + 1]),
            }}
          />
          <RaisedButton label="Post" primary disabled={notAbleToPost} onClick={this.onPostReply} style={{ marginLeft: '20px' }} />
        </div>
      );
    }

    return (
      <div style={{
        marginLeft: COMMENTINDENTAMOUNT * this.props.node.depth,
        borderLeft: '3px solid '.concat(COLORARRAY[this.props.node.depth]),
        backgroundColor: (this.props.node.depth % 2 === 0) ? 'white' : 'grey',
      }}
      >
        <MuiThemeProvider muiTheme={muiTheme}>
          <Card>
            <CardText expandable={false}>
              {(this.props.id === 0) ? this.props.articleText : ''}
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
