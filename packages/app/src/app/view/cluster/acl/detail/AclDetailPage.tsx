import {StackItem} from "@patternfly/react-core";

import {EmptyStateNoItem} from "app/view/share";
import {
  DetailLayout,
  useGroupDetailViewContext,
  useLoadedCluster,
} from "app/view/cluster/share";

import {AclType} from "../types";

import {RoleView} from "./RoleView";
import {GroupView} from "./GroupView";
import {UserView} from "./UserView";

export const AclDetailPage = () => {
  const {selectedItemUrlName: aclId, selectedItemUrlType: urlType} =
    useGroupDetailViewContext();

  const {acls, clusterName} = useLoadedCluster();

  if (urlType !== "role" && urlType !== "user" && urlType !== "group") {
    <DetailLayout caption={"Type does not exist"}>
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
              + ` does not exist in cluster "${clusterName}".`
            }
          />
        </StackItem>
      </DetailLayout>
    );
  }

  if (aclType === "role") {
    return <RoleView roleId={aclId} role={aclObject as AclType<"role">} />;
  }

  if (aclType === "user") {
    return (
      <UserView
        userId={aclId}
        roleIdList={aclObject as AclType<typeof aclType>}
      />
    );
  }
  return (
    <GroupView
      groupId={aclId}
      roleIdList={aclObject as AclType<typeof aclType>}
    />
  );
};
