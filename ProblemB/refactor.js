const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
const store = {
  data: [],
};
// const data = [];
rl.on("line", (line) => {
  store.data.push(line.split(" "));
});

const king = (d) => d[1].toString();
const participantNumber = (d) => parseInt(d[0][1]);
const familiesNumber = (d) => parseInt(d[0][0]);
const families = (d) => d.slice(2, parseInt(d[0][0]) + 2);
const participants = (d) => d.slice(-participantNumber(d)).flat();
const familiesEdges = (d) => {
  for (let i = 0; i < d.length; i++) {
    return d.reduce(function (p, c) {
      p[c[0]] = [c[1], c[2]];
      return p;
    }, {});
  }
};

rl.on("close", () => {
  const { data } = store;
  // console.log(data);
  // console.log("king", king(data));
  // console.log("participantNumber", participantNumber(data));
  // console.log("familiesNumber", familiesNumber(data));
  // console.log("families", families(data));
  // console.log("participants", participants(data));
  // const nodes = families(data);
  console.log(familiesEdges(families(data)));

  // orginizing tha data
  // console.log(data);
  // preProcessData(store.data);
});

// const preProcessData = (d) => {
//   for (let i = 2; i < d.length; i++) {
//     console.log(d[i]);
//     for (let j = 0; j < d[i].length; j++) {
//       let result = new Set();
//       result.value = d[i][j];
//       result.edges = [];
//       result.weight = 0;
//       result.searched = false;
//       result.parent = null;
//       console.log(result);
//     }
//   }
// };
