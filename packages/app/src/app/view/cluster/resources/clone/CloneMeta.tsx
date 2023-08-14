import {Clone} from "app/view/cluster/types";
import {
  NVPairListItem,
  NVPairListItemMenu,
  NVPairListPage,
  NVPairToolbar,
} from "app/view/cluster/share";

export const CloneMeta = ({clone}: {clone: Clone}) => {
  return (
    <NVPairListPage
      nvPairList={clone.metaAttributes}
      owner={{type: "resource-meta", id: clone.id}}
      toolbar={
        <NVPairToolbar
          createLabel="Create meta attribute"
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
