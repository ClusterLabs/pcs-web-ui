import React from "react";
import {
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  DataListCell,
} from "@patternfly/react-core";
import { Link } from "react-router-dom";

import { types } from "app/store";
import { StatusSign, useGroupDetailViewContext } from "app/view/common";
import { toLabel } from "app/view/utils";

export const FenceDeviceListItem = ({ fenceDevice }: {
  fenceDevice: types.cluster.FenceDevice;
}) => {
  const { urlPrefix } = useGroupDetailViewContext();
  return (
    <DataListItem aria-labelledby={fenceDevice.id}>
      <DataListItemRow>
        <DataListItemCells
          dataListCells={(
            <>
              <DataListCell>
                <Link
                  to={`${urlPrefix}/${fenceDevice.id}`}
                  id={`fence-device-list-item-${fenceDevice.id}`}
                >
                  <strong>{fenceDevice.id}</strong>
                </Link>
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
};
