import {
  ActionList,
  ActionListGroup,
  Form,
  Title,
} from "@patternfly/react-core";
import { Stack, StackItem } from "@patternfly/react-core";

import {
  ActionTaskLauncher,
  ClusterSectionToolbar,
  FormSwitch,
  GroupDetailView,
  useClusterSelector,
} from "app/view/share";
import * as resources from "app/view/cluster/resources/task";
import { selectors } from "app/store";

import * as task from "./task";
import { AclRoleList } from "./role/AclRoleList";
import { AclUserList } from "./user/AclUserList";
import { AclGroupList } from "./group/AclGroupList";
import { AclDetailPage } from "./AclDetailPage";

export const AclPage = () => {
  const [cluster] = useClusterSelector(selectors.getCluster);

  return (
    <>
      <ClusterSectionToolbar>
        <ActionList>
          <Stack hasGutter>
            <StackItem>
              <ActionListGroup>
                <ActionTaskLauncher
                  taskComponent={task.createRole.AclCreateRole}
                  useTask={resources.create.useTask} // CHANGE
                  label="Create Role"
                />
                <ActionTaskLauncher
                  taskComponent={task.createUser.AclCreateUser}
                  useTask={resources.create.useTask} // CHANGE
                  label="Create User"
                  variant="secondary"
                />
                <ActionTaskLauncher
                  taskComponent={task.createGroup.AclCreateGroup}
                  useTask={resources.create.useTask} // CHANGE
                  label="Create Group"
                  variant="secondary"
                />
              </ActionListGroup>
            </StackItem>

            <StackItem>
              <ActionListGroup>
                <Form isHorizontal className="acl">
                  <FormSwitch
                    id="enable-acls"
                    label="Enable ACLs"
                    switchLabel="Enabled"
                    switchLabelOff="Disabled"
                    isChecked={true}
                    onChange={undefined}
                    popover={{
                      header: "Enable CIB ACL",
                      body: "",
                    }}
                  />
                </Form>
              </ActionListGroup>
            </StackItem>
          </Stack>
        </ActionList>
      </ClusterSectionToolbar>

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
