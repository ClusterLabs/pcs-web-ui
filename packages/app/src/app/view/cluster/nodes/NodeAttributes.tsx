import {LaunchersToolbar} from "app/view/share";
import {
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
  const launchNVPairCreate = useLaunchNVPairCreate({
    owner,
    createLabel: "Create node attribute",
    nameList: nodeAttributes.map(nvPair => nvPair.name),
  });
  return (
    <NVPairListPage
      nvPairList={nodeAttributes}
      owner={owner}
      toolbar={
        <LaunchersToolbar
          toolbarName="node-attributes"
          buttonsItems={[{...launchNVPairCreate}]}
        />
      }
    />
  );
};
