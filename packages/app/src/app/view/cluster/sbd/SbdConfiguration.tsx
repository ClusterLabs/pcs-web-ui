import {testMarks} from "app/view/dataTest";
import {EmptyStateNoItem, Table} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

import {selectSbdConfig} from "./select";

const {config} = testMarks.cluster.sbd;

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

      <Table.Body>
        {(Object.keys(sbdConfig) as (keyof typeof sbdConfig)[])
          .filter(
            option =>
              option !== "SBD_OPTS"
              && option !== "SBD_PACEMAKER"
              && option !== "SBD_WATCHDOG_DEV"
              && option !== "SBD_DEVICE",
          )
          .map(option => (
            <tr key={option} {...config.mark}>
              <td data-label="Option" {...config.name.mark}>
                {option}
              </td>
              <td data-label="Value" {...config.value.mark}>
                {sbdConfig[option]}
              </td>
            </tr>
          ))}
      </Table.Body>
    </Table>
  );
};
