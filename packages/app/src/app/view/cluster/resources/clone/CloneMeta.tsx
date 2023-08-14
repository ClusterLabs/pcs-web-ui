import {Clone} from "app/view/cluster/types";
import {
  NVPairListItemMenu,
  NVPairListPage,
  NVPairToolbar,
} from "app/view/cluster/share";

export const CloneMeta = ({clone}: {clone: Clone}) => {
  const owner = {
    type: "resource-meta",
    id: clone.id,
  } satisfies React.ComponentProps<typeof NVPairToolbar>["owner"];

  const nameList = clone.metaAttributes.map(nvPair => nvPair.name);
  return (
    <NVPairListPage
      nvPairList={clone.metaAttributes}
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
