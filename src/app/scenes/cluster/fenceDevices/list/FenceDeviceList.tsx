import React from "react";
import { DataList } from "@patternfly/react-core";

import { types } from "app/store";
import { EmptyStateNoItem, useGroupDetailViewContext } from "app/view";

import { FenceDeviceListItem } from "./FenceDeviceListItem";

export const FenceDeviceList = ({
  fenceDeviceList,
}: {
  fenceDeviceList: types.cluster.FenceDevice[];
}) => {
  const { compact } = useGroupDetailViewContext();

  if (fenceDeviceList.length === 0) {
    return (
      <EmptyStateNoItem
        title="No fence device is configured."
        message="You don't have any configured fence device here."
      />
    );
  }
  return (
    <DataList
      data-test="cluster-fence-devices"
      aria-label="Cluster fence devices"
      className={`ha-c-tree-view${compact ? "" : " ha-m-full-width"}`}
    >
      {fenceDeviceList.map(fenceDevice => (
        <FenceDeviceListItem key={fenceDevice.id} fenceDevice={fenceDevice} />
      ))}
    </DataList>
  );
};
