import * as shortcuts from "test/shortcuts";

import {goToAcl} from "./common";

const {lists} = marks.cluster.acl;

const {item} = shortcuts.common;

export const roleListItem = (roleId: string) =>
  item(lists.role).byKey(lists.role.id, roleId);

export const openRole = async (roleId: string) => {
  await click(roleListItem(roleId).locator(lists.role.id));
};

export const goToRole = async (roleId: string) => {
  await goToAcl();
  await openRole(roleId);
};

const roleToolbar = marks.cluster.acl.currentRole.toolbar;
export const openTask = async (
  getToolbarItem: (toolbar: typeof roleToolbar) => Mark,
) => {
  await click(getToolbarItem(roleToolbar));
};
