import {
  NVPairListItemMenu,
  NVPairListPage,
  NVPairToolbar,
} from "app/view/cluster/share";
import {Group} from "app/view/cluster/types";

export const GroupMeta = ({group}: {group: Group}) => {
  const owner = {
    type: "resource-meta",
    id: group.id,
  } satisfies React.ComponentProps<typeof NVPairToolbar>["owner"];

  const nameList = group.metaAttributes.map(nvPair => nvPair.name);
  return (
    <NVPairListPage
      nvPairList={group.metaAttributes}
      toolbar={
        <NVPairToolbar
          owner={owner}
          createLabel="Create meta attribute"
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
