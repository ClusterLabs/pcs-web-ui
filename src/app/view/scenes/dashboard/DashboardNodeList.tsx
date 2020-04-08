import React from "react";

import { types } from "app/store";
import { Link, StatusSign, Table } from "app/view/common";
import { toLabel } from "app/view/utils";

import { compareStatusSeverity, compareStrings } from "./utils";

type COLUMNS = "NAME" | "STATUS" | "QUORUM";

const compareByColumn = (
  column: COLUMNS | "",
): ((a: types.dashboard.Node, b: types.dashboard.Node) => number
) => {
  switch (column) {
    case "QUORUM":
      return (a, b) =>
        compareStatusSeverity(a.quorumSeverity, b.quorumSeverity);
    case "STATUS":
      return (a, b) =>
        compareStatusSeverity(a.statusSeverity, b.statusSeverity);
    default:
      return (a, b) => compareStrings(a.name, b.name);
  }
};

const { SortableTh } = Table;

export const DashboardNodeList = ({
  cluster,
}: {
  cluster: types.dashboard.ClusterState;
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
              <Link to={`/cluster/${cluster.urlName}/nodes/${node.name}`}>
                {node.name}
              </Link>
            </td>
            <td>
              <StatusSign
                status={node.statusSeverity}
                label={toLabel(node.status)}
              />
            </td>
            <td>
              <StatusSign
                status={node.quorumSeverity}
                label={toLabel(node.quorum)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
