import {testMarks} from "app/view/dataTest";
import {Clone} from "app/view/cluster/types";
import {
  NVPairListItem,
  NVPairListItemMenu,
  NVPairListPage,
  NVPairToolbar,
} from "app/view/cluster/share";

const {meta: nvpairs} = testMarks.cluster.resources.currentClone;
const {pair, toolbar} = nvpairs;
const {menu} = pair;

export const CloneMeta = ({clone}: {clone: Clone}) => {
  return (
    <NVPairListPage
      nvPairList={clone.metaAttributes}
      owner={{type: "resource-meta", id: clone.id}}
      toolbar={
        <NVPairToolbar
          createLabel="Create meta attribute"
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
