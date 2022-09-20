import { selectors } from "app/store";
import {
  ClusterToolbar,
  GroupDetailView,
  useClusterSelector,
  useSelectedClusterName,
} from "app/view/share";

import * as task from "./task";
import { AclDetailPage } from "./AclDetailPage";
import { AclLists } from "./lists";

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
        groupCard={<AclLists />}
        detailCard={<AclDetailPage />}
        detailTypeList={["role", "user", "group"]}
      />
    </>
  );
};
