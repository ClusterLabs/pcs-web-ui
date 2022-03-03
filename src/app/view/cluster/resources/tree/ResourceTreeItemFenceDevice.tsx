import { FenceDevice } from "app/view/cluster/types";

export const ResourceTreeItemFenceDevice = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  return <>FenceDevice {fenceDevice.id}</>;
};
