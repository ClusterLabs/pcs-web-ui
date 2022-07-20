import { useGroupDetailViewContext } from "app/view/share";

import { AclGroupDetailPage } from "./group/AclGroupDetailPage";
import { AclRoleDetailPage } from "./role/AclRoleDetailPage";
import { AclUserDetailPage } from "./user/AclUserDetailPage";

export const AclDetailPage = () => {
  const { selectedItemUrlType: aclType } = useGroupDetailViewContext();

  if (aclType === "role") {
    return <AclRoleDetailPage />;
  } else if (aclType === "user") {
    return <AclUserDetailPage />;
  } else if (aclType === "group") {
    return <AclGroupDetailPage />;
  }

  return null; // CHANGE TO "not configured"
};
