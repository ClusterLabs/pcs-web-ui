import {
  DetailLayout,
  EmptyStateNoItem,
  useGroupDetailViewContext,
  useSelectedClusterName,
} from "app/view/share";

import { AclGroupDetailPage } from "./group/AclGroupDetailPage";
import { AclRoleDetailPage } from "./role/AclRoleDetailPage";
import { AclUserDetailPage } from "./user/AclUserDetailPage";

export const AclDetailPage = () => {
  const clusterName = useSelectedClusterName();
  const { selectedItemUrlType: aclType } = useGroupDetailViewContext();

  if (aclType === "role") {
    return <AclRoleDetailPage />;
  } else if (aclType === "user") {
    return <AclUserDetailPage />;
  } else if (aclType === "group") {
    return <AclGroupDetailPage />;
  }

  return (
    <DetailLayout caption={"Not configured"}>
      <EmptyStateNoItem
        title={`Acl ${aclType} does not exist.`}
        message={`Acl ${aclType} does not exist in cluster "${clusterName}".`}
      />
    </DetailLayout>
  );
};
