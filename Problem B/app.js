// use Dijkstra's Algorithm
// Traversal algorithms
// breadth-first search traversal algorithm

/**
 * node :
 * value
 * edges []
 * searched : true false
 * parent keep track of the parent
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

rl.on("line", (line) => {
  data.push(line.split(" "));
});

rl.on("close", () => {
  king = data[1][0];
  families = data.slice(2, parseInt(data[0][0]) + 2);
  // father = families.map((f) => f[1]);
  // mother = families.map((m) => m[2]);
  // kid = families.map((k) => k[0]);

  // console.log(families);
  // const fatherPercentage = () =>
  //   families.forEach((f) => {
  //     if (f[1] === king || f[2] === king) {
  //       f.push(50);
  //       potentialFamilies.push(f);
  //     }
  //   });

  // const motherPercentage = () => {
  //   potentialFamilies.forEach((f) => {
  //     console.log(f);
  //   });
  // };
  console.log(families);

  // fatherPercentage();
  // motherPercentage();
});
