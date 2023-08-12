import {
  UtilizationView,
  useLaunchNVPairCreate,
  useLoadedCluster,
} from "app/view/cluster/share";
import {LaunchersToolbar} from "app/view/share";

export const NodeUtilization = ({nodeName}: {nodeName: string}) => {
  const {nodesUtilization} = useLoadedCluster();
  const owner = {
    type: "node-utilization",
    id: nodeName,
  } satisfies Parameters<typeof useLaunchNVPairCreate>[0]["owner"];

  const utilizationAttrs = nodesUtilization?.[nodeName] ?? [];

  const launchNVPairCreate = useLaunchNVPairCreate({
    owner,
    createLabel: "Create utilization attribute",
    nameList: utilizationAttrs.map(nvPair => nvPair.name),
  });
  return (
    <UtilizationView
      utilizationAttrs={utilizationAttrs}
      owner={owner}
      toolbar={
        <LaunchersToolbar
          toolbarName="node-utilization-attributes"
          buttonsItems={[{...launchNVPairCreate}]}
        />
      }
    />
  );
};
