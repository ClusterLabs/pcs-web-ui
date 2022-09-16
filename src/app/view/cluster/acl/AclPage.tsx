import { Title } from "@patternfly/react-core";
import { Stack, StackItem } from "@patternfly/react-core";

import { selectors } from "app/store";
import {
  ClusterToolbar,
  GroupDetailView,
  useClusterSelector,
  useSelectedClusterName,
} from "app/view/share";

import * as roleTask from "./role/task/createRole";
import * as userTask from "./user/task/createUser";
import * as groupTask from "./group/task/createGroup";
import { AclRoleList } from "./role/AclRoleList";
import { AclUserList } from "./user/AclUserList";
import { AclGroupList } from "./group/AclGroupList";
import { AclDetailPage } from "./AclDetailPage";

export const AclPage = () => {
  const [cluster] = useClusterSelector(selectors.getCluster);
  const clusterName = useSelectedClusterName();
  const aclsEnabled =
    cluster.clusterProperties["enable-acl"] === "true" ? true : false;

  return (
    <>
      <ClusterToolbar
        toolbarName="resources"
        buttonsItems={[
          {
            name: "create-role",
            task: {
              component: roleTask.Task,
              useTask: roleTask.useTask,
            },
          },
          {
            name: "create-user",
            task: {
              component: userTask.Task,
              useTask: userTask.useTask,
            },
          },
          {
            name: "create-group",
            task: {
              component: groupTask.Task,
              useTask: groupTask.useTask,
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
