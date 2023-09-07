import {testMarks} from "app/view/dataTest";
import {
  NVPairListItem,
  NVPairListItemMenu,
  NVPairToolbar,
  UtilizationView,
  useLoadedCluster,
} from "app/view/cluster/share";

const {utilization: nvpairs} = testMarks.cluster.nodes.currentNode;
const {pair, toolbar} = nvpairs;
const {menu} = pair;

export const NodeUtilization = ({nodeName}: {nodeName: string}) => {
  return (
    <UtilizationView
      nvPairList={useLoadedCluster().nodesUtilization?.[nodeName] ?? []}
      owner={{type: "node-utilization", id: nodeName}}
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
