const { strict } = require("assert");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
const store = {
  data: [],
  nodes: [],
};

rl.on("line", (line) => {
  store.data.push(line.split(" "));
});

const king = (d) => d[1].toString();
const familiesNumber = (d) => parseInt(d[0][0]);
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

const getEdges = (e) => {
  let edges = setEdges(e);
  // console.log(edges);
  console.log(typeof edges);
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
  store.nodes.push({
    start: null,
    end: null,
  });
};

rl.on("close", () => {
  const { data, nodes } = store;
  // console.log(data);
  // console.log("king", king(data));
  // console.log("participantNumber", participantNumber(data));
  // console.log("familiesNumber", familiesNumber(data));
  // console.log("families", families(data));
  // console.log("participants", participants(data));
  // console.log(families(data));
  setNodes(data);

  console.log(nodes);
  // console.log(getEdges(data));

  // console.log(setEdges(data));
  // orginizing tha data
  // console.log(data);
  // preProcessData(store.data);
});
