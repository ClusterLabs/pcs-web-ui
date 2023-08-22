import {
  useGroupDetailViewContext,
  useLoadedCluster,
} from "app/view/cluster/share";

import {FenceDeviceDoesNotExists} from "./FenceDeviceDoesNotExists";
import {FenceDeviceView} from "./FenceDeviceView";

export const FenceDeviceDetailPage = () => {
  const {selectedItemUrlName: selectedId} = useGroupDetailViewContext();

  const fenceDevice = useLoadedCluster().fenceDeviceList.find(
    fd => fd.id === selectedId,
  );
  if (!fenceDevice) {
    return <FenceDeviceDoesNotExists fenceDeviceId={selectedId} />;
  }
  return <FenceDeviceView fenceDevice={fenceDevice} />;
};
