import {Locator, Page, chromium} from "playwright";

type Login = (username: string, password: string) => Promise<void>;
type LocatorArgs = Parameters<Page["locator"]>;

declare global {
  /* eslint-disable-next-line no-var */
  var page: Page;
  /* eslint-disable-next-line no-var */
  var locator: (...args: LocatorArgs) => Locator;
  /* eslint-disable-next-line no-var */
  var backend: {
    protocol: string;
    host: string;
    port: string | number;
    rootUrl: string;
  };

  /* eslint-disable-next-line no-var */
  var login: Login;
}

const loginStandalone: Login = async (username: string, password: string) => {
  await page.type(
    '//*[@data-test="form-login"]//*[@name="pf-login-username-id"]',
    username,
  );
  await page.type(
    '//*[@data-test="form-login"]//*[@name="pf-login-password-id"]',
    password,
  );
  await page.click('//*[@data-test="form-login"]//button[@type="submit"]');
};
const loginCockpit: Login = async (username: string, password: string) => {
  // It looks like the cockpit wipe out username + password if we are too fast.
  await page.waitForTimeout(200);
  await page.type('//*[@id="login-user-input"]', username);
  await page.type('//*[@id="login-password-input"]', password);
  await page.click('//*[@id="login-button"]');
};

export default async () => {
  const headless =
    process.env.PCS_WUI_TESTS_HEADLESS?.toLowerCase() !== "false";
  const videoDir = process.env.PCS_WUI_TESTS_VIDEO_DIR;
  const environmentType = process.env.PCS_WUI_TEST_TYPE || "standalone";

  const browser = await chromium.launch({headless});
  global.page = await browser.newPage({
    ignoreHTTPSErrors: true,
    ...(videoDir
      ? {
          recordVideo: {
            dir: videoDir,
          },
        }
      : {}),
  });

  global.locator = (...args: LocatorArgs) => {
    if (environmentType === "cockpit") {
      return page.frameLocator('[name$="/ha-cluster"]').locator(...args);
    }
    return page.locator(...args);
  };

  const protocol = process.env.PCSD_PROTOCOL_1 || "https";
  const host = process.env.PCSD_HOST_1 || "";
  const port = process.env.PCSD_PORT_1 || 2224;
  let rootUrl: string;
  switch (environmentType) {
    case "cockpit":
      rootUrl = `${protocol}://${host}:${port}/ha-cluster/`;
      break;
    default:
      rootUrl = `${protocol}://${host}:${port}/`;
      break;
  }

  global.backend = {protocol, host, port, rootUrl};

  global.login = environmentType === "cockpit" ? loginCockpit : loginStandalone;
};
