import React from "react";
import {
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  DataListCell,
} from "@patternfly/react-core";

import { FenceDevice } from "app/services/cluster/types";
import { StatusSign } from "app/common/components";
import { toLabel } from "app/common/utils";

const FenceDeviceListItem = ({ fenceDevice }: {
  fenceDevice: FenceDevice,
}) => (
  <DataListItem aria-labelledby={fenceDevice.id}>
    <DataListItemRow>
      <DataListItemCells
        dataListCells={(
          <>
            <DataListCell>
              {fenceDevice.id}
            </DataListCell>
            <DataListCell>
              <span>Type </span>
              <strong>{fenceDevice.type}</strong>
            </DataListCell>
            <DataListCell>
              <StatusSign
                status={fenceDevice.statusSeverity}
                label={toLabel(fenceDevice.status)}
                showOkIco
              />
            </DataListCell>
          </>
        )}
      />
    </DataListItemRow>
  </DataListItem>
);
export default FenceDeviceListItem;
