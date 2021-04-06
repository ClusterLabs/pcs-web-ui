import { combineReducers } from "redux";

import { resourceCreate } from "./resourceCreate";
import { constraintLocationCreate } from "./constraintLocationCreate";
import { constraintOrderCreate } from "./constraintOrderCreate";
import { constraintOrderSetCreate } from "./constraintOrderSetCreate";
import { resourceGroup } from "./resourceGroup";
import { nodeAdd } from "./nodeAdd";
import { fixAuth } from "./fixAuth";

export const tasks = combineReducers({
  resourceCreate: resourceCreate,
  constraintLocationCreate,
  constraintOrderCreate,
  constraintOrderSetCreate,
  resourceGroup,
  nodeAdd,
  fixAuth,
});
