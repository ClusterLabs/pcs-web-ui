import React from "react";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";

import { types, url, utils } from "app/store";
import { Link, StatusSign, Table, toLabel } from "app/view";

import { compareStrings } from "./utils";

type COLUMNS = "NAME" | "STATUS";

const compareByColumn = (
  column: COLUMNS | "",
): ((a: types.cluster.FenceDevice, b: types.cluster.FenceDevice) => number) => {
  switch (column) {
    case "STATUS":
      return (a, b) =>
        utils.compareStatusSeverity(a.statusSeverity, b.statusSeverity);
    default:
      return (a, b) => compareStrings(a.id, b.id);
  }
};

const { SortableTh } = Table;

export const DashboardClusterFenceDevices = ({
  cluster,
}: {
  cluster: types.cluster.ClusterStatus;
}) => {
  const { sortState, compareItems } = SortableTh.useSorting<COLUMNS>("NAME");
  if (cluster.fenceDeviceList.length === 0) {
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
    <Table isCompact isBorderless data-test="fence-device-list">
      <thead>
        <tr>
          <SortableTh columnName="NAME" sortState={sortState}>
            Fence device
          </SortableTh>
          <SortableTh columnName="STATUS" sortState={sortState} startDesc>
            Status
          </SortableTh>
        </tr>
      </thead>
      <tbody>
        {cluster.fenceDeviceList
          .sort(compareItems(compareByColumn))
          .map(fenceDevice => (
            <tr
              key={fenceDevice.id}
              data-test={`fence-device ${fenceDevice.id}`}
            >
              <td data-test="name">
                <Link
                  to={url.cluster.fenceDeices(cluster.urlName, fenceDevice.id)}
                />
              </td>
              <td>
                <StatusSign
                  status={fenceDevice.statusSeverity}
                  label={toLabel(fenceDevice.status)}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};
