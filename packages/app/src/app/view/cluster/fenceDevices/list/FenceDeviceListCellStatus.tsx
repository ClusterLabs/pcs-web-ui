import {testMarks} from "app/view/dataTest";
import {StatusSign, toLabel} from "app/view/share";
import {useGroupDetailViewContext} from "app/view/cluster/share";
import type {FenceDevice} from "app/view/cluster/types";

const {item} = testMarks.cluster.fenceDevices.list;

export const FenceDeviceListCellStatus = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  const {compact} = useGroupDetailViewContext();
  return (
    <div className="ha-c-data-list__item-status">
      {compact && <StatusSign status={fenceDevice.statusSeverity} showOkIco />}
      {!compact && (
        <StatusSign
          status={fenceDevice.statusSeverity}
          label={
            <span {...item.status.mark}>{toLabel(fenceDevice.status)}</span>
          }
          showOkIco
        />
      )}
    </div>
  );
};
