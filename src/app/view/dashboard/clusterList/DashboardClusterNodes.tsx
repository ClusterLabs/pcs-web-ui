import {
  Link,
  StatusSign,
  Table,
  compareStatusSeverity,
  location,
  toLabel,
} from "app/view/share";
import {Cluster, ConnectedNode, Node} from "app/view/cluster/types";

import {compareStrings} from "./utils";

type StatusSeverity = ConnectedNode["statusSeverity"];
type QuorumSeverity = ConnectedNode["quorumSeverity"];
type COLUMNS = "NAME" | "STATUS" | "QUORUM";

const quorumSeverity = (node: Node): QuorumSeverity =>
  node.status === "DATA_NOT_PROVIDED" ? "WARNING" : node.quorumSeverity;

const statusSeverity = (node: Node): StatusSeverity =>
  node.status === "DATA_NOT_PROVIDED" ? "WARNING" : node.statusSeverity;

const quorum = (node: Node): string => {
  if (node.status === "DATA_NOT_PROVIDED") {
    return "Unknown";
  }

  return node.quorum ? "Yes" : "No";
};

const compareByColumn = (
  column: COLUMNS | "",
): ((_a: Node, _b: Node) => number) => {
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

const {SortableTh} = Table;

export const DashboardClusterNodes = ({cluster}: {cluster: Cluster}) => {
  const {sortState, compareItems} = SortableTh.useSorting<COLUMNS>("NAME");
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
