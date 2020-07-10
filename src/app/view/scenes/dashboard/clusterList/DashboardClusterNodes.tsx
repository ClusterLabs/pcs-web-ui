import React from "react";

import { types, url, utils } from "app/store";
import { Link, StatusSign, Table } from "app/view";
import { toLabel } from "app/view/utils";

import { compareStrings } from "./utils";

type COLUMNS = "NAME" | "STATUS" | "QUORUM";

const quorumSeverity = (
  node: types.cluster.Node,
): types.cluster.StatusSeverity =>
  (node.status === "DATA_NOT_PROVIDED" ? "WARNING" : node.quorumSeverity);

const statusSeverity = (
  node: types.cluster.Node,
): types.cluster.StatusSeverity =>
  (node.status === "DATA_NOT_PROVIDED" ? "WARNING" : node.statusSeverity);

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
        utils.compareStatusSeverity(quorumSeverity(a), quorumSeverity(b));
    case "STATUS":
      return (a, b) =>
        utils.compareStatusSeverity(statusSeverity(a), statusSeverity(b));
    default:
      return (a, b) => compareStrings(a.name, b.name);
  }
};

const { SortableTh } = Table;

export const DashboardClusterNodes = ({
  cluster,
}: {
  cluster: types.cluster.ClusterStatus;
}) => {
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
              <Link to={url.cluster.nodes(cluster.urlName, node.name)} />
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
