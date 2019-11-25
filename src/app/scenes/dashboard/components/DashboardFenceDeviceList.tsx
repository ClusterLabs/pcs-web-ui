import React from "react";

import { Table, StatusSign, NoItemCase } from "app/common/components";
import { compareStrings, toLabel, statusSeverity } from "app/common/utils";

import { FenceDevice } from "../types";

type COLUMNS = "NAME"|"STATUS";

const compareByColumn = (
  column: COLUMNS|"",
): (
  (a: FenceDevice, b: FenceDevice) => number
) => {
  switch (column) {
    case "STATUS": return (a, b) => statusSeverity.compare(
      a.statusSeverity,
      b.statusSeverity,
    );
    default: return (a, b) => compareStrings(a.id, b.id);
  }
};

const SortableTh = Table.SortableTh.bindColumns<COLUMNS>();

const DashboardFenceDeviceList = ({ fenceDeviceList }: {
  fenceDeviceList: FenceDevice[],
}) => {
  const { sortState, compareItems } = SortableTh.useSorting("NAME");
  if (fenceDeviceList.length === 0) {
    return <NoItemCase message="No fence device is configured." />;
  }
  return (
    <Table isCompact isBorderless>
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
        {fenceDeviceList.sort(compareItems(compareByColumn)).map(
          fenceDevice => (
            <tr key={fenceDevice.id}>
              <td>{fenceDevice.id}</td>
              <td>
                <StatusSign
                  status={fenceDevice.statusSeverity}
                  label={toLabel(fenceDevice.status)}
                />
              </td>
            </tr>
          ),
        )}
      </tbody>
    </Table>
  );
};

export default DashboardFenceDeviceList;
