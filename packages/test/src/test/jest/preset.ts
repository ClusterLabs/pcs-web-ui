import {EnvType} from "./envType";
import {getLogin} from "./login";
import {getBackend} from "./backend";
import * as locatorTools from "./locator";
import {getPage} from "./page";

declare global {
  /* eslint-disable no-var */
  var page: ReturnType<typeof getPage> extends Promise<infer P> ? P : never;
  var locator: ReturnType<typeof locatorTools.getLocator>;
  var click: typeof locatorTools.click;
  var isVisible: typeof locatorTools.isVisible;
  var fill: typeof locatorTools.fill;
  var isLocator: typeof locatorTools.isLocator;
  var app: ReturnType<typeof locatorTools.getApp>;
  var backend: ReturnType<typeof getBackend>;
  var login: ReturnType<typeof getLogin>;
  type Mark = locatorTools.Mark;
}

const getEnvType = (): EnvType => {
  if (process.env.PCS_WUI_TEST_TYPE === "mocked") {
    return "mocked";
  }
  if (process.env.PCS_WUI_TEST_TYPE === "cockpit") {
    return "cockpit";
  }
  return "standalone";
};

export default async () => {
  const envType = getEnvType();

  global.page = await getPage();
  global.locator = locatorTools.getLocator(envType);
  global.backend = getBackend(envType);
  global.login = getLogin(envType);
  global.app = locatorTools.getApp(envType);
  global.click = locatorTools.click;
  global.fill = locatorTools.fill;
  global.isVisible = locatorTools.isVisible;
  global.isLocator = locatorTools.isLocator;
};
