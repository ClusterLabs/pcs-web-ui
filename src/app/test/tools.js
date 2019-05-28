const path = require("path");

const PuppeteerAdapter = require("@pollyjs/adapter-puppeteer");
const FsPersister = require("@pollyjs/persister-fs");
const { Polly } = require("@pollyjs/core");

Polly.register(PuppeteerAdapter);
Polly.register(FsPersister);

const url = (urlPath = "/") => `http://localhost:3000/ui${urlPath}`;
const link = pathRest => `/ui${pathRest}`;

class PollyManager {
  constructor(page) {
    this.page = page;
  }

  reset(scenario) {
    const { page } = this;
    this.polly = new Polly("TEST", {
      adapters: ["puppeteer"],
      adapterOptions: {
        puppeteer: { page },
      },
      recordFailedRequests: true,
      persister: ["fs"],
      persisterOptions: {
        fs: {
          recordingsDir: path.join(__dirname, "recordings"),
        },
      },
    });

    this.polly.server.host("http://localhost:3000", () => {
      scenario.forEach((call) => {
        this.polly.server[call.method](call.url).intercept(call.handler);
      });
    });
  }

  async stop() {
    await this.polly.flush();
    await this.polly.stop();
  }
}

let pollyManagerInstance;
const getPollyManager = getPage => () => {
  if (pollyManagerInstance === undefined) {
    pollyManagerInstance = new PollyManager(getPage());
  }
  return pollyManagerInstance;
};

const addRecording = (requests) => {
  const records = {};
  const newRequests = {};

  Object.keys(requests).forEach((name) => {
    newRequests[name] = handler => requests[name]((req, res) => {
      records[name] = [...(records[name] || []), req];
      handler(req, res);
    });
  });

  return [newRequests, records];
};

const clearRecords = (records) => {
  /* eslint-disable no-param-reassign */
  Object.keys(records).forEach((name) => {
    delete records[name];
  });
};

module.exports = {
  getPollyManager,
  url,
  link,
  addRecording,
  clearRecords,
};
