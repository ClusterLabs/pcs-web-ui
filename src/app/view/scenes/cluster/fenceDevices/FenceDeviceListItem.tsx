import React from "react";
import {
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  DataListCell,
} from "@patternfly/react-core";

import { types } from "app/store";
import { StatusSign } from "app/view/common";
import { toLabel } from "app/view/utils";

export const FenceDeviceListItem = ({ fenceDevice }: {
  fenceDevice: types.cluster.FenceDevice,
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
