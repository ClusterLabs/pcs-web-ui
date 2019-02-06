const path = require("path");

const PuppeteerAdapter = require("@pollyjs/adapter-puppeteer");
const FsPersister = require("@pollyjs/persister-fs");
const { Polly } = require("@pollyjs/core");

Polly.register(PuppeteerAdapter);
Polly.register(FsPersister);

const interceptByScenario = (server, scenario) => {
  server.host("http://localhost:3000", () => {
    scenario.forEach((call) => {
      server[call.method](call.url).intercept(call.handler);
    });
  });
};

function getPollyServer(page, testName) {
  const polly = new Polly(testName, {
    adapters: ["puppeteer"],
    adapterOptions: {
      puppeteer: { page },
    },
    persister: ["fs"],
    persisterOptions: {
      fs: {
        recordingsDir: path.join(__dirname, "recordings"),
      },
    },
  });

  return { server: polly.server, polly };
}

module.exports = {
  getPollyServer,
  interceptByScenario,
};
