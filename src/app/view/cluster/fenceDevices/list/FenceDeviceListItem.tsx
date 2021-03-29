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

export const FenceDeviceListItem = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  const { selectedItemUrlName } = useGroupDetailViewContext();
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
        {selectedItemUrlName !== "" && (
          <SelectionIndicatorInGroup
            isSelected={fenceDevice.id === selectedItemUrlName}
          />
        )}
      </DataListItemRow>
    </DataListItem>
  );
};
