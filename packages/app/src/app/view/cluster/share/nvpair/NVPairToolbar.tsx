import {
  LaunchersToolbar,
  useLauncherDisableClusterNotRunning,
} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";
import {useOpenTask} from "app/view/task";

import {useNVPairListContext} from "./NVPairListContext";

type Launcher = NonNullable<
  React.ComponentProps<typeof LaunchersToolbar>["buttonsItems"]
>[number];

export const NVPairToolbar = (props: {
  createLabel: string;
  launcherCreate: (createData: Launcher) => Launcher;
  "data-test"?: string;
}) => {
  const {clusterName} = useLoadedCluster();
  const openTask = useOpenTask();
  const {owner, nvPairList} = useNVPairListContext();
  const launchDisable = useLauncherDisableClusterNotRunning();
  return (
    <LaunchersToolbar
      buttonsItems={[
        props.launcherCreate({
          name: "create",
          label: props.createLabel,
          run: () =>
            openTask("nvpairEdit", {
              type: "CLUSTER.NVPAIRS.EDIT",
              key: {clusterName, task: "nvpairEdit"},
              payload: {
                clusterName,
                type: "create",
                owner,
                nameList: nvPairList.map(pair => pair.name),
              },
            }),
          launchDisable: launchDisable(
            "Cannot create attribute on stopped cluster",
          ),
        }),
      ]}
      data-test={props["data-test"]}
    />
  );
};
