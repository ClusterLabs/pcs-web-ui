const puppeteer = require("puppeteer");
const { expect } = require("chai");

const { browserOriginal, expectOriginal } = global;

const puppeteerOptions = {
  headless: true,
  slowMo: 100,
  timeout: 10000,
};

// expose variables
before(async () => {
  global.expect = expect;
  global.browser = await puppeteer.launch(puppeteerOptions);
});

// close browser and reset global variables
after(() => {
  global.browser.close();

  global.browser = browserOriginal;
  global.expect = expectOriginal;
});
