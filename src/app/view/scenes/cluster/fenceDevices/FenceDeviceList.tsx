import React from "react";
import {
  DataList,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";

import { types } from "app/store";

import { FenceDeviceListItem } from "./FenceDeviceListItem";

export const FenceDeviceList = ({ fenceDeviceList }: {
  fenceDeviceList: types.cluster.FenceDevice[],
}) => {
  if (fenceDeviceList.length === 0) {
    return (
      <EmptyState style={{ margin: "auto" }}>
        <EmptyStateIcon icon={PlusCircleIcon} />
        <Title size="lg"> No fence device is configured. </Title>
        <EmptyStateBody>
          You don&apos;t have any configured fence device here.
        </EmptyStateBody>
      </EmptyState>
    );
  }
  return (
    <DataList aria-label="Cluster fence device list">
      {fenceDeviceList.map((fenceDevice) => (
        <FenceDeviceListItem
          key={fenceDevice.id}
          fenceDevice={fenceDevice}
        />
      ))}
    </DataList>
  );
};
