import {route} from "test/tools";

import {radioGroup} from "../form";

import {prepareCommonTask} from "./utils";

type Permission = Parameters<
  typeof route.aclRoleCreate
>[0]["permissionInfoList"][number];

const commonTask = prepareCommonTask<
  "Enter role name" | "Specify permissions" | "Review"
>({
  taskKey: "task-create-role",
  openKey: "task acl-create-role",
});

type ScopeType = "scope-type" | "scope" | "kind";
const {selectors: commonSelectors, inView} = commonTask;

const selectors = {
  ...commonSelectors,
  roleName: inView("role-name"),
  description: inView("role-description"),
  permission: (index: number, field: ScopeType) =>
    inView(`permission-${index}`, field),
  permissionAdd: inView("permission-add"),
};

const task = {
  ...commonTask,
  selectors,
  fillNameAndDescription: async (roleName: string, description: string) => {
    await page.type(selectors.roleName, roleName);
    await page.type(selectors.description, description);
  },
  fillPermissions: async (permissionList: Permission[]) => {
    for (let i = 0; i < permissionList.length; i++) {
      const permission = permissionList[i];
      await radioGroup(selectors.permission(i, "kind"), permission[0]);
      await radioGroup(selectors.permission(i, "scope-type"), permission[1]);
      await page.type(selectors.permission(i, "scope"), permission[2]);
    }
  },
  permissionAdd: async () => {
    await page.click(selectors.permissionAdd);
  },
};
export {task};
