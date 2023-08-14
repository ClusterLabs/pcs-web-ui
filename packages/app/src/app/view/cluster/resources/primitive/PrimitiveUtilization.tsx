import {
  NVPairListItemMenu,
  NVPairToolbar,
  UtilizationView,
} from "app/view/cluster/share";
import {Primitive} from "app/view/cluster/types";

export const PrimitiveUtilization = ({primitive}: {primitive: Primitive}) => {
  const owner = {
    type: "resource-utilization",
    id: primitive.id,
  } satisfies React.ComponentProps<typeof NVPairToolbar>["owner"];

  const nameList = primitive.metaAttributes.map(nvPair => nvPair.name);
  return (
    <UtilizationView
      utilizationAttrs={primitive.utilization}
      toolbar={
        <NVPairToolbar
          owner={owner}
          createLabel="Create utilization attribute"
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
