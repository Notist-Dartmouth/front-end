import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardText } from 'material-ui/Card';
import { muiTheme } from '../styles/styles';
import order, { Node } from '../produceCommentGraph';

const COMMENTINDENTAMOUNT = 50;
const COLORARRAY = ['Red', 'Green', 'Blue', 'Yellow', 'Purple'];

export default class CommentBox extends Component {
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
    let visible = false;
    if (this.props.id !== store.getState().parentIdx) {
      visible = true;
    } else {
      visible = !store.getState().isVisible;
    }

    store.dispatch({
      type: 'TOGGLE_REPLY',
      parentIdx: this.props.id, // This is the index in the orderings array
      replyText: '',
      isVisible: visible,
      ordering: order,
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
    order.splice(arrayIndex, 0, addedNode);

    console.log('Post! '.concat(textInsideTextArea));
    store.dispatch({
      type: 'POST_REPLY',
      parentIdx: this.id,
      replyText: textInsideTextArea,
      isVisible: false,
      ordering: order,
    });
  }

  getLastBeforeEnd() {
    const idx = this.id;
    for (let i = idx + 1; i < order.length; i += 1) {
      console.log('i: '.concat(i));
      console.log('ordering\'s depth: '.concat(order[i].depth));
      console.log('Node depth: '.concat(this.props.node.depth));
      if (order[i].depth <= this.props.node.depth) {
        console.log('Found matching depth!');
        return i;
      }
    }
    return order.length;
  }

  render() {
    console.log('RENDERING AGAIN!');

    let textarea = <span id={'Hi'} />;

    if (store.getState().isVisible && store.getState().parentIdx === order.indexOf(this.props.node)) {
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
