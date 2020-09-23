const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line) => {
  const stonesNum = line;
  const isWinning = stonesNum % 2 === 0 ? "Bob" : "Alice";

  console.log(isWinning);
});
