import React from "react";

import { types } from "app/store";
import {
  Link,
  StatusSign,
  Table,
  compareStatusSeverity,
  location,
  toLabel,
} from "app/view/share";

import { compareStrings } from "./utils";

type COLUMNS = "NAME" | "STATUS" | "QUORUM";

const quorumSeverity = (
  node: types.cluster.Node,
): types.cluster.StatusSeverity =>
  node.status === "DATA_NOT_PROVIDED" ? "WARNING" : node.quorumSeverity;

const statusSeverity = (
  node: types.cluster.Node,
): types.cluster.StatusSeverity =>
  node.status === "DATA_NOT_PROVIDED" ? "WARNING" : node.statusSeverity;

const quorum = (node: types.cluster.Node): string => {
  if (node.status === "DATA_NOT_PROVIDED") {
    return "Unknown";
  }

  return node.quorum ? "Yes" : "No";
};

const compareByColumn = (
  column: COLUMNS | "",
): ((a: types.cluster.Node, b: types.cluster.Node) => number) => {
  switch (column) {
    case "QUORUM":
      return (a, b) =>
        compareStatusSeverity(quorumSeverity(a), quorumSeverity(b));
    case "STATUS":
      return (a, b) =>
        compareStatusSeverity(statusSeverity(a), statusSeverity(b));
    default:
      return (a, b) => compareStrings(a.name, b.name);
  }
};

const { SortableTh } = Table;

export const DashboardClusterNodes: React.FC<{
  cluster: types.cluster.ClusterStatus;
}> = ({ cluster }) => {
  const { sortState, compareItems } = SortableTh.useSorting<COLUMNS>("NAME");
  return (
    <Table isCompact isBorderless data-test="node-list">
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
        {cluster.nodeList.sort(compareItems(compareByColumn)).map(node => (
          <tr key={node.name} data-test={`node ${node.name}`}>
            <td data-test="name">
              <Link
                to={location.node({
                  clusterName: cluster.name,
                  nodeName: node.name,
                })}
              />
            </td>
            <td>
              <StatusSign
                status={statusSeverity(node)}
                label={toLabel(node.status)}
              />
            </td>
            <td>
              <StatusSign
                status={quorumSeverity(node)}
                label={toLabel(quorum(node))}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
