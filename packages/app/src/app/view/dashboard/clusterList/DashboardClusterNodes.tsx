import {Tbody, Td, Thead, Tr} from "@patternfly/react-table";

import {testMarks} from "app/view/dataTest";
import {
  Link,
  StatusSign,
  Table,
  compareStatusSeverity,
  location,
  toLabel,
} from "app/view/share";

import type {Cluster, ConnectedNode, Node} from "./types";
import {compareStrings} from "./utils";

type StatusSeverity = ConnectedNode["statusSeverity"];
type QuorumSeverity = ConnectedNode["quorumSeverity"];
const columnList = ["NAME", "STATUS", "QUORUM"] as const;

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
  column: (typeof columnList)[number],
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

const {node: nodeMark} = testMarks.dashboard.clusterList.cluster;

export const DashboardClusterNodes = ({cluster}: {cluster: Cluster}) => {
  const {sortState, compareItems} = SortableTh.useSorting(columnList, "NAME");
  return (
    <Table isCompact isBorderless>
      <Thead>
        <Tr>
          <SortableTh columnName="NAME" sortState={sortState}>
            Node
          </SortableTh>
          <SortableTh columnName="STATUS" sortState={sortState} startDesc>
            Status
          </SortableTh>
          <SortableTh columnName="QUORUM" sortState={sortState} startDesc>
            Quorum
          </SortableTh>
        </Tr>
      </Thead>
      <Tbody>
        {cluster.nodeList.sort(compareItems(compareByColumn)).map(node => (
          <Tr key={node.name} {...nodeMark.mark}>
            <Td>
              <Link
                to={location.node({
                  clusterName: cluster.name,
                  nodeName: node.name,
                })}
                {...nodeMark.name.mark}
              />
            </Td>
            <Td {...nodeMark.status.mark}>
              <StatusSign
                status={statusSeverity(node)}
                label={toLabel(node.status)}
              />
            </Td>
            <Td {...nodeMark.quorum.mark}>
              <StatusSign
                status={quorumSeverity(node)}
                label={toLabel(quorum(node))}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
