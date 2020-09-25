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
};
const { data, nodes } = store;

rl.on("line", (line) => {
  store.data.push(line.split(" "));
});

const king = (d) => d[1].toString();
// const familiesNumber = (d) => parseInt(d[0][0]);
const participantNumber = (d) => parseInt(d[0][1]);

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
    // console.log(element);

    let edges = setEdges(da);
    // console.log(edges[element]);
    // if(element === )
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

const setStartNode = (k) => (nodes[0].start = k);
const getStartNode = () => nodes[0].start;
const setEndNode = (k) => (nodes[0].end = k);
const getEndNode = () => nodes[0].end;
const getNode = (n) => nodes.find((node) => node.value === n);
const setNodeSearched = (n) => (getNode(n).searched = true);
const setNodeParent = (n, p) => (getNode(n).parent = p);
const setNodeWeight = (n, w) => (getNode(n).weight = w);

rl.on("close", () => {
  setNodes(data);
  setStartNode(king(data));

  console.log(setNodeWeight("henrii", 10));
  console.log(getNode("henrii"));
});
