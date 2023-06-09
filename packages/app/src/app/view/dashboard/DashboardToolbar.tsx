import {dataTest} from "app/view/dataTest";
import {LaunchersToolbar} from "app/view/share";

import * as task from "./task";

export const DashboardToolbar = () => {
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
          ...dataTest("dashboard.toolbar.addExistingCluster"),
        },
        {
          name: "setup-cluster",
          task: {
            component: task.clusterSetup.ClusterSetup,
            useTask: task.clusterSetup.useTask,
          },
          ...dataTest("dashboard.toolbar.setupCluster"),
        },
      ]}
      {...dataTest("dashboard.toolbar")}
    />
  );
};
