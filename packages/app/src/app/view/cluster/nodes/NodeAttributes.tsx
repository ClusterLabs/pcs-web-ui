import {testMarks} from "app/view/dataTest";
import {
  NVPairListItem,
  NVPairListItemMenu,
  NVPairListPage,
  NVPairToolbar,
  useLoadedCluster,
} from "app/view/cluster/share";

const {attributes: nvpairs} = testMarks.cluster.nodes.currentNode;
const {pair, toolbar} = nvpairs;
const {menu} = pair;

export const NodeAttributes = ({nodeName}: {nodeName: string}) => {
  return (
    <NVPairListPage
      nvPairList={useLoadedCluster().nodeAttr?.[nodeName] ?? []}
      owner={{type: "node-attr", id: nodeName}}
      toolbar={
        <NVPairToolbar
          createLabel="Create node attribute"
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
