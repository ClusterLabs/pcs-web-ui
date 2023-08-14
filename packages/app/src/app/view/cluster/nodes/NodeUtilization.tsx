import {
  NVPairListItemMenu,
  NVPairToolbar,
  UtilizationView,
  useLoadedCluster,
} from "app/view/cluster/share";

export const NodeUtilization = ({nodeName}: {nodeName: string}) => {
  const {nodesUtilization} = useLoadedCluster();
  const owner = {
    type: "node-utilization",
    id: nodeName,
  } satisfies React.ComponentProps<typeof NVPairToolbar>["owner"];

  const utilizationAttrs = nodesUtilization?.[nodeName] ?? [];
  const nameList = utilizationAttrs.map(nvPair => nvPair.name);

  return (
    <UtilizationView
      utilizationAttrs={utilizationAttrs}
      toolbar={
        <NVPairToolbar
          owner={owner}
          createLabel="Create utilization attribute"
          nvPairNameList={nameList}
          launcherCreate={launcherCreate => ({...launcherCreate})}
        />
      }
      itemMenu={(itemName, itemValue) => (
        <NVPairListItemMenu
          owner={owner}
          itemName={itemName}
          itemValue={itemValue}
          nvPairNameList={nameList}
          launcherEdit={launcherEdit => ({...launcherEdit})}
          launcherRemove={launcherRemove => ({...launcherRemove})}
        />
      )}
    />
  );
};
