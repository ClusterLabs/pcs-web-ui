import {testMarks} from "app/view/dataTest";
import {LaunchersToolbar} from "app/view/share";
import {useOpenTask} from "app/view/task";

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
