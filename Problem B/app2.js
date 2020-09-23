//  graph problem
// Lowest Common Ancestor (LCA) Problem
// Eulerian path method
/**
 * TODO:
 *
 * representing the names as vertex
 * respresent the connection as edgs
 * king is searchKey
 * vertex = {names}
 * edgs: {connections}
 *
 * represent the neighbors concept :
 * vertics u and v are neighbors if an edge(u,v) connect them
 *degree of vertix = is equal to thenumber of edges connected to this V
 * connectivity tow vertex are connected if a pathexists between them
 *
 * it's topological sort applied to a acyclic graphs(dags) only no  cicle connections a to b and b to a
 *  the kid is the vertex and the parents are the neibors
 * on every level away from the king we will devide 100 on the level away from the king
 *
 *
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const data = [];
const potentialFamilies = [];
namePercentage = [];

function flatDeep(arr, d = 1) {
  return d > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
        []
      )
    : arr.slice();
}

rl.on("line", (line) => {
  data.push(line.split(" "));
});

rl.on("close", () => {
  const nodes = flatDeep(data, 2);
  console.log(nodes);

  king = data[1][0];
  families = data.slice(2, parseInt(data[0][0]) + 2);
  //   console.log(families);

  // the graph
  const adjacencyList = new Map();
  // Add note
  function addNode(name) {
    adjacencyList.set(name, []);
    visited = false;
    index = null;
  }
  // add edge, undirected
  function addEdge(origin, destination) {
    adjacencyList.get(origin).push(destination);
    adjacencyList.get(destination).push(origin);
  }
  // create the graph
  data.forEach(addNode);

  function Node(name) {
    this.name = name;
    this.neighbors = [];
    this.searched = false;
    this.parent = null;
  }

  function graph() {
    this.node = [];
    this.graph = {};
  }

  Node();
});
