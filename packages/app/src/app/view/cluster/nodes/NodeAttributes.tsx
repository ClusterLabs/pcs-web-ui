import {LaunchersToolbar} from "app/view/share";
import {
  NVPairListItemMenu,
  NVPairListPage,
  useLaunchNVPairCreate,
  useLoadedCluster,
} from "app/view/cluster/share";

export const NodeAttributes = ({nodeName}: {nodeName: string}) => {
  const owner = {
    type: "node-attr",
    id: nodeName,
  } satisfies Parameters<typeof useLaunchNVPairCreate>[0]["owner"];

  const nodeAttributes = useLoadedCluster().nodeAttr?.[nodeName] ?? [];
  const nodeAttributeNameList = nodeAttributes.map(nvPair => nvPair.name);
  const launchNVPairCreate = useLaunchNVPairCreate({
    owner,
    createLabel: "Create node attribute",
    nameList: nodeAttributeNameList,
  });
  return (
    <NVPairListPage
      nvPairList={nodeAttributes}
      toolbar={
        <LaunchersToolbar
          toolbarName="node-attributes"
          buttonsItems={[{...launchNVPairCreate}]}
        />
      }
      menu={(nvPairName, nvPairValue) => (
        <NVPairListItemMenu
          owner={owner}
          itemName={nvPairName}
          itemValue={nvPairValue}
          nvPairNameList={nodeAttributeNameList}
          launcherEdit={launcherEdit => ({...launcherEdit})}
          launcherRemove={launcherRemove => ({...launcherRemove})}
        />
      )}
    />
  );
};
