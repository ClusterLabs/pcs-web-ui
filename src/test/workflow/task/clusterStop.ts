import {prepareCommonTaskSimple} from "./utils";

const commonTask = prepareCommonTaskSimple({
  taskKey: "forceable-confirm-cluster-stop",
  openKey: "task permissions-create-permission",
});

const {selectors: commonSelectors} = commonTask;

const selectors = {
  ...commonSelectors,
};

const task = {
  ...commonTask,
  selectors,
};

export {task};
