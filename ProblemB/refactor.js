const { count } = require("console");
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
  results: [],
  percntage: [],
};
const { data, nodes, path } = store;

// read lines
rl.on("line", (line) => {
  store.data.push(line.split(" "));
});

// setup input
const getKing = (d) => d[1].toString();

const participantNumber = (d) => parseInt(d[0][1]);

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

const families = (d) => d.slice(2, parseInt(d[0][0]) + 2);
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

// BFS Breadth-First Search
const BreadthFirstSearch = () => {
  const king = getKing(data);
  // reset searched and parent values after each call
  names(data).forEach((n) => {
    getNode(n).parent = null;
    getNode(n).searched = false;
  });

  const queue = [];
  const start = getStartNode();
  const end = getEndNode();
  counter = 0;

  // set start as searched
  setNodeSearched(start);
  //push it to the queue
  queue.push(start);
  while (queue.length > 0) {
    let current = queue.shift();
    // set weight for each node
    const edges1 = getNode(current).edges;
    let currentEdge = getNode(current);
    if (edges1.length > 0) {
      counter += 1;
      // or we can use incluedes(), i prefer this
      currentEdge.edges.forEach((e) => {
        if (e === king) {
          currentEdge.weight += 50;
          counter += 1;
          // console.log("added 50", currentEdge);
          // console.log("kjsdföajklsdbjksbdf", currentEdge);
        } else {
          if (getNode(e).edges.length > 0) {
            getNode(e).edges.forEach((e) => {
              if (e === king) {
                currentEdge.weight += 25;
              }
            });
          }
        }
      });
    }
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
  // console.log(start, path);
  const res = Array.from(new Set(path));

  store.results.push({
    participant: start,
    value: res,
    // weight: res.length,
    weight: 0,
  });
  // return store.results;
};

const setPercentage = () => {
  const king = getKing(data);
  const participant = participants(data);
  for (let i = 0; i < participant.length; i++) {
    setStartNode(participant[i]);
    setEndNode(king);
    BreadthFirstSearch();
  }
};

const test = (a) => {
  const king = getKing(data);
  const par = [];
  families(data).forEach((f) => {
    par.push(f[0]);
  });
  for (let i = 0; i < a.length; i++) {
    if (par.includes(a[i].participant)) {
      a[i].value.forEach((v) => {
        let edg = getNode(v).edges;
        if (edg.length > 0) {
          getNode(v).edges.forEach((e) => {
            if (e === king) {
              getNode(v).weight += 50;
            } else if (e !== king) {
              if (getNode(e).edges === king) {
                getNode(v).weight += 25;
              }
            }
          });
        }
      });
    }
  }
};

rl.on("close", () => {
  setNodes(data);
  setPercentage();
  test(store.results);
  store.results.forEach((v) => {
    v.value.forEach((c) => {
      v.weight += getNode(c).weight;
    });
  });
  // console.log(store.results);

  store.results.sort(function (a, b) {
    return b.weight - a.weight;
  });

  console.log(store.results[0].participant);
});
