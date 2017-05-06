// This function will traverse the comment tree and arrange it in an array while
// assigning depths to the nodes each time it goes to a child

/* eslint-disable */

export default function dfTraversal(rootNode, callback) {
  const order = [];
  (function recurse(currentNode, depth = 0) {
    console.log('RootNode is: ');
    console.log(rootNode);
    currentNode.depth = depth;
    order.push(currentNode);

    for (let i = 0, length = currentNode.childAnnotations.length; i < length; i += 1) {
      recurse(currentNode.childAnnotations[i], currentNode.depth + 1);
    }

    callback(currentNode);
  }(rootNode));

  console.log('Returning order!');
  return order;
}

export function Node(data) {
  this.text = data;
  this.parent = null;
  this.depth = 0;
  this.children = [];
}

/* eslint-enable */
