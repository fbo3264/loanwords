const WiktionaryRequestService = require("./WiktionaryRequestService");

const service = new WiktionaryRequestService();

(async () => {
  console.log(await service.getLoanwordData("peripher"));
})();
