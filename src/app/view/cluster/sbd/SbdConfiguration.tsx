import { Caption, Th } from "@patternfly/react-table";

import { selectors } from "app/store";
import { EmptyStateNoItem, Table, useClusterSelector } from "app/view/share";

export const SbdConfiguration = () => {
    const [cluster] = useClusterSelector(selectors.getCluster);

    if (cluster.sbdConfig === undefined) {
      return <EmptyStateNoItem title="No sbd configuration." />;
    }

    return (
      <>
      <Table>
      <Caption>SBD configuration </Caption>
        <thead>
          <tr>
            <Th width={35} data-label="Option">Option</Th>
            <Th data-label="Value">Value</Th>
          </tr>
        </thead>

          <Table.Body data-test="sbd-configuration-list">
            {Object.entries(cluster.sbdConfig).map((option, i) =>
              (option[0] !== "SBD_OPTS" && option[0] !== "SBD_PACEMAKER"
              && option[0] !== "SBD_WATCHDOG_DEV") && (
              <tr key={i}>
                <td data-label="Option" >
                  {option[0]}
                </td>
                <td data-label="Value">
                  {option[1]}
                </td>
              </tr>
            ))}
          </Table.Body>

      </Table>
      </>
    );
};
