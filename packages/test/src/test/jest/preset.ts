import {getLogin} from "./login";
import {getBackend} from "./backend";
import {getApp, getLocator} from "./locator";
import {getPage} from "./page";

declare global {
  /* eslint-disable no-var */
  var page: ReturnType<typeof getPage> extends Promise<infer P> ? P : never;
  var locator: ReturnType<typeof getLocator>;
  var app: ReturnType<typeof getApp>;
  var backend: ReturnType<typeof getBackend>;
  var login: ReturnType<typeof getLogin>;
}

export default async () => {
  const environmentType =
    process.env.PCS_WUI_TEST_TYPE === "cockpit" ? "cockpit" : "standalone";

  global.page = await getPage();
  global.locator = getLocator(environmentType);
  global.backend = getBackend(environmentType);
  global.login = getLogin(environmentType);
  global.app = getApp(environmentType);
};
