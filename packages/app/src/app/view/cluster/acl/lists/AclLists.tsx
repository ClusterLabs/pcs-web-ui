import {Flex, FlexItem, FlexProps} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {EmptyStateClusterStopped, Link} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

import {AclListCard} from "./AclListCard";
import {AclSubjectListItem} from "./AclSubjectListItem";
import {AclRoleListItem} from "./AclRoleListItem";

const grow: FlexProps["grow"] = {default: "grow"};
const spacer: FlexProps["spacer"] = {default: "spacerNone"};

const {lists} = testMarks.clusterDetail.acl;

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
    <Flex {...lists.mark}>
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
                rolesCount={
                  <span {...lists.user.rolesCount.mark}>
                    {roleIdList.length}
                  </span>
                }
                idLink={
                  <Link strong to={`/user/${id}`} {...lists.user.id.mark}>
                    {id}
                  </Link>
                }
                {...lists.user.mark}
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
                rolesCount={
                  <span {...lists.group.rolesCount.mark}>
                    {roleIdList.length}
                  </span>
                }
                idLink={
                  <Link strong to={`/group/${id}`} {...lists.group.id.mark}>
                    {id}
                  </Link>
                }
                {...lists.group.mark}
              />
            )}
          />
        </FlexItem>
      </Flex>
    </Flex>
  );
};
