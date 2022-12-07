import {Page, chromium} from "playwright";

declare global {
  /* eslint-disable-next-line no-var */
  var page: Page;
}

export default async () => {
  const headless =
    process.env.PCS_WUI_TESTS_HEADLESS?.toLowerCase() !== "false";
  const browser = await chromium.launch({headless});
  global.page = await browser.newPage({ignoreHTTPSErrors: true});
};
