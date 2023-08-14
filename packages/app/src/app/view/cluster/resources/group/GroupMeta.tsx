import {
  NVPairListItemMenu,
  NVPairListPage,
  useLaunchNVPairCreate,
} from "app/view/cluster/share";
import {Group} from "app/view/cluster/types";
import {LaunchersToolbar} from "app/view/share";

export const GroupMeta = ({group}: {group: Group}) => {
  const owner = {
    type: "resource-meta",
    id: group.id,
  } satisfies Parameters<typeof useLaunchNVPairCreate>[0]["owner"];

  const metaAttributeNameList = group.metaAttributes.map(nvPair => nvPair.name);
  const launchNVPairCreate = useLaunchNVPairCreate({
    owner,
    createLabel: "Create meta attribute",
    nameList: group.metaAttributes.map(nvPair => nvPair.name),
  });
  return (
    <NVPairListPage
      nvPairList={group.metaAttributes}
      toolbar={
        <LaunchersToolbar
          toolbarName="group-meta-attributes"
          buttonsItems={[{...launchNVPairCreate}]}
        />
      }
      menu={(nvPairName, nvPairValue) => (
        <NVPairListItemMenu
          owner={owner}
          itemName={nvPairName}
          itemValue={nvPairValue}
          nvPairNameList={metaAttributeNameList}
          launcherEdit={launcherEdit => ({...launcherEdit})}
          launcherRemove={launcherRemove => ({...launcherRemove})}
        />
      )}
    />
  );
};
