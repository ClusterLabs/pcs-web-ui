import React from "react";

import { Table, StatusIco, StatusSign } from "app/components";
import { NODE_STATUS, NODE_QUORUM, Node } from "app/services/cluster/types";
import { compareStrings } from "app/utils";

const statusLabel = (status: NODE_STATUS) => {
  switch (status) {
    case NODE_STATUS.ONLINE: return "Online";
    case NODE_STATUS.OFFLINE: return "Offline";
    default: return "Unknown";
  }
};

const statusToStatusIco = (status: NODE_STATUS) => {
  switch (status) {
    case NODE_STATUS.ONLINE: return StatusIco.STATUS_MAP.OK;
    case NODE_STATUS.OFFLINE: return StatusIco.STATUS_MAP.ERROR;
    default: return StatusIco.STATUS_MAP.UNKNOWN;
  }
};

const quorumLabel = (quorum: NODE_QUORUM) => {
  switch (quorum) {
    case NODE_QUORUM.YES: return "Yes";
    case NODE_QUORUM.NO: return "No";
    default: return "Unknown";
  }
};

const quorumToStatusIco = (quorum: NODE_QUORUM) => {
  switch (quorum) {
    case NODE_QUORUM.YES: return StatusIco.STATUS_MAP.OK;
    case NODE_QUORUM.NO: return StatusIco.STATUS_MAP.WARNING;
    default: return StatusIco.STATUS_MAP.UNKNOWN;
  }
};


export const nodesToSummaryStatus = StatusIco.itemsToSummaryStatus(
  (node: Node) => {
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
  },
);

enum COLUMNS {
  NAME = "NAME",
  STATUS = "STATUS",
  QUORUM = "QUORUM",
}

const quorumSeverity = (quorum: NODE_QUORUM) => {
  switch (quorum) {
    case NODE_QUORUM.YES: return 0;
    case NODE_QUORUM.NO: return 2;
    default: return 1;
  }
};

const statusSeverity = (status: NODE_STATUS) => {
  switch (status) {
    case NODE_STATUS.ONLINE: return 0;
    case NODE_STATUS.OFFLINE: return 2;
    default: return 1;
  }
};

const compareByColumn = (column: COLUMNS) => {
  switch (column) {
    case COLUMNS.QUORUM: return (a: Node, b: Node) => (
      quorumSeverity(a.quorum) - quorumSeverity(b.quorum)
    );
    case COLUMNS.STATUS: return (a: Node, b: Node) => (
      statusSeverity(a.status) - statusSeverity(b.status)
    );
    default: return (a: Node, b: Node) => compareStrings(a.name, b.name);
  }
};

const DashboardNodeList = ({ nodeList }: { nodeList: Node[] }) => {
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
