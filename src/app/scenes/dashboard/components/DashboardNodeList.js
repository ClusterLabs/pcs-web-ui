import React from "react";

import { Table, StatusIco, StatusSign } from "app/components";
import { NODE_STATUS, NODE_QUORUM } from "app/services/cluster/types";
import { mapConstants, compareStrings } from "app/utils";

const statusLabel = mapConstants("Unknown", {
  [NODE_STATUS.ONLINE]: "Online",
  [NODE_STATUS.OFFLINE]: "Offline",
});
const statusToStatusIco = mapConstants(StatusIco.STATUS_MAP.UNKNOWN, {
  [NODE_STATUS.ONLINE]: StatusIco.STATUS_MAP.OK,
  [NODE_STATUS.OFFLINE]: StatusIco.STATUS_MAP.ERROR,
});

const quorumLabel = mapConstants("Unknown", {
  [NODE_QUORUM.YES]: "Yes",
  [NODE_QUORUM.NO]: "No",
});
const quorumToStatusIco = mapConstants(StatusIco.STATUS_MAP.UNKNOWN, {
  [NODE_QUORUM.YES]: StatusIco.STATUS_MAP.OK,
  [NODE_QUORUM.NO]: StatusIco.STATUS_MAP.WARNING,
});

export const nodesToSummaryStatus = StatusIco.itemsToSummaryStatus((node) => {
  if (node.status === NODE_STATUS.OFFLINE) {
    return StatusIco.STATUS_MAP.ERROR;
  }
  if (node.quorum === NODE_QUORUM.NO) {
    return StatusIco.STATUS_MAP.WARNING;
  }
  if (node.status === NODE_STATUS.ONLINE && node.quorum === NODE_QUORUM.YES) {
    return StatusIco.STATUS_MAP.OK;
  }
  return StatusIco.STATUS_MAP.UNKNOWN;
});

const COLUMNS = {
  NAME: "NAME",
  STATUS: "STATUS",
  QUORUM: "QUORUM",
};

const quorumSeverity = mapConstants(1, {
  [NODE_QUORUM.YES]: 0,
  [NODE_QUORUM.NO]: 2,
});

const statusSeverity = mapConstants(1, {
  [NODE_STATUS.ONLINE]: 0,
  [NODE_STATUS.OFFLINE]: 2,
});

const compareByColumn = (column) => {
  switch (column) {
    case COLUMNS.QUORUM: return (a, b) => (
      quorumSeverity(a.quorum) - quorumSeverity(b.quorum)
    );
    case COLUMNS.STATUS: return (a, b) => (
      statusSeverity(a.status) - statusSeverity(b.status)
    );
    default: return (a, b) => compareStrings(a.name, b.name);
  }
};

const DashboardNodeList = ({ nodeList }) => {
  const { sortState, compareItems } = Table.SortableTh.useSorting(COLUMNS.NAME);
  return (
    <Table isCompact isBorderless>
      <thead>
        <tr>
          <Table.SortableTh columnName={COLUMNS.NAME} sortState={sortState}>
            Node
          </Table.SortableTh>
          <Table.SortableTh
            columnName={COLUMNS.STATUS}
            sortState={sortState}
            startDesc
          >
            Status
          </Table.SortableTh>
          <Table.SortableTh
            columnName={COLUMNS.QUORUM}
            sortState={sortState}
            startDesc
          >
            Quorum
          </Table.SortableTh>
        </tr>
      </thead>
      <tbody>
        {nodeList.sort(compareItems(compareByColumn)).map(node => (
          <tr key={node.name}>
            <td>{node.name}</td>
            <td>
              <StatusSign
                status={statusToStatusIco(node.status)}
                label={statusLabel(node.status)}
              />
            </td>
            <td>
              <StatusSign
                status={quorumToStatusIco(node.quorum)}
                label={quorumLabel(node.quorum)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DashboardNodeList;
