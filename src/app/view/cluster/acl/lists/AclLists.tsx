import { Stack, StackItem, Title } from "@patternfly/react-core";

import { selectors } from "app/store";
import { useClusterSelector } from "app/view/share";

import { AclRoleList } from "./AclRoleList";
import { AclUserList } from "./AclUserList";
import { AclGroupList } from "./AclGroupList";

export const AclLists = () => {
  const [cluster] = useClusterSelector(selectors.getCluster);
  return (
    <Stack hasGutter>
      <StackItem>
        <Title headingLevel="h1">Roles</Title>
        <AclRoleList aclRoleList={cluster.acls.role} />
      </StackItem>
      <StackItem>
        <Title headingLevel="h1">Users</Title>
        <AclUserList aclUserList={cluster.acls.user} />
      </StackItem>
      <StackItem>
        <Title headingLevel="h1">Groups</Title>
        <AclGroupList aclGroupList={cluster.acls.group} />
      </StackItem>
    </Stack>
  );
};
