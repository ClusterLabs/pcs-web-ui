import * as shortcuts from "test/shortcuts";

import {goToAcl} from "./common";

const {lists} = marks.cluster.acl;

export const goToRole = async (roleId: string) => {
  await goToAcl();
  await click(item.byId(lists.role, roleId, lists.role.id));
};

export const toolbar = shortcuts.toolbar(marks.cluster.acl.currentRole.toolbar);
