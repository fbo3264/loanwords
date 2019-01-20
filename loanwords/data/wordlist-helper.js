const wordlist = require("./wordlist.json");

let id = 1;
for (const word of wordlist) {
  word.status = "available";
}

require("fs").writeFileSync("./wordlist2.json", JSON.stringify(wordlist));
