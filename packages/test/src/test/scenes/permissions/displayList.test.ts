import {assert, mock} from "test/tools";

import {goToPermissions, mockForPermissions} from "./common";

const {permission: permissionMark} = marks.cluster.permissions;

type Permission = Parameters<
  typeof mockForPermissions
>[0]["usersPermissions"][number];

const usersPermissions: Permission[] = [
  {name: "user1", type: "user", allow: ["read"]},
  {
    name: "haclient",
    type: "group",
    allow: ["grant", "read", "write"],
  },
];

const competenceValue = (
  permission: Permission,
  competence: Permission["allow"][number],
) => (permission.allow.includes(competence) ? "Allowed" : "Disallowed");

describe("Pemissions", () => {
  afterEach(mock.stop);

  it("should be displayed according to response data", async () => {
    mockForPermissions({usersPermissions});
    await goToPermissions();
    const pd_1 = usersPermissions[0];
    const user1 = item.byName(permissionMark, pd_1.name);
    await assert.textIs([
      [user1(p => p.type), pd_1.type],
      [user1(p => p.read), competenceValue(pd_1, "read")],
      [user1(p => p.write), competenceValue(pd_1, "write")],
      [user1(p => p.grant), competenceValue(pd_1, "grant")],
      [user1(p => p.full), competenceValue(pd_1, "full")],
    ]);

    const pd_2 = usersPermissions[1];
    const user2 = item.byName(permissionMark, pd_2.name);
    await assert.textIs([
      [user2(p => p.type), pd_2.type],
      [user2(p => p.read), competenceValue(pd_2, "read")],
      [user2(p => p.write), competenceValue(pd_2, "write")],
      [user2(p => p.grant), competenceValue(pd_2, "grant")],
      [user2(p => p.full), competenceValue(pd_2, "full")],
    ]);
  });
});
