import { StatusSign, toLabel, useGroupDetailViewContext } from "app/view/share";
import { FenceDevice } from "app/view/cluster/types";

export const FenceDeviceListCellStatus = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  const { compact } = useGroupDetailViewContext();
  return (
    <div className="ha-c-data-list__item-status">
      {compact && <StatusSign status={fenceDevice.statusSeverity} showOkIco />}
      {!compact && (
        <StatusSign
          status={fenceDevice.statusSeverity}
          label={toLabel(fenceDevice.status)}
          showOkIco
        />
      )}
    </div>
  );
};
