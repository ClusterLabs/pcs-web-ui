import { selectors } from "app/store";
import { EmptyStateNoItem, Table, useClusterSelector } from "app/view/share";

export const SbdConfiguration = () => {
  const [sbdConfig] = useClusterSelector(selectors.getClusterSbdConfig);

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
