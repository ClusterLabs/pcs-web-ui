import React from "react";
import {
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from "@patternfly/react-core";

import { FenceDevice } from "app/view/cluster/types";
import {
  SelectionIndicatorInGroup,
  useGroupDetailViewContext,
} from "app/view/share";

import { FenceDeviceListCellStatus } from "./FenceDeviceListCellStatus";
import { FenceDeviceListCellName } from "./FenceDeviceListCellName";
import { FenceDeviceListCellType } from "./FenceDeviceListCellType";

export const FenceDeviceListItem: React.FC<{
  fenceDevice: FenceDevice;
}> = ({ fenceDevice }) => {
  const { selectedItemUrlName: fenceDeviceId } = useGroupDetailViewContext();
  return (
    <DataListItem aria-labelledby={fenceDevice.id}>
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
