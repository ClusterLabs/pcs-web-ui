import {EmptyStateNoItem, Table} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

import {selectSbdConfig} from "./select";

export const SbdConfiguration = () => {
  const sbdConfig = selectSbdConfig(useLoadedCluster().nodeList);

  if (Object.keys(sbdConfig).length === 0) {
    return <EmptyStateNoItem title="No SBD configuration." />;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th data-label="Option">Option</th>
          <th data-label="Value">Value</th>
        </tr>
      </thead>

      <Table.Body data-test="sbd-configuration-list">
        {(Object.keys(sbdConfig) as (keyof typeof sbdConfig)[])
          .filter(
            option =>
              option !== "SBD_OPTS"
              && option !== "SBD_PACEMAKER"
              && option !== "SBD_WATCHDOG_DEV"
              && option !== "SBD_DEVICE",
          )
          .map(option => (
            <tr key={option} data-test={`row-${option}`}>
              <td data-label="Option" data-test="option">
                {option}
              </td>
              <td data-label="Value" data-test="value">
                {sbdConfig[option]}
              </td>
            </tr>
          ))}
      </Table.Body>
    </Table>
  );
};
