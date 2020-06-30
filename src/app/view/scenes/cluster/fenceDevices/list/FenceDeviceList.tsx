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
import { useGroupDetailViewContext } from "app/view/common";

import { FenceDeviceListItem } from "./FenceDeviceListItem";

export const FenceDeviceList = ({
  fenceDeviceList,
}: {
  fenceDeviceList: types.cluster.FenceDevice[];
}) => {
  const { compact } = useGroupDetailViewContext();

  if (fenceDeviceList.length === 0) {
    return (
      <EmptyState style={{ margin: "auto" }}>
        <EmptyStateIcon icon={PlusCircleIcon} />
        <Title size="lg" headingLevel="h3">
          {" "}
          No fence device is configured.
          {" "}
        </Title>
        <EmptyStateBody>
          You don&apos;t have any configured fence device here.
        </EmptyStateBody>
      </EmptyState>
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
