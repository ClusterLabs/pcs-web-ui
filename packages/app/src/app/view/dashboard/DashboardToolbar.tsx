import {testMarks} from "app/view/dataTest";
import {LaunchersToolbar} from "app/view/share";

import * as task from "./task";

export const DashboardToolbar = () => {
  const testMarksToolbar = testMarks.dashboard.toolbar;
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
          ...testMarksToolbar.importExistingCluster.mark,
        },
        {
          name: "setup-cluster",
          task: {
            component: task.clusterSetup.ClusterSetup,
            useTask: task.clusterSetup.useTask,
          },
          ...testMarksToolbar.setupCluster.mark,
        },
      ]}
      {...testMarksToolbar.mark}
    />
  );
};
