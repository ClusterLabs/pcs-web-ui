import {Label, ToolbarItem} from "@patternfly/react-core";

import {tools} from "app/store";
import {
  ClusterToolbar,
  GroupDetailView,
  TaskOpenArgs,
  useLauncherDisableClusterNotRunning,
} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

import * as task from "./task";
import {AclDetailPage} from "./detail";
import {AclLists} from "./lists";

export const AclPage = () => {
  const {clusterProperties, hasCibInfo, clusterName} = useLoadedCluster();
  const launchDisable = useLauncherDisableClusterNotRunning();

  const aclEnabled = tools.isCibTrue(clusterProperties["enable-acl"] || "");

  const createUserOpenArgs: TaskOpenArgs<typeof task.createSubject.useTask> = [
    {subjectType: "user"},
  ];
  const createGroupOpenArgs: TaskOpenArgs<typeof task.createSubject.useTask> = [
    {subjectType: "group"},
  ];

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
            launchDisable: launchDisable(
              "Cannot create role on stopped cluster",
            ),
          },
          {
            name: "create-user",
            task: {
              component: task.createSubject.Task,
              useTask: task.createSubject.useTask,
              openArgs: createUserOpenArgs,
            },
            launchDisable: launchDisable(
              "Cannot create user on stopped cluster",
            ),
          },
        ]}
        dropdownItems={[
          {
            name: "create-group",
            task: {
              component: task.createSubject.Task,
              useTask: task.createSubject.useTask,
              openArgs: createGroupOpenArgs,
            },
            launchDisable: launchDisable(
              "Cannot create group on stopped cluster",
            ),
          },
          {
            name: aclEnabled ? "disable-acl" : "enable-acl",
            label: `${aclEnabled ? "Disable" : "Enable"} ACL`,
            confirm: {
              title: aclEnabled ? "Disable ACL" : "Enable ACL",
              description: `${
                aclEnabled ? "Disable" : "Enable"
              } access control lists.`,
              action: {
                type: "CLUSTER.PROPERTIES.UPDATE",
                key: {clusterName},
                payload: {
                  propertyMap: {
                    "enable-acl": aclEnabled ? "false" : "true",
                  },
                },
              },
            },
            launchDisable: launchDisable(
              "Cannot enable/disable acl on stopped cluster",
            ),
          },
        ]}
        after={
          hasCibInfo ? (
            <>
              <ToolbarItem variant="separator" />
              <ToolbarItem>
                <Label variant="outline" color={aclEnabled ? "green" : "grey"}>
                  ACL {aclEnabled ? "enabled" : "disabled"}
                </Label>
              </ToolbarItem>
            </>
          ) : null
        }
      />

      <GroupDetailView
        groupCard={<AclLists />}
        detailCard={<AclDetailPage />}
        detailTypeList={["role", "user", "group"]}
      />
    </>
  );
};
