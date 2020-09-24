const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const data = [];
let nNodes = new Map();

const flatDeep = (arr, d = 1) => {
  return d > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
        []
      )
    : arr.slice();
};

rl.on("line", (line) => {
  data.push(line.split(" "));
});

function Node(name) {
  let obj = {
    value: name,
    edges: [],
    weight: 0,
    searched: false,
    parent: null,
  };
  return nNodes.set(name, obj);
}

function addWeight(n, w) {
  for ([key, value] of nNodes) {
    console.log(key, value);
  }
}

Node.prototype.addEdge = function (neighbor) {
  this.edges.push(neighbor);
  //   neighbor.edges.push(this);
};

function Graph() {
  this.nodes = [];
  this.graph = {};
}

Graph.prototype.addNode = function (n) {
  // Node into array
  this.nodes.push(n);
  let name = n.value;
  // Node into kind of hash
  this.graph[name] = n;
};

Graph.prototype.getNode = function (name) {
  let n = this.graph[name];
  return n;
};

rl.on("close", () => {
  const allNames = flatDeep(data, 2);
  const relations = data.slice(2, parseInt(data[0][0]) + 2);
  vertices = allNames.slice(3, allNames[1] * -1);
  participents = allNames.slice(allNames[1] * -1);
  king = allNames[2];
  families = data.slice(2, parseInt(data[0][0]) + 2);

  Graph = new Graph();
  for (let i = 0; i < vertices.length; i++) {
    let nameNode = new Node(vertices[i]);
    // Graph.addNode(nameNode);
  }

  let peopleNodes = Array.from(nNodes).reduce(
    (obj, [key, value]) => Object.assign(obj, { [key]: value }),
    [
      {
        start: null,
        end: null,
      },
    ]
  );

  for (let i = 0; i < families.length; i++) {
    Object.keys(peopleNodes).forEach((key) => {
      if (families[i][0] === key) {
        peopleNodes[key].edges.push(...families[i].slice(1, 3));
      }
    });
  }

  // checkKing(peopleNodes);
  const getNode = (n) => peopleNodes[n];
  const getNodeName = (n) => peopleNodes[n].value;
  const getNodeEdges = (n) => peopleNodes[n].edges;
  const getAllNode = () => peopleNodes;
  const getStartNode = () => peopleNodes[0].start;
  const getEndNode = () => peopleNodes[0].end;
  const setStartNode = (n) => (peopleNodes[0].start = n);
  const setEndNode = (n) => (peopleNodes[0].end = n);
  const setNodeVisited = (n) => (peopleNodes[n].searched = true);
  const getNodeVisited = (n) => peopleNodes[n].searched;
  const getNodeParent = (n) => peopleNodes[n].parent;
  const setNodeParent = (n, p) => (peopleNodes[n].parent = p);
  const setNodeWeight = (n, v) => (peopleNodes[n].weight = v);

  function checkKing(k) {
    console.log();
    let queue = [];
    let start = setStartNode(getNodeName(k));
    let end = getEndNode();
    setNodeVisited(k);
    queue.push(start);
    while (queue.length > 0) {
      let current = queue.shift();
      console.log(current);
      if (current === end) {
        console.log("=======>", current);
        break;
      }
      let edges = getNodeEdges(current);
      for (let i = 0; i < edges.length; i++) {
        let neighbor = edges[i];
        if (!getNodeVisited(neighbor)) {
          setNodeVisited(neighbor);
          setNodeParent(current);
          queue.push(neighbor);
        }
      }
    }
  }

  setEndNode(king);
  checkKing(king);

  // console.log(getNode(king));

  // trace the path
  // let end = king
  // let path = [];
  // path.push(end);
  // let next = end.parent;
  // while (next !== null) {
  //   path.push(next);
  //   next = next.parent;
  // }

  // console.log(getNodeEdge("charlesii"));
});
