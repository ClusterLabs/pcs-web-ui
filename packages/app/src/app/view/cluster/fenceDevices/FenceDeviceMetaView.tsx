import {Alert} from "@patternfly/react-core";
import {testMarks} from "app/view/dataTest";
import {
  NVPairListItem,
  NVPairListItemMenu,
  NVPairListPage,
  NVPairToolbar,
} from "app/view/cluster/share";
import {useHasCapabilities} from "app/view/cluster/share";
import type {FenceDevice} from "app/view/cluster/types";

const {meta: nvpairs} = testMarks.cluster.fenceDevices.currentFenceDevice;
const {pair, toolbar, noCapabilityWarning} = nvpairs;
const {menu} = pair;

export const FenceDeviceMetaView = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  const canUpdate = useHasCapabilities(["pcmk.resource.update-meta.stonith"]);
  return (
    <>
      {!canUpdate && (
        <Alert
          isInline
          variant="warning"
          title="Backend is not capable to update stonith meta attributes."
          {...noCapabilityWarning.mark}
        />
      )}
      <NVPairListPage
        nvPairList={fenceDevice.metaAttributes}
        owner={{type: "fence-device-meta", id: fenceDevice.id}}
        toolbar={
          canUpdate ? (
            <NVPairToolbar
              createLabel="Create meta attribute"
              launcherCreate={create => ({...create, ...toolbar.create.mark})}
              {...toolbar.mark}
            />
          ) : undefined
        }
        listItem={nvPair => (
          <NVPairListItem
            nvPair={nvPair}
            name={name => <span {...pair.name.mark}>{name}</span>}
            value={value => <span {...pair.value.mark}>{value}</span>}
            menu={
              canUpdate ? (
                <NVPairListItemMenu
                  launcherEdit={edit => ({...edit, ...menu.edit.mark})}
                  launcherRemove={remove => ({...remove, ...menu.remove.mark})}
                  {...menu.mark}
                />
              ) : undefined
            }
            {...pair.mark}
          />
        )}
        {...nvpairs.mark}
      />
    </>
  );
};
