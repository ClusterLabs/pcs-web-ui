const puppeteer = require("puppeteer");
const { expect } = require("chai");

const { browserOriginal, expectOriginal } = global;

// puppeteer options
const opts = {
  headless: false,
  slowMo: 100,
  timeout: 10000,
};

// expose variables
before(async () => {
  global.expect = expect;
  global.browser = await puppeteer.launch(opts);
});

// close browser and reset global variables
after(() => {
  global.browser.close();

  global.browser = browserOriginal;
  global.expect = expectOriginal;
});
