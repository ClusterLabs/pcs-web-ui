import { Caption } from "@patternfly/react-table";

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
            <th data-label="Option">Option</th>
            <th data-label="Value">Value</th>
          </tr>
        </thead>

        <Table.Body data-test="sbd-configuration-list">
          {Object.entries(cluster.sbdConfig).map(
            (option, i) =>
              option[0] !== "SBD_OPTS"
              && option[0] !== "SBD_PACEMAKER"
              && option[0] !== "SBD_WATCHDOG_DEV"
              && option[0] !== "SBD_DEVICE" && (
                <tr key={i}>
                  <td
                    data-label="Option"
                    data-test={`sbd-watchdogs-list-${i}-node`}
                  >
                    {option[0]}
                  </td>
                  <td
                    data-label="Value"
                    data-test={`sbd-watchdogs-list-${i}-node`}
                  >
                    {option[1]}
                  </td>
                </tr>
              ),
          )}
          {cluster.sbdConfig.SBD_DEVICE
            && cluster.sbdConfig.SBD_DEVICE.split(";").map((device, i) => (
              <tr key={`device${i}`}>
                <td
                  data-label="Option"
                  data-test={`sbd-configuration-list-${i}-option`}
                >
                  {`SBD_DEVICE ${i + 1}`}
                </td>
                <td
                  data-label="Value"
                  data-test={`sbd-configuration-list-${i}-value`}
                >
                  {device}
                </td>
              </tr>
            ))}
        </Table.Body>
      </Table>
    </>
  );
};
