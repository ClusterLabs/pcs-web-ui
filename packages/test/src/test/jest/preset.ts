import {EnvType} from "./envType";
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
  global.locator = getLocator(envType);
  global.backend = getBackend(envType);
  global.login = getLogin(envType);
  global.app = getApp(envType);
};
