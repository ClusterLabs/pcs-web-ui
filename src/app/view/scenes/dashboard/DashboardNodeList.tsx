import React from "react";

import { types } from "app/store";
import { Table, StatusSign } from "app/view/common";
import { toLabel } from "app/view/utils";

import { compareStatusSeverity, compareStrings } from "./utils";

type Node = types.dashboard.Node;

type COLUMNS = "NAME"|"STATUS"|"QUORUM";

const compareByColumn = (column: COLUMNS|""): (a: Node, b: Node) => number => {
  switch (column) {
    case "QUORUM": return (a, b) => compareStatusSeverity(
      a.quorumSeverity,
      b.quorumSeverity,
    );
    case "STATUS": return (a, b) => compareStatusSeverity(
      a.statusSeverity,
      b.statusSeverity,
    );
    default: return (a, b) => compareStrings(a.name, b.name);
  }
};

const { SortableTh } = Table;

export const DashboardNodeList = ({ nodeList }: { nodeList: Node[] }) => {
  const { sortState, compareItems } = SortableTh.useSorting<COLUMNS>("NAME");
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
