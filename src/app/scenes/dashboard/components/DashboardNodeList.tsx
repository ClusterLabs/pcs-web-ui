import React from "react";

import { Table, StatusSign } from "app/common/components";
import { compareStrings, statusSeverity, toLabel } from "app/common/utils";
import { Node } from "../types";

type COLUMNS = "NAME"|"STATUS"|"QUORUM";

const compareByColumn = (column: COLUMNS|""): (a: Node, b: Node) => number => {
  switch (column) {
    case "QUORUM": return (a, b) => statusSeverity.compare(
      a.quorumSeverity,
      b.quorumSeverity,
    );
    case "STATUS": return (a, b) => statusSeverity.compare(
      a.statusSeverity,
      b.statusSeverity,
    );
    default: return (a, b) => compareStrings(a.name, b.name);
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

export default DashboardNodeList;
