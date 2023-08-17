import {EnvType} from "./envType";
import {getLogin} from "./login";
import {getBackend} from "./backend";
import * as locatorTools from "./locator";
import {getPage} from "./page";

declare global {
  /* eslint-disable no-var */
  var page: ReturnType<typeof getPage> extends Promise<infer P> ? P : never;
  var locatorFor: typeof locatorTools.locatorFor;
  var click: typeof locatorTools.click;
  var isVisible: typeof locatorTools.isVisible;
  var isAbsent: typeof locatorTools.isAbsent;
  var fill: typeof locatorTools.fill;
  var select: typeof locatorTools.select;
  var radioGroup: typeof locatorTools.radioGroup;
  var getToggle: typeof locatorTools.getToggle;
  var toggle: typeof locatorTools.toggle;
  var fieldError: typeof locatorTools.fieldError;
  var isLocator: typeof locatorTools.isLocator;
  var marks: ReturnType<typeof locatorTools.getApp>;
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
  global.locatorFor = locatorTools.locatorFor;
  global.backend = getBackend(envType);
  global.login = getLogin(envType);
  global.marks = locatorTools.getApp(envType);
  global.click = locatorTools.click;
  global.fill = locatorTools.fill;
  global.select = locatorTools.select;
  global.radioGroup = locatorTools.radioGroup;
  global.getToggle = locatorTools.getToggle;
  global.toggle = locatorTools.toggle;
  global.fieldError = locatorTools.fieldError;
  global.isVisible = locatorTools.isVisible;
  global.isAbsent = locatorTools.isAbsent;
  global.isLocator = locatorTools.isLocator;
};
