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
  getToolbarItem: (toolbar: typeof roleToolbar) => Mark | Mark[],
) => {
  const markOrMarkList = getToolbarItem(roleToolbar);
  const markList = Array.isArray(markOrMarkList)
    ? markOrMarkList
    : [markOrMarkList];

  for (let i = 0; i < markList.length; i++) {
    await click(markList[i]);
  }
};
