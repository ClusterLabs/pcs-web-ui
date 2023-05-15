import {prepareCommonTask} from "test/workflow/task/utils";

import {permissionsForm} from "./permissions";

const commonTask = prepareCommonTask<
  "Enter role name" | "Specify permissions" | "Review"
>({
  taskKey: "task-create-role",
  openKey: "task acl-create-role",
});

const {selectors: commonSelectors, inView} = commonTask;

const selectors = {
  ...commonSelectors,
  roleName: inView("role-name"),
  description: inView("role-description"),
};

const task = {
  ...commonTask,
  selectors,
  fillNameAndDescription: async (roleName: string, description: string) => {
    await page.type(selectors.roleName, roleName);
    await page.type(selectors.description, description);
  },
  permissions: permissionsForm(inView),
};
export {task};
