const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const data = [];
let nNodes = [];

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

function Node(names) {
  this.value = names;
  this.edges = [];
  this.searched = false;
  this.parent = null;
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
    Graph.addNode(nameNode);
    for (let j = 0; j < relations.length; j++) {
      let name = relations[0][i];
      //   if (vertices[i] === name) {
      // console.log(vertices[i], relations[i]);
      nameNode.addEdge(relations[i]);
      //   }
    }
  }
});
