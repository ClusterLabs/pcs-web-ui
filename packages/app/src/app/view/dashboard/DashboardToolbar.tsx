import {testMarks} from "app/view/dataTest";
import {LaunchersToolbar, useOpenTask} from "app/view/share";

const {dashboardToolbar: toolbar} = testMarks;
export const DashboardToolbar = () => {
  const openTask = useOpenTask();
  return (
    <LaunchersToolbar
      buttonsItems={[
        {
          name: "add-existing-cluster",
          run: () => openTask("importExistingCluster"),
          ...toolbar.importExistingCluster.mark,
        },
        {
          name: "setup-cluster",
          run: () => openTask("clusterSetup"),
          ...toolbar.setupCluster.mark,
        },
      ]}
      {...toolbar.mark}
    />
  );
};
