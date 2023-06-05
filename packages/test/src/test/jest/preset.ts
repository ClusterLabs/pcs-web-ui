import {getLogin} from "./login";
import {getBackend} from "./backend";
import {getLocator} from "./locator";
import {getPage} from "./page";

declare global {
  /* eslint-disable-next-line no-var */
  var page: ReturnType<typeof getPage> extends Promise<infer P> ? P : never;
  /* eslint-disable-next-line no-var */
  var locator: ReturnType<typeof getLocator>;
  /* eslint-disable-next-line no-var */
  var backend: ReturnType<typeof getBackend>;
  /* eslint-disable-next-line no-var */
  var login: ReturnType<typeof getLogin>;
}

export default async () => {
  const environmentType =
    process.env.PCS_WUI_TEST_TYPE === "cockpit" ? "cockpit" : "standalone";

  global.page = await getPage();
  global.locator = getLocator(environmentType);
  global.backend = getBackend(environmentType);
  global.login = getLogin(environmentType);
};
