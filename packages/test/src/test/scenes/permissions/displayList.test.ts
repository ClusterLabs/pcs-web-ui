import * as shortcuts from "test/shortcuts";
import {intercept} from "test/tools";

import {goToPermissions, interceptForPermissions} from "./common";

const {item} = shortcuts.common;

const {permission: permissionMark} = marks.cluster.permissions;

type SearchInPermission = Parameters<
  ReturnType<ReturnType<typeof item<typeof permissionMark>>["byKey"]>["locator"]
>[0];

type Permission = Parameters<
  typeof interceptForPermissions
>[0]["usersPermissions"][number];

const usersPermissions: Permission[] = [
  {name: "user1", type: "user", allow: ["read"]},
  {
    name: "haclient",
    type: "group",
    allow: ["grant", "read", "write"],
  },
];

const wrapPermission = (name: string) => ({
  thereIs: async (searchInPermission: SearchInPermission, value: string) => {
    await shortcuts.expect.textIs(
      item(permissionMark)
        .byKey(permissionMark.name, name)
        .locator(searchInPermission),
      value,
    );
  },
});

const competenceValue = (
  permission: Permission,
  competence: Permission["allow"][number],
) => (permission.allow.includes(competence) ? "Allowed" : "Disallowed");

describe("Pemissions", () => {
  afterEach(intercept.stop);

  it("should be displayed according to response data", async () => {
    interceptForPermissions({usersPermissions});
    await goToPermissions();
    const pd_1 = usersPermissions[0];
    const user1 = wrapPermission(pd_1.name);
    await user1.thereIs(p => p.type, pd_1.type);
    await user1.thereIs(p => p.read, competenceValue(pd_1, "read"));
    await user1.thereIs(p => p.write, competenceValue(pd_1, "write"));
    await user1.thereIs(p => p.grant, competenceValue(pd_1, "grant"));
    await user1.thereIs(p => p.full, competenceValue(pd_1, "full"));

    const pd_2 = usersPermissions[1];
    const user2 = wrapPermission(pd_2.name);
    await user2.thereIs(p => p.type, pd_2.type);
    await user2.thereIs(p => p.read, competenceValue(pd_2, "read"));
    await user2.thereIs(p => p.write, competenceValue(pd_2, "write"));
    await user2.thereIs(p => p.grant, competenceValue(pd_2, "grant"));
    await user2.thereIs(p => p.full, competenceValue(pd_2, "full"));
  });
});
