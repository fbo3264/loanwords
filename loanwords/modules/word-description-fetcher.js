const fs = require("fs-extra");
const path = require("path");

const WiktionaryRequestService = require("./WiktionaryRequestService");

class WordDescriptionFetcher {
  constructor(wordListPath) {
    this.wordListPath = wordListPath;
  }

  async sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
  }

  async parseWordList() {
    let wordsFetched = 0;
    const maxWords = 10;

    const reqService = new WiktionaryRequestService();
    return new Promise(async (resolve, reject) => {
      const words = new Map();
      const pathToResultFile = path.join(
        __dirname,
        "..",
        "data",
        "wordlist.json"
      );
      await fs.unlink(pathToResultFile);
      await fs.appendFile(pathToResultFile, "[");
      const lineReader = require("readline").createInterface({
        input: fs.createReadStream(this.wordListPath)
      });

      lineReader.on("line", async line => {
        if (!words.has(line)) {
          words.set(line.trim(), true);
          try {
            console.log(`Fetching word ${line} ...`);
            const response = await reqService.getLoanwordData(line);
            await fs.appendFile(
              pathToResultFile,
              JSON.stringify(response) + ","
            );
            console.log(`... done`);
          } catch (err) {
            console.log(
              "Error occured while getting data for word " +
                line +
                "... skipping"
            );
          }
        }
      });

      lineReader.on("close", async () => {
        await fs.appendFile(pathToResultFile, " ]");
        resolve();
      });
    });
  }

  async fetchWordDescription() {}
}

(async () => {
  const fetcher = new WordDescriptionFetcher(
    path.join(__dirname, "..", "data", "wordlist.1.txt")
  );
  await fetcher.parseWordList();
})();
