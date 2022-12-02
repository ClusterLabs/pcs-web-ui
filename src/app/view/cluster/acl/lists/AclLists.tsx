import {Flex, FlexItem, FlexProps} from "@patternfly/react-core";

import {EmptyStateClusterStopped, useLoadedCluster} from "app/view/share";

import {AclListCard} from "./AclListCard";
import {AclSubjectListItem} from "./AclSubjectListItem";
import {AclRoleListItem} from "./AclRoleListItem";

const grow: FlexProps["grow"] = {default: "grow"};
const spacer: FlexProps["spacer"] = {default: "spacerNone"};

export const AclLists = () => {
  const {acls, hasCibInfo, clusterName} = useLoadedCluster();
  if (!hasCibInfo) {
    return (
      <EmptyStateClusterStopped
        title={"Cannot get ACLs from stopped cluster"}
        clusterName={clusterName}
      />
    );
  }
  return (
    <Flex>
      <FlexItem grow={grow} className="pf-u-m-0">
        <AclListCard
          aclType="role"
          aclList={acls.role}
          renderItem={(id, {permissions}) => (
            <AclRoleListItem id={id} permissions={permissions} />
          )}
        />
      </FlexItem>
      <Flex grow={grow}>
        <FlexItem spacer={spacer} grow={grow}>
          <AclListCard
            aclType="user"
            aclList={acls.user}
            renderItem={(id, roleIdList) => (
              <AclSubjectListItem
                aclType="user"
                id={id}
                roleIdList={roleIdList}
              />
            )}
          />
        </FlexItem>
        <FlexItem spacer={spacer} grow={grow}>
          <AclListCard
            aclType="group"
            aclList={acls.group}
            renderItem={(id, roleIdList) => (
              <AclSubjectListItem
                aclType="group"
                id={id}
                roleIdList={roleIdList}
              />
            )}
          />
        </FlexItem>
      </Flex>
    </Flex>
  );
};
