import { FenceDevice } from "app/view/cluster/types";
import { Link } from "app/view/share";

export const FenceDeviceListCellName = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  return (
    <Link to={`/${fenceDevice.id}`}>
      <strong>{fenceDevice.id}</strong>
    </Link>
  );
};
