import * as lib from "./lib";
import * as dataLoad from "./dataLoad";
import * as apiCall from "./apiCall";
import * as api from "./api";

export { lib, dataLoad, api, apiCall };

export const formatResourcesMsg = (resourceNameList: string[]) =>
  (resourceNameList.length === 1
    ? `resource "${resourceNameList[0]}"`
    : `resources ${resourceNameList.map(r => `"${r}"`).join(", ")}`);
export * from "./effects";
export * from "./apiCall";
export * from "./notifications";
