import {
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {FenceDevice} from "app/view/cluster/types";

import {FenceDeviceListCellStatus} from "./FenceDeviceListCellStatus";
import {FenceDeviceListCellName} from "./FenceDeviceListCellName";
import {FenceDeviceListCellType} from "./FenceDeviceListCellType";

const {item} = testMarks.cluster.fenceDevices.list;

export const FenceDeviceListItem = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  return (
    <DataListItem
      aria-labelledby={fenceDevice.id}
      id={fenceDevice.id}
      {...item.mark}
    >
      <DataListItemRow>
        <DataListItemCells
          dataListCells={
            <>
              <DataListCell>
                <FenceDeviceListCellName fenceDevice={fenceDevice} />
              </DataListCell>
              <DataListCell>
                <FenceDeviceListCellType fenceDevice={fenceDevice} />
              </DataListCell>
            </>
          }
        />
        <FenceDeviceListCellStatus fenceDevice={fenceDevice} />
      </DataListItemRow>
    </DataListItem>
  );
};
