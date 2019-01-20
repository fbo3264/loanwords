const requestP = require("request-promise");

module.exports = class BaseRequestService {
  async get(path, reqOptions) {
    const serviceConfig = this.getBaseConfig();
    const uri = `${serviceConfig.host}${path}`;
    reqOptions = { uri, ...reqOptions, method: "get" };
    const response = await requestP(reqOptions);
    return response;
  }

  getBaseConfig() {}
};
