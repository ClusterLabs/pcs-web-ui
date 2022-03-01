import { DataList } from "@patternfly/react-core";

import { FenceDevice } from "app/view/cluster/types";
import { EmptyStateNoItem, useGroupDetailViewContext } from "app/view/share";

import { FenceDeviceListItem } from "./FenceDeviceListItem";

export const FenceDeviceList = ({
  fenceDeviceList,
}: {
  fenceDeviceList: FenceDevice[];
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
