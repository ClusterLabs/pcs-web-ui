import {formSwitch, hasFieldError, radioGroup} from "../form";

import {prepareCommonTaskSimple} from "./utils";

const commonTask = prepareCommonTaskSimple({
  taskKey: "permission-edit",
  openKey: "task permissions-create-permission",
});

const {selectors: commonSelectors, inView} = commonTask;

const selectors = {
  ...commonSelectors,
};

type Permission = "read" | "write" | "grant" | "full";

const task = {
  ...commonTask,
  selectors,
  fillName: async (name: string) => {
    await page.type(inView("name"), name);
  },
  selectType: async (permissionType: "user" | "group") => {
    await radioGroup(inView("type"), permissionType);
  },
  switchPermission: async (permission: Permission) => {
    await formSwitch(inView(permission));
  },
  hasNameError: async () => {
    await hasFieldError(inView("name"));
  },
  hasPermissionError: async (permission: Permission) => {
    await hasFieldError(`${inView(permission)}/parent::*`);
  },
};

export {task};
