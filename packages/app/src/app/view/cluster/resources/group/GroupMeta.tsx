import {
  NVPairListItem,
  NVPairListItemMenu,
  NVPairListPage,
  NVPairToolbar,
} from "app/view/cluster/share";
import {Group} from "app/view/cluster/types";

export const GroupMeta = ({group}: {group: Group}) => {
  return (
    <NVPairListPage
      nvPairList={group.metaAttributes}
      owner={{type: "resource-meta", id: group.id}}
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
