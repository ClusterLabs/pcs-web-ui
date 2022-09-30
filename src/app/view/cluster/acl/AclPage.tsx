import { Label, ToolbarItem } from "@patternfly/react-core";

import { selectors, tools } from "app/store";
import {
  ClusterToolbar,
  GroupDetailView,
  TaskOpenArgs,
  useClusterSelector,
  useSelectedClusterName,
} from "app/view/share";

import * as task from "./task";
import { AclDetailPage } from "./detail";
import { AclLists } from "./lists";

export const AclPage = () => {
  const [cluster] = useClusterSelector(selectors.getCluster);
  const clusterName = useSelectedClusterName();
  const aclEnabled = tools.isCibTrue(
    cluster.clusterProperties["enable-acl"] || "",
  );

  const createUserOpenArgs: TaskOpenArgs<typeof task.createSubject.useTask> = [
    { subjectType: "user" },
  ];
  const createGroupOpenArgs: TaskOpenArgs<typeof task.createSubject.useTask> = [
    { subjectType: "group" },
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
          },
          {
            name: "create-user",
            task: {
              component: task.createSubject.Task,
              useTask: task.createSubject.useTask,
              openArgs: createUserOpenArgs,
            },
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
          },
          {
            name: aclEnabled ? "disable-acl" : "enable-acl",
            confirm: {
              title: aclEnabled ? "Disable acl" : "Enable acl",
              description: `${
                aclEnabled ? "Disable" : "Enable"
              } access control lists.`,
              action: {
                type: "CLUSTER.PROPERTIES.UPDATE",
                key: { clusterName },
                payload: {
                  propertyMap: {
                    "enable-acl": aclEnabled ? "true" : "false",
                  },
                },
              },
            },
          },
        ]}
        before={
          <ToolbarItem>
            <Label variant="outline" color={aclEnabled ? "green" : "grey"}>
              Acl {aclEnabled ? "Enabled" : "Disabled"}
            </Label>
          </ToolbarItem>
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
