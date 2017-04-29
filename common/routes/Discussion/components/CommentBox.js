import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardText } from 'material-ui/Card';
import { muiTheme } from '../styles/styles';
import { Node } from '../produceCommentGraph';
import { saveReply } from '../actions';

const COMMENTINDENTAMOUNT = 50;
const COLORARRAY = ['Red', 'Green', 'Blue', 'Yellow', 'Purple'];

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.ordering = this.props.ordering;
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
      replyText: 'hello',
      isVisible: visible,
      ordering: this.ordering,
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

    console.log('PRE ADD: ');
    console.log(this.ordering);

    const ordering = [
      ...this.ordering.slice(0, arrayIndex),
      addedNode,
      ...this.ordering.slice(arrayIndex, this.ordering.length),
    ];


    /* TODO: Post this reply so the backend receives the information about the updated comment tree.
    Then ordering will be received as comments by a prop and it will render correctly */

    this.ordering = ordering; // This updates the local state, but doesn't show because we loop over ordering in Comments.js and this.ordering is local to here.
                              // If ordering were attached to the state, we could just update that, but that's confusing because we're receiving ordering as
                              // a prop so if we connect it to the state then it will be overwritten by the initial load with the reducer and we won't be able to read
                              // the initial value since it will be overwritten from the mapStateToProps call.
    this.props.dispatch(saveReply(textInsideTextArea, addedNode.parent._id, this.props.articleURI));
    // this.props.dispatch({
    //   type: 'POST_REPLY',
    //   parentIdx: this.id,
    //   replyText: textInsideTextArea,
    //   isVisible: false,
    //   ordering,
    // });
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

  render() {
    console.log('RENDERING AGAIN!');

    let textarea = <span id={'Hi'} />;

    // console.log('Precrash: ');
    // console.log(this.ordering);

    if (this.props.isVisible && this.props.parentIdx === this.ordering.indexOf(this.props.node)) {
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
              {this.props.node.text}
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
  const { parentIdx, isVisible } = state.Discussion;
  return {
    parentIdx,
    isVisible,
  };
}

export default connect(
  mapStateToProps,
)(CommentBox);
