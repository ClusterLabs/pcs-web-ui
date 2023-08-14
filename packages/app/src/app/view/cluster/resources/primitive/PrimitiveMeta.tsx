import {
  NVPairListItemMenu,
  NVPairListPage,
  NVPairToolbar,
} from "app/view/cluster/share";
import {Primitive} from "app/view/cluster/types";

export const PrimitiveMeta = ({primitive}: {primitive: Primitive}) => {
  const owner = {
    type: "resource-meta",
    id: primitive.id,
  } satisfies React.ComponentProps<typeof NVPairToolbar>["owner"];

  const nameList = primitive.metaAttributes.map(nvPair => nvPair.name);

  return (
    <NVPairListPage
      nvPairList={primitive.metaAttributes}
      toolbar={
        <NVPairToolbar
          owner={owner}
          createLabel="Create meta attribute"
          nvPairNameList={nameList}
          launcherCreate={launcherCreate => ({...launcherCreate})}
        />
      }
      itemMenu={(itemName, itemValue) => (
        <NVPairListItemMenu
          owner={owner}
          itemName={itemName}
          itemValue={itemValue}
          nvPairNameList={nameList}
          launcherEdit={launcherEdit => ({...launcherEdit})}
          launcherRemove={launcherRemove => ({...launcherRemove})}
        />
      )}
    />
  );
};
