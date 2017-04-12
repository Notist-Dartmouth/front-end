//  TO DO: Make this query API to get comments and sort according to timestamp

function Node(data) {
  this.data = data;
  this.parent = null;
  this.depth = 0;
  this.children = [];
}

function Tree(data) {
  const node = new Node(data);
  this._root = node;
}

Tree.prototype.traverseDF = function (callback) {
  const order = [];
  // this is a recurse and immediately-invoking function
  (function recurse(currentNode, depth = 0) {
    currentNode.depth = depth;
    order.push(currentNode);

    for (let i = 0, length = currentNode.children.length; i < length; i += 1) {
      recurse(currentNode.children[i], currentNode.depth + 1);
    }
    callback(currentNode);
  })(this._root);

  return order;
};

//  Build example comment tree

const tree = new Tree('Lorem ipsum');

tree._root.children.push(new Node('Morem lipsum'));
tree._root.children[0].parent = tree;

tree._root.children.push(new Node('Slorem dipsum'));
tree._root.children[1].parent = tree;

tree._root.children.push(new Node('Yes'));
tree._root.children[2].parent = tree;

tree._root.children[0].children.push(new Node('Lorem lorem ipsum ipsum'));
tree._root.children[0].children[0].parent = tree._root.children[0];

tree._root.children[0].children.push(new Node('merol muspi'));
tree._root.children[0].children[1].parent = tree._root.children[0];

tree._root.children[2].children.push(new Node('I like saying lorem ipsum too!'));
tree._root.children[2].children[0].parent = tree._root.children[2];

const order = tree.traverseDF(function (node) {

});

export { Node };
export default order;
