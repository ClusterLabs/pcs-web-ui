import {
  NVPairListItem,
  NVPairListItemMenu,
  NVPairListPage,
  NVPairToolbar,
} from "app/view/cluster/share";
import {Primitive} from "app/view/cluster/types";

export const PrimitiveMeta = ({primitive}: {primitive: Primitive}) => {
  return (
    <NVPairListPage
      nvPairList={primitive.metaAttributes}
      owner={{type: "resource-meta", id: primitive.id}}
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
