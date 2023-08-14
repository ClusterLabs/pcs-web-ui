import {
  NVPairListItem,
  NVPairListItemMenu,
  NVPairToolbar,
  UtilizationView,
} from "app/view/cluster/share";
import {Primitive} from "app/view/cluster/types";

export const PrimitiveUtilization = ({primitive}: {primitive: Primitive}) => {
  return (
    <UtilizationView
      nvPairList={primitive.utilization}
      owner={{type: "resource-utilization", id: primitive.id}}
      toolbar={
        <NVPairToolbar
          createLabel="Create utilization attribute"
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
