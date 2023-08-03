import * as shortcuts from "test/shortcuts";

import {goToAcl} from "./common";

const {lists} = marks.cluster.acl;

export const roleListItem = (roleId: string) =>
  shortcuts.common.item(lists.role).byKey(lists.role.id, roleId);

export const openRole = async (roleId: string) => {
  await click(roleListItem(roleId).locator(lists.role.id));
};

export const goToRole = async (roleId: string) => {
  await goToAcl();
  await openRole(roleId);
};

export const toolbar = shortcuts.toolbar(marks.cluster.acl.currentRole.toolbar);
