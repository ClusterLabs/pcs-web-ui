import {EnvType} from "./envType";
import {getLogin} from "./login";
import * as locatorTools from "./locator";
import {getGoToCluster, getGoToDashboard} from "./backend";
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
  var appConfirm: typeof locatorTools.appConfirm;
  var radioGroup: typeof locatorTools.radioGroup;
  var taskTitle: typeof locatorTools.taskTitle;
  var getToggle: typeof locatorTools.getToggle;
  var toggle: typeof locatorTools.toggle;
  var fieldError: typeof locatorTools.fieldError;
  var isLocator: typeof locatorTools.isLocator;
  var goToCluster: ReturnType<typeof getGoToCluster>;
  var goToDashboard: ReturnType<typeof getGoToDashboard>;
  var marks: ReturnType<typeof locatorTools.getApp>;
  var item: typeof locatorTools.item;
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
  global.login = getLogin(envType);
  global.marks = locatorTools.getApp(envType);
  global.item = locatorTools.item;
  global.click = locatorTools.click;
  global.fill = locatorTools.fill;
  global.select = locatorTools.select;
  global.appConfirm = locatorTools.appConfirm;
  global.radioGroup = locatorTools.radioGroup;
  global.taskTitle = locatorTools.taskTitle;
  global.getToggle = locatorTools.getToggle;
  global.toggle = locatorTools.toggle;
  global.fieldError = locatorTools.fieldError;
  global.isVisible = locatorTools.isVisible;
  global.isAbsent = locatorTools.isAbsent;
  global.isLocator = locatorTools.isLocator;
  global.goToCluster = getGoToCluster(envType);
  global.goToDashboard = getGoToDashboard(envType);

  // page.setDefaultTimeout(5_000);
};
