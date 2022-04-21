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

        <Table.Body data-test="sbd-watchdogs-list">
          {cluster.sbdWatchdogs.map((watchdog, i) => (
            <tr key={i}>
              <td data-label="Node" data-test={`sbd-watchdogs-list-${i}-node`}>
                {watchdog[0]}
              </td>
              <td
                data-label="Watchdog"
                data-test={`sbd-watchdogs-list-${i}-watchdog`}
              >
                {watchdog[1]}
              </td>
            </tr>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
