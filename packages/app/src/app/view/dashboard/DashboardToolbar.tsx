import {testMarks} from "app/view/dataTest";
import {LaunchersToolbar} from "app/view/share";

import * as task from "./task";

const {dashboardToolbar: toolbar} = testMarks;
export const DashboardToolbar = () => {
  return (
    <LaunchersToolbar
      buttonsItems={[
        {
          name: "add-existing-cluster",
          task: {
            component: task.importExistingCluster.ImportExistingCluster,
            useTask: task.importExistingCluster.useTask,
          },
          ...toolbar.importExistingCluster.mark,
        },
        {
          name: "setup-cluster",
          task: {
            component: task.clusterSetup.ClusterSetup,
            useTask: task.clusterSetup.useTask,
          },
          ...toolbar.setupCluster.mark,
        },
      ]}
      {...toolbar.mark}
    />
  );
};
