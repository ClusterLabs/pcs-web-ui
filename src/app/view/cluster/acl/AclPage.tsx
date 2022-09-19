import { Title } from "@patternfly/react-core";
import { Stack, StackItem } from "@patternfly/react-core";

import { selectors } from "app/store";
import {
  ClusterToolbar,
  GroupDetailView,
  useClusterSelector,
  useSelectedClusterName,
} from "app/view/share";

import * as task from "./task";
import { AclRoleList } from "./role/AclRoleList";
import { AclUserList } from "./user/AclUserList";
import { AclGroupList } from "./group/AclGroupList";
import { AclDetailPage } from "./AclDetailPage";

export const AclPage = () => {
  const [cluster] = useClusterSelector(selectors.getCluster);
  const clusterName = useSelectedClusterName();
  const aclsEnabled = cluster.clusterProperties["enable-acl"] === "true";

  return (
    <>
      <ClusterToolbar
        toolbarName="resources"
        buttonsItems={[
          {
            name: "create-role",
            task: {
              component: task.createRole.Task,
              useTask: task.createRole.useTask,
            },
          },
          {
            name: "create-user",
            task: {
              component: task.createUser.Task,
              useTask: task.createUser.useTask,
            },
          },
        ]}
        dropdownItems={[
          {
            name: "create-group",
            task: {
              component: task.createGroup.Task,
              useTask: task.createGroup.useTask,
            },
          },
          {
            name: aclsEnabled ? "disable-acl" : "enable-acl",
            confirm: {
              title: aclsEnabled ? "Disable acl" : "Enable acl",
              description: "Enable access control lists.",
              action: {
                type: "CLUSTER.PROPERTIES.UPDATE",
                key: { clusterName },
                payload: {
                  propertyMap: {
                    "disable-acl": aclsEnabled ? "true" : "false",
                  },
                },
              },
            },
          },
        ]}
      />

      <GroupDetailView
        groupCard={
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
        }
        detailCard={<AclDetailPage />}
        detailTypeList={["role", "user", "group"]}
      />
    </>
  );
};
