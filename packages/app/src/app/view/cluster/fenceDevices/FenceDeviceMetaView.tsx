import {testMarks} from "app/view/dataTest";
import {
  NVPairListItem,
  NVPairListItemMenu,
  NVPairListPage,
  NVPairToolbar,
} from "app/view/cluster/share";
import type {FenceDevice} from "app/view/cluster/types";

const {meta: nvpairs} = testMarks.cluster.fenceDevices.currentFenceDevice;
const {pair, toolbar} = nvpairs;
const {menu} = pair;

export const FenceDeviceMetaView = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  return (
    <NVPairListPage
      nvPairList={fenceDevice.metaAttributes}
      owner={{type: "fence-device-meta", id: fenceDevice.id}}
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
