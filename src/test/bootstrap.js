const puppeteer = require("puppeteer");
const {
  setPage,
  browser,
  browserSetUp,
  browserTearDown,
} = require("./store");

const puppeteerOptions = {
  headless: true,
  args: [
    "--auto-open-devtools-for-tabs",
  ],
  defaultViewport: {
    width: 1200,
    height: 800,
  },
  // slowMo: 100,
  timeout: 12000,
  // dumpio: true,
};

before(async () => {
  browserSetUp(await puppeteer.launch(puppeteerOptions));
  const [browserPage] = await browser().pages();
  await browserPage.setRequestInterception(true);
  setPage(browserPage);
});

after(() => {
  browser().close();
  browserTearDown();
});
