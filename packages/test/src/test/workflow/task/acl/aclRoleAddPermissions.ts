import {prepareCommonTaskSimple} from "test/workflow/task/utils";

import {permissionsForm} from "./permissions";

const commonTask = prepareCommonTaskSimple({
  taskKey: "task-acl-role-add-permissions",
  openKey: "task acl-role-add-permissions",
});

const {inView} = commonTask;

const task = {
  ...commonTask,
  permissions: permissionsForm(inView),
};
export {task};
