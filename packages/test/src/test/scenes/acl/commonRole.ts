import {goToAcl} from "./common";

const {lists} = marks.cluster.acl;

export const goToRole = async (roleId: string) => {
  await goToAcl();
  await click(item.byId(lists.role, roleId, lists.role.id));
};
