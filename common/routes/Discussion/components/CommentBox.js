import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardText } from 'material-ui/Card';
import { muiTheme } from '../styles/styles';
import { Node } from '../produceCommentGraph';

const COMMENTINDENTAMOUNT = 50;
const COLORARRAY = ['Red', 'Green', 'Blue', 'Yellow', 'Purple'];

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.onToggleReply = this.onToggleReply.bind(this);
    this.onPostReply = this.onPostReply.bind(this);
    this.getLastBeforeEnd = this.getLastBeforeEnd.bind(this);

    // store.subscribe(() => {     //  Will execute everytime the state is updated
    //   this.render();
    // });
  }

  //  style={courses.length > 0 ? 'display: '' : 'display:none'}>

  onToggleReply() {
    console.log('Trying to toggle the reply box!');
    let visible = false;
    if (this.props.id !== this.props.parentIdx) {
      visible = true;
    } else {
      visible = !this.props.isVisible;
    }

    this.props.dispatch({
      type: 'TOGGLE_REPLY',
      parentIdx: this.props.id, // This is the index in the orderings array
      replyText: '',
      isVisible: visible,
      ordering: this.props.ordering,
    });
  }

  onPostReply() {
    console.log('POSTING REPLY!');
    const textInsideTextArea = document.getElementById('textarea'.concat(this.props.id.toString())).value;
    const arrayIndex = this.getLastBeforeEnd();   //  this.getLastBeforeEnd(); //  This is where commentBox should be inserted in the array

    //  Splice this node into ordering
    const addedNode = new Node(textInsideTextArea);
    addedNode.depth = this.props.node.depth + 1;
    addedNode.parent = this.props.node;

    console.log('Index: '.concat(arrayIndex));
    this.props.ordering.splice(arrayIndex, 0, addedNode);

    console.log('Post! '.concat(textInsideTextArea));
    this.props.dispatch({
      type: 'POST_REPLY',
      parentIdx: this.id,
      replyText: textInsideTextArea,
      isVisible: false,
      ordering: this.props.ordering,
    });
  }

  getLastBeforeEnd() {
    const idx = this.id;
    for (let i = idx + 1; i < this.props.ordering.length; i += 1) {
      console.log('i: '.concat(i));
      console.log('ordering\'s depth: '.concat(this.props.ordering[i].depth));
      console.log('Node depth: '.concat(this.props.node.depth));
      if (this.props.ordering[i].depth <= this.props.node.depth) {
        console.log('Found matching depth!');
        return i;
      }
    }
    return this.props.ordering.length;
  }

  render() {
    console.log('RENDERING AGAIN!');

    let textarea = <span id={'Hi'} />;

    if (this.props.isVisible && this.props.parentIdx === this.props.ordering.indexOf(this.props.node)) {
      textarea = (
        <div>
          <textarea id={'textarea'.concat(this.id.toString())}
            style={{
              marginLeft: COMMENTINDENTAMOUNT * (this.props.node.depth + 1),
              borderLeft: '3px solid '.concat(COLORARRAY[this.props.node.depth + 1]),
            }}
          />
          <button onClick={this.onPostReply}>POST</button>
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
              {this.props.node.data}
            </CardText>
            <CardActions>
              <FlatButton label="Reply" onClick={this.onToggleReply} />
              <FlatButton label="Action2" />
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
  parentIdx: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  ordering: PropTypes.array.isRequired,
};

/* eslint-enable */

function mapStateToProps(state) {
  const { parentIdx, isVisible, ordering } = state.Discussion;
  return {
    parentIdx,
    isVisible,
    ordering,
  };
}

export default connect(mapStateToProps)(CommentBox);
