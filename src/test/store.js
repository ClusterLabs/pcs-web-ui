let browserInstance;
let pageInstance;

module.exports = {
  browser: () => browserInstance,
  page: () => pageInstance,
  setPage: (page) => {
    pageInstance = page;
  },
  browserSetUp: (browser) => {
    browserInstance = browser;
  },
  browserTearDown: () => {
    browserInstance = undefined;
  },
};
