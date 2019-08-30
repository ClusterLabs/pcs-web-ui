import React from "react";

import { Table, StatusIco, StatusSign } from "app/common/components";
import { NODE_STATUS, NODE_QUORUM, Node } from "app/services/cluster/types";
import { compareStrings } from "app/common/utils";

const statusLabel = (status: NODE_STATUS) => {
  switch (status) {
    case "ONLINE": return "Online";
    case "OFFLINE": return "Offline";
    default: return "Unknown";
  }
};

type DisplayableStatus = React.ComponentProps<typeof StatusIco>["status"];

const statusToStatusIco = (status: NODE_STATUS): DisplayableStatus => {
  switch (status) {
    case "ONLINE": return "OK";
    case "OFFLINE": return "ERROR";
    default: return "UNKNOWN";
  }
};

const quorumLabel = (quorum: NODE_QUORUM) => {
  switch (quorum) {
    case "YES": return "Yes";
    case "NO": return "No";
    default: return "Unknown";
  }
};

const quorumToStatusIco = (quorum: NODE_QUORUM): DisplayableStatus => {
  switch (quorum) {
    case "YES": return "OK";
    case "NO": return "WARNING";
    default: return "UNKNOWN";
  }
};


export const nodesToSummaryStatus = StatusIco.itemsToSummaryStatus(
  (node: Node) => {
    if (node.status === "OFFLINE") {
      return "ERROR";
    }
    if (node.quorum === "NO") {
      return "WARNING";
    }
    if (node.status === "ONLINE" && node.quorum === "YES") {
      return "OK";
    }
    return "UNKNOWN";
  },
);

type COLUMNS = "NAME"|"STATUS"|"QUORUM";

const quorumSeverity = (quorum: NODE_QUORUM) => {
  switch (quorum) {
    case "YES": return 0;
    case "NO": return 2;
    default: return 1;
  }
};

const statusSeverity = (status: NODE_STATUS) => {
  switch (status) {
    case "ONLINE": return 0;
    case "OFFLINE": return 2;
    default: return 1;
  }
};

const compareByColumn = (column: COLUMNS|"") => {
  switch (column) {
    case "QUORUM": return (a: Node, b: Node) => (
      quorumSeverity(a.quorum) - quorumSeverity(b.quorum)
    );
    case "STATUS": return (a: Node, b: Node) => (
      statusSeverity(a.status) - statusSeverity(b.status)
    );
    default: return (a: Node, b: Node) => compareStrings(a.name, b.name);
  }
};

const SortableTh = Table.SortableTh.bindColumns<COLUMNS>();

const DashboardNodeList = ({ nodeList }: { nodeList: Node[] }) => {
  const { sortState, compareItems } = SortableTh.useSorting("NAME");
  return (
    <Table isCompact isBorderless>
      <thead>
        <tr>
          <SortableTh columnName="NAME" sortState={sortState}>
            Node
          </SortableTh>
          <SortableTh columnName="STATUS" sortState={sortState} startDesc>
            Status
          </SortableTh>
          <SortableTh columnName="QUORUM" sortState={sortState} startDesc>
            Quorum
          </SortableTh>
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
