import { FenceDevice } from "app/view/cluster/types";
import { Link } from "app/view/share";

export const FenceDeviceListCellName = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  return (
    <Link strong to={`/${fenceDevice.id}`}>
      {fenceDevice.id}
    </Link>
  );
};
