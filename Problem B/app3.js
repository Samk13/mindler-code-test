const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const flatDeep = (arr, d = 1) => {
  return d > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
        []
      )
    : arr.slice();
};

// store
const data = [];
let vertices = [];
let edges = [];
const vertexlist = new Map();
let king = "";
let participents = null;

rl.on("line", (line) => {
  data.push(line.split(" "));
});

const findEdges = (fam) => {
  //   let name = fam.map((f) => f[0]);
  edges = fam.map((f) => [f[1], f[2]]);
};

function addVertex(name) {
  vertexlist.set(name, []);
}

function addEdge(p1, p2) {
  vertexlist.get(p1).push(p2);
  vertexlist.get(p2).push(p1);
}

rl.on("close", () => {
  const nodes = flatDeep(data, 2);
  vertices = nodes.slice(3, nodes[1] * -1);
  participents = nodes.slice(nodes[1] * -1);
  king = nodes[2];
  families = data.slice(2, parseInt(data[0][0]) + 2);
  findEdges(families);
  vertices.forEach((n) => addVertex(n));
  edges.forEach((edge) => addEdge(...edge));

  const checkList = (list) => {
    participents.forEach((p) => {
      if (list.get(p)) {
        console.log(list.get(p));
      }
    });
  };

  checkList(vertexlist);

  // bfs search
  // function bfs(start) {
  //   // const visited = new Set();
  //   const visited = [];
  //   const queue = [start];
  //   while (queue.length > 0) {
  //     const vert = queue.shift(); // will mutate the queue
  //     const winners = vertexlist.get(vert);
  //     for (const winner of winners) {
  //       queue.unshift(winner);
  //       if (winner === king) {
  //         console.log("winner");
  //         return;
  //       }
  //       if (!visited.includes(winner)) {
  //         visited.push(winner);
  //         queue.push(winner);
  //       }
  //     }
  //   }
  //   return;
  // }
  // bfs(king);
});
