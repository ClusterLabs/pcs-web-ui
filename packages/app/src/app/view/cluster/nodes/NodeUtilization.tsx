import {
  NVPairListItem,
  NVPairListItemMenu,
  NVPairToolbar,
  UtilizationView,
  useLoadedCluster,
} from "app/view/cluster/share";

export const NodeUtilization = ({nodeName}: {nodeName: string}) => {
  return (
    <UtilizationView
      nvPairList={useLoadedCluster().nodesUtilization?.[nodeName] ?? []}
      owner={{type: "node-utilization", id: nodeName}}
      toolbar={
        <NVPairToolbar
          createLabel="Create utilization attribute"
          launcherCreate={launcherCreate => ({...launcherCreate})}
        />
      }
      listItem={nvPair => (
        <NVPairListItem
          nvPair={nvPair}
          name={name => name}
          value={value => value}
          menu={
            <NVPairListItemMenu
              launcherEdit={launcherEdit => ({...launcherEdit})}
              launcherRemove={launcherRemove => ({...launcherRemove})}
            />
          }
        />
      )}
    />
  );
};
