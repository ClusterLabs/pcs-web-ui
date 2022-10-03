import { Flex, FlexItem, FlexProps } from "@patternfly/react-core";

import { selectors } from "app/store";
import { useClusterSelector } from "app/view/share";

import { AclListCard } from "./AclListCard";
import { AclSubjectListItem } from "./AclSubjectListItem";
import { AclRoleListItem } from "./AclRoleListItem";

const grow: FlexProps["grow"] = { default: "grow" };
const spacer: FlexProps["spacer"] = { default: "spacerNone" };

export const AclLists = () => {
  const [cluster] = useClusterSelector(selectors.getCluster);
  return (
    <Flex>
      <FlexItem grow={grow} className="pf-u-m-0">
        <AclListCard
          aclType="role"
          aclList={cluster.acls.role}
          renderItem={(id, { permissions }) => (
            <AclRoleListItem id={id} permissions={permissions} />
          )}
        />
      </FlexItem>
      <Flex grow={grow}>
        <FlexItem spacer={spacer} grow={grow}>
          <AclListCard
            aclType="user"
            aclList={cluster.acls.user}
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
            aclList={cluster.acls.group}
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
