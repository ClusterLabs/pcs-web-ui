import { selectors } from "app/store";
import { useClusterSelector, useGroupDetailViewContext } from "app/view/share";

import { FenceDeviceDoesNotExists } from "./FenceDeviceDoesNotExists";
import { FenceDeviceView } from "./FenceDeviceView";

export const FenceDeviceDetailPage = () => {
  const { selectedItemUrlName: fenceDeviceId } = useGroupDetailViewContext();

  const [fenceDevice] = useClusterSelector(
    selectors.getSelectedFenceDevice,
    fenceDeviceId,
  );

  if (!fenceDevice) {
    return <FenceDeviceDoesNotExists fenceDeviceId={fenceDeviceId} />;
  }
  return <FenceDeviceView fenceDevice={fenceDevice} />;
};
