import {
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {FenceDevice} from "app/view/cluster/types";
import {SelectionIndicatorInGroup} from "app/view/share";
import {useGroupDetailViewContext} from "app/view/cluster/share";

import {FenceDeviceListCellStatus} from "./FenceDeviceListCellStatus";
import {FenceDeviceListCellName} from "./FenceDeviceListCellName";
import {FenceDeviceListCellType} from "./FenceDeviceListCellType";

const {item} = testMarks.cluster.fenceDevices.list;

export const FenceDeviceListItem = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  const {selectedItemUrlName: fenceDeviceId} = useGroupDetailViewContext();
  return (
    <DataListItem aria-labelledby={fenceDevice.id} {...item.mark}>
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
        {fenceDeviceId !== "" && (
          <SelectionIndicatorInGroup
            isSelected={fenceDevice.id === fenceDeviceId}
          />
        )}
      </DataListItemRow>
    </DataListItem>
  );
};
