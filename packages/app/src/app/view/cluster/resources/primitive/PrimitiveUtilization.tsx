import {testMarks} from "app/view/dataTest";
import {
  NVPairListItem,
  NVPairListItemMenu,
  NVPairToolbar,
  UtilizationView,
} from "app/view/cluster/share";
import {Primitive} from "app/view/cluster/types";

const {utilization: nvpairs} = testMarks.cluster.resources.currentPrimitive;
const {pair, toolbar} = nvpairs;
const {menu} = pair;

export const PrimitiveUtilization = ({primitive}: {primitive: Primitive}) => {
  return (
    <UtilizationView
      nvPairList={primitive.utilization}
      owner={{type: "resource-utilization", id: primitive.id}}
      toolbar={
        <NVPairToolbar
          createLabel="Create utilization attribute"
          launcherCreate={create => ({...create, ...toolbar.create.mark})}
          {...toolbar.mark}
        />
      }
      listItem={nvPair => (
        <NVPairListItem
          nvPair={nvPair}
          name={name => <span {...pair.name.mark}>{name}</span>}
          value={value => <span {...pair.value.mark}>{value}</span>}
          menu={
            <NVPairListItemMenu
              launcherEdit={edit => ({...edit, ...menu.edit.mark})}
              launcherRemove={remove => ({...remove, ...menu.remove.mark})}
              {...menu.mark}
            />
          }
          {...pair.mark}
        />
      )}
      {...nvpairs.mark}
    />
  );
};
