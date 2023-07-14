import {testMarks} from "app/view/dataTest";
import {FenceDevice} from "app/view/cluster/types";

const {item} = testMarks.clusterDetail.fenceDevices.list;

export const FenceDeviceListCellType = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  return (
    <>
      <span>Type </span>
      <strong {...item.type.mark}>{fenceDevice.type}</strong>
    </>
  );
};
