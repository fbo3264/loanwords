const cheerio = require("cheerio");
const BaseRequestService = require("./base-request-service");
const uuid = require("uuid");

module.exports = class WiktionaryRequestService extends BaseRequestService {
  async getLoanwordData(title) {
    const path = `/wiki/${title.replace(" ", "_")}`;
    const requestOpts = {
      qs: {
        // exlimit: "1",
        // action: "query",
        // prop: "extracts",
        // format: "json",
        // titles: title
      }
    };
    try {
      const response = await this.get(path, requestOpts);
      const $ = cheerio.load(response);
      const meanings = $("p[title|='Sinn und Bezeichnetes (Semantik)']")
        .first()
        .next()
        .text()
        .split("\n");
      const synonyms = $("p[title|='bedeutungsgleich gebrauchte Wörter']")
        .first()
        .next()
        .text()
        .split("\n");
      return {
        title,
        meanings,
        synonyms,
        status: "available",
        id: uuid()
        //htmlDesc: descriptions.html().replace(/[\t\n]*/g, "")
      };
    } catch (err) {
      throw err;
    }
  }

  getBaseConfig() {
    return {
      host: "https://de.wiktionary.org",
      maxSynonyms: 5
    };
  }
};
