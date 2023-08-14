import {
  NVPairListItemMenu,
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
  const utilizationAttrNameList = utilizationAttrs.map(nvPair => nvPair.name);

  const launchNVPairCreate = useLaunchNVPairCreate({
    owner,
    createLabel: "Create utilization attribute",
    nameList: utilizationAttrNameList,
  });
  return (
    <UtilizationView
      utilizationAttrs={utilizationAttrs}
      toolbar={
        <LaunchersToolbar
          toolbarName="node-utilization-attributes"
          buttonsItems={[{...launchNVPairCreate}]}
        />
      }
      menu={(itemName, itemValue) => (
        <NVPairListItemMenu
          owner={owner}
          itemName={itemName}
          itemValue={itemValue}
          nvPairNameList={utilizationAttrNameList}
          launcherEdit={launcherEdit => ({...launcherEdit})}
          launcherRemove={launcherRemove => ({...launcherRemove})}
        />
      )}
    />
  );
};
