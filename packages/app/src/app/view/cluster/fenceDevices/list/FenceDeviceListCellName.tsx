import {testMarks} from "app/view/dataTest";
import type {FenceDevice} from "app/view/cluster/types";
import {Link} from "app/view/share";

const {item} = testMarks.cluster.fenceDevices.list;

export const FenceDeviceListCellName = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  return (
    <Link strong to={`/${fenceDevice.id}`} {...item.id.mark}>
      {fenceDevice.id}
    </Link>
  );
};
