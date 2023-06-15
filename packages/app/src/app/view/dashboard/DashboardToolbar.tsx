import {subDataTest} from "app/view/dataTest";
import {LaunchersToolbar} from "app/view/share";

import * as task from "./task";

export const DashboardToolbar = () => {
  const dataTest = subDataTest("dashboard.toolbar");
  return (
    <LaunchersToolbar
      toolbarName="dashboard"
      buttonsItems={[
        {
          name: "add-existing-cluster",
          task: {
            component: task.importExistingCluster.ImportExistingCluster,
            useTask: task.importExistingCluster.useTask,
          },
          ...dataTest("runAddExistingCluster"),
        },
        {
          name: "setup-cluster",
          task: {
            component: task.clusterSetup.ClusterSetup,
            useTask: task.clusterSetup.useTask,
          },
          ...dataTest("runSetupCluster"),
        },
      ]}
      {...dataTest(".")}
    />
  );
};
