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
        },
        {
          name: "setup-cluster",
          task: {
            component: task.clusterSetup.ClusterSetup,
            useTask: task.clusterSetup.useTask,
          },
        },
      ]}
    />
  );
};
