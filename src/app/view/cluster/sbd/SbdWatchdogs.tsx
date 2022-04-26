import { Caption } from "@patternfly/react-table";

import { selectors } from "app/store";
import { EmptyStateNoItem, Table, useClusterSelector } from "app/view/share";

export const SbdWatchdogs = () => {
  const [{ nodeList }] = useClusterSelector(selectors.getCluster);

  if (nodeList.length === 0) {
    return <EmptyStateNoItem title="No sbd watchdogs." />;
  }

  return (
    <>
      <Table>
        <Caption>SBD watchdogs </Caption>
        <thead>
          <tr>
            <th data-label="Node">Node</th>
            <th data-label="Watchdog">Watchdog</th>
          </tr>
        </thead>

        <Table.Body data-test="sbd-watchdog-list">
          {Object.values(nodeList).map(node => (
            <tr key={node.name} data-test={`row-${node.name}`}>
              <td data-label="Node" data-test="node">
                {node.name}
              </td>
              <td data-label="Watchdog" data-test="watchdog">
                {node.status === "DATA_NOT_PROVIDED"
                  ? "Node data not provided"
                  : node.sbd?.watchdog ?? "Watchdog not configured"}
              </td>
            </tr>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
