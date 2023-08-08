import {testMarks} from "app/view/dataTest";
import {
  Link,
  StatusSign,
  Table,
  compareStatusSeverity,
  location,
  toLabel,
} from "app/view/share";

import {Cluster, ConnectedNode, Node} from "./types";
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

const {node: nodeMark} = testMarks.dashboard.clusterList.cluster.loaded;

export const DashboardClusterNodes = ({cluster}: {cluster: Cluster}) => {
  const {sortState, compareItems} = SortableTh.useSorting<COLUMNS>("NAME");
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
        {cluster.nodeList.sort(compareItems(compareByColumn)).map(node => (
          <tr key={node.name} {...nodeMark.mark}>
            <td>
              <Link
                to={location.node({
                  clusterName: cluster.name,
                  nodeName: node.name,
                })}
                {...nodeMark.name.mark}
              />
            </td>
            <td {...nodeMark.status.mark}>
              <StatusSign
                status={statusSeverity(node)}
                label={toLabel(node.status)}
              />
            </td>
            <td {...nodeMark.quorum.mark}>
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
