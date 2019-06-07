const path = require("path");

const PuppeteerAdapter = require("@pollyjs/adapter-puppeteer");
const FsPersister = require("@pollyjs/persister-fs");
const { Polly } = require("@pollyjs/core");

const { HOST } = require("./backendAddress");

Polly.register(PuppeteerAdapter);
Polly.register(FsPersister);


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

    this.polly.server.host(HOST, () => {
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

module.exports = {
  getPollyManager,
};
