import {route} from "test/tools";
import {radioGroup} from "test/workflow/form";

type ScopeType = "scope-type" | "scope" | "kind";

type Permission = Parameters<
  typeof route.aclRoleCreate | typeof route.aclAddPermission
>[0]["permissionInfoList"][number];

export const permissionsForm = (inView: (..._keys: string[]) => string) => ({
  fill: async (permissionList: Permission[]) => {
    const permissionSelector = (index: number, field: ScopeType) =>
      inView(`permission-${index}`, field);

    for (let i = 0; i < permissionList.length; i++) {
      const permission = permissionList[i];
      await radioGroup(permissionSelector(i, "kind"), permission[0]);
      await radioGroup(permissionSelector(i, "scope-type"), permission[1]);
      await page.type(permissionSelector(i, "scope"), permission[2]);
    }
  },

  add: async () => {
    await page.click(inView("permission-add"));
  },
});
