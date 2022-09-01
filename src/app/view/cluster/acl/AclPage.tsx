import {
  ActionList,
  ActionListGroup,
  Form,
  Title,
} from "@patternfly/react-core";
import { Stack, StackItem } from "@patternfly/react-core";

import { selectors } from "app/store";
import {
  ActionTaskLauncher,
  ClusterSectionToolbar,
  FormSwitch,
  GroupDetailView,
  useClusterSelector,
  useDispatch,
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
  const dispatch = useDispatch();
  let aclsEnabled =
    cluster.clusterProperties["enable-acl"] === "true" ? true : false;

  return (
    <>
      <ClusterSectionToolbar>
        <ActionList>
          <Stack hasGutter>
            <StackItem>
              <ActionListGroup>
                <ActionTaskLauncher
                  taskComponent={roleTask.Task}
                  useTask={roleTask.useTask}
                  label="Create Role"
                />
                <ActionTaskLauncher
                  taskComponent={userTask.Task}
                  useTask={userTask.useTask}
                  label="Create User"
                />
                <ActionTaskLauncher
                  taskComponent={groupTask.Task}
                  useTask={groupTask.useTask}
                  label="Create Group"
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
                    isChecked={aclsEnabled}
                    onChange={() => {
                      dispatch({
                        type: "CLUSTER.PROPERTIES.UPDATE",
                        key: { clusterName },
                        payload: {
                          propertyMap: {
                            "enable-acl": aclsEnabled ? "true" : "false",
                          },
                        },
                      });
                      aclsEnabled = !aclsEnabled;
                    }}
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
