import {StackItem} from "@patternfly/react-core";

import {selectors} from "app/store";
import {
  DetailLayout,
  EmptyStateNoItem,
  useClusterSelector,
  useGroupDetailViewContext,
  useSelectedClusterName,
} from "app/view/share";

import {AclType} from "../types";

import {RoleView} from "./RoleView";
import {SubjectView} from "./SubjectView";

export const AclDetailPage = () => {
  const clusterName = useSelectedClusterName();
  const {selectedItemUrlName: aclId, selectedItemUrlType: urlType} =
    useGroupDetailViewContext();

  const [{acls}] = useClusterSelector(selectors.getCluster);

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
              + ` does not exist in cluster ${clusterName}.`
            }
          />
        </StackItem>
      </DetailLayout>
    );
  }

  if (aclType === "role") {
    return <RoleView roleId={aclId} role={aclObject as AclType<"role">} />;
  }

  return (
    <SubjectView
      subjectType={aclType}
      subjectId={aclId}
      roleIdList={aclObject as AclType<typeof aclType>}
    />
  );
};
