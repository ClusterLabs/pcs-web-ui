import {
  NVPairListItem,
  NVPairListItemMenu,
  NVPairListPage,
  NVPairToolbar,
  useLoadedCluster,
} from "app/view/cluster/share";

export const NodeAttributes = ({nodeName}: {nodeName: string}) => {
  return (
    <NVPairListPage
      nvPairList={useLoadedCluster().nodeAttr?.[nodeName] ?? []}
      owner={{type: "node-attr", id: nodeName}}
      toolbar={
        <NVPairToolbar
          createLabel="Create node attribute"
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
