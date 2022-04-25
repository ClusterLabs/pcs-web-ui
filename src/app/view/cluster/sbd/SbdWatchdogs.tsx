import { Caption } from "@patternfly/react-table";

import { selectors } from "app/store";
import { EmptyStateNoItem, Table, useClusterSelector } from "app/view/share";

export const SbdWatchdogs = () => {
  const [cluster] = useClusterSelector(selectors.getCluster);

  if (cluster.sbdWatchdogs === undefined) {
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
          {Object.entries(cluster.sbdWatchdogs).map(([nodeName, watchdog]) => (
            <tr key={nodeName} data-test={`row-${nodeName}`}>
              <td data-label="Node" data-test="node">
                {nodeName}
              </td>
              <td data-label="Watchdog" data-test="watchdog">
                {watchdog}
              </td>
            </tr>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
