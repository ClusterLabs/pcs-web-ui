import { StackItem } from "@patternfly/react-core";

import { selectors } from "app/store";
import {
  DetailLayout,
  EmptyStateNoItem,
  useClusterSelector,
  useGroupDetailViewContext,
  useSelectedClusterName,
} from "app/view/share";

import { AclGroupDetailPage } from "./group/AclGroupDetailPage";
import { AclRoleDetailPage } from "./role/AclRoleDetailPage";
import { AclUserDetailPage } from "./user/AclUserDetailPage";
import { AclType } from "./types";

export const AclDetailPage = () => {
  const clusterName = useSelectedClusterName();
  const { selectedItemUrlName: aclId, selectedItemUrlType: urlType } =
    useGroupDetailViewContext();

  const [{ acls }] = useClusterSelector(selectors.getCluster);

  if (urlType !== "role" && urlType !== "user" && urlType !== "group") {
    <DetailLayout caption={"Type does not exists"}>
      <EmptyStateNoItem
        title={`ACL type ${urlType} does not exist.`}
        message={`ACL type ${urlType} does not exist.`}
      />
    </DetailLayout>;
  }

  const aclType = urlType as "role" | "user" | "group";
  const aclObject = acls[aclType]?.[aclId];

  if (!aclObject) {
    return (
      <DetailLayout caption={<strong>{aclId}</strong>}>
        <StackItem>
          <EmptyStateNoItem
            title={`ACL ${aclType} "${aclId}" does not exist.`}
            message={
              `ACL ${aclType} "${aclId}"`
              + ` does not exist in cluster ${clusterName}.`
            }
          />
        </StackItem>
      </DetailLayout>
    );
  }

  if (aclType === "role") {
    return (
      <AclRoleDetailPage roleId={aclId} role={aclObject as AclType<"role">} />
    );
  }

  if (aclType === "user") {
    return (
      <AclUserDetailPage
        userId={aclId}
        roleIdList={aclObject as AclType<"user">}
      />
    );
  }

  return (
    <AclGroupDetailPage
      groupId={aclId}
      roleIdList={aclObject as AclType<"group">}
    />
  );
};
