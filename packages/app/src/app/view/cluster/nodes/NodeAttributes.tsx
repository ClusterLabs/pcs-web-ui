import {
  NVPairListItemMenu,
  NVPairListPage,
  NVPairToolbar,
  useLoadedCluster,
} from "app/view/cluster/share";

export const NodeAttributes = ({nodeName}: {nodeName: string}) => {
  const owner = {
    type: "node-attr",
    id: nodeName,
  } satisfies React.ComponentProps<typeof NVPairToolbar>["owner"];

  const nodeAttributes = useLoadedCluster().nodeAttr?.[nodeName] ?? [];
  const nameList = nodeAttributes.map(nvPair => nvPair.name);
  return (
    <NVPairListPage
      nvPairList={nodeAttributes}
      toolbar={
        <NVPairToolbar
          owner={owner}
          createLabel="Create node attribute"
          nvPairNameList={nameList}
          launcherCreate={launcherCreate => ({...launcherCreate})}
        />
      }
      menu={(nvPairName, nvPairValue) => (
        <NVPairListItemMenu
          owner={owner}
          itemName={nvPairName}
          itemValue={nvPairValue}
          nvPairNameList={nameList}
          launcherEdit={launcherEdit => ({...launcherEdit})}
          launcherRemove={launcherRemove => ({...launcherRemove})}
        />
      )}
    />
  );
};
