import {Clone} from "app/view/cluster/types";
import {NVPairListPage, useLaunchNVPairCreate} from "app/view/cluster/share";
import {LaunchersToolbar} from "app/view/share";

export const CloneMeta = ({clone}: {clone: Clone}) => {
  const owner = {
    type: "resource-meta",
    id: clone.id,
  } satisfies Parameters<typeof useLaunchNVPairCreate>[0]["owner"];

  const launchNVPairCreate = useLaunchNVPairCreate({
    owner,
    createLabel: "Create meta attribute",
    nameList: clone.metaAttributes.map(nvPair => nvPair.name),
  });
  return (
    <NVPairListPage
      nvPairList={clone.metaAttributes}
      owner={owner}
      toolbar={
        <LaunchersToolbar
          toolbarName="clone-meta-attributes"
          buttonsItems={[{...launchNVPairCreate}]}
        />
      }
    />
  );
};
