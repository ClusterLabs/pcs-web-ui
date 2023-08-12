import {NVPairListPage, useLaunchNVPairCreate} from "app/view/cluster/share";
import {Group} from "app/view/cluster/types";
import {LaunchersToolbar} from "app/view/share";

export const GroupMeta = ({group}: {group: Group}) => {
  const owner = {
    type: "resource-meta",
    id: group.id,
  } satisfies Parameters<typeof useLaunchNVPairCreate>[0]["owner"];

  const launchNVPairCreate = useLaunchNVPairCreate({
    owner,
    createLabel: "Create meta attribute",
    nameList: group.metaAttributes.map(nvPair => nvPair.name),
  });
  return (
    <NVPairListPage
      nvPairList={group.metaAttributes}
      owner={{
        type: "resource-meta",
        id: group.id,
      }}
      toolbar={
        <LaunchersToolbar
          toolbarName="group-meta-attributes"
          buttonsItems={[{...launchNVPairCreate}]}
        />
      }
    />
  );
};
