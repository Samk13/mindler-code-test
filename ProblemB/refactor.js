const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
// store init
const store = {
  data: [],
  nodes: [],
  path: [],
};
const { data, nodes, path } = store;

// read lines
rl.on("line", (line) => {
  store.data.push(line.split(" "));
});

// setup input
const king = (d) => d[1].toString();

const participantNumber = (d) => parseInt(d[0][1]);

const families = (d) => d.slice(2, parseInt(d[0][0]) + 2);

Object.defineProperty(Array.prototype, "flat", {
  value: function (depth = 1) {
    return this.reduce(function (flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) && depth > 1
          ? toFlatten.flat(depth - 1)
          : toFlatten
      );
    }, []);
  },
});

const participants = (d) => d.slice(-participantNumber(d)).flat();

const setEdges = (d) => {
  let edges = families(d);
  for (let i = 0; i < edges.length; i++) {
    return edges.reduce((p, c) => {
      p[c[0]] = [c[1], c[2]];
      return p;
    }, []);
  }
};

const names = (d) => {
  let set = new Set([...participants(d).flat(), ...families(d).flat()]);
  return Array.from(set);
};

const setNodes = (da) => {
  const d = names(da);
  d.forEach((element) => {
    let edges = setEdges(da);
    const checkEdges = edges[element] !== undefined ? edges[element] : [];
    let obj = {
      value: element,
      edges: checkEdges,
      weight: 0,
      searched: false,
      parent: null,
    };
    store.nodes.push(obj);
  });
  store.nodes.unshift({
    start: null,
    end: null,
  });
};
// setup (BFS)  Breadth-First Search algorithm https://en.wikipedia.org/wiki/Breadth-first_search
const setStartNode = (k) => (nodes[0].start = k);
const getStartNode = () => nodes[0].start;
const setEndNode = (k) => (nodes[0].end = k);
const getEndNode = () => nodes[0].end;
const getNode = (n) => nodes.find((node) => node.value === n);
const setNodeSearched = (n) => (getNode(n).searched = true);
const setNodeParent = (n, p) => (getNode(n).parent = p);
const setNodeWeight = (n, w) => (getNode(n).weight = w);
const BreadthFirstSearch = () => {
  let queue = [];
  const start = getStartNode();
  const end = getEndNode();
  // set start as searched
  setNodeSearched(start);
  //push it to the queue
  queue.push(start);
  while (queue.length > 0) {
    let current = queue.shift();
    // console.log("current >> ", current);
    if (end === current) {
      // console.log("FOUND || ========== >", current);
      break;
    }
    let edges = getNode(current).edges;
    for (var i = 0; i < edges.length; i++) {
      let neighbor = edges[i];
      if (!getNode(neighbor).searched) {
        setNodeSearched(neighbor);
        setNodeParent(neighbor, current);
        queue.push(neighbor);
      }
    }
  }

  // trace or reverse search path abd set weight
  path.push(end);
  let next = getNode(end).parent;
  while (next !== null) {
    path.push(next);
    next = getNode(next).parent;
  }
  console.log(path);
  return path;
};

rl.on("close", () => {
  setNodes(data);
  setStartNode("charlesii");
  setEndNode(king(data));
  BreadthFirstSearch();
});
