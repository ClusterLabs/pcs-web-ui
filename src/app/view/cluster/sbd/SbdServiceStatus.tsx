import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  PlusCircleIcon,
  WrenchIcon,
} from "@patternfly/react-icons";

import {selectors} from "app/store";
import {EmptyStateNoItem, Table, useClusterSelector} from "app/view/share";

const SuccessIcon = ({label}: {label: string}) => {
  return (
    <>
      <CheckCircleIcon className="ha-u-status-success" />
      {` ${label}`}
    </>
  );
};

export const SbdServiceStatus = () => {
  const [cluster] = useClusterSelector(selectors.getCluster);

  if (cluster.nodeList.length === 0) {
    return <EmptyStateNoItem title="No SBD is configured." />;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th data-label="Node">Node</th>
          <th data-label="Installed">Installed</th>
          <th data-label="Enabled">Enabled</th>
          <th data-label="Running">Running</th>
        </tr>
      </thead>

      <Table.Body data-test="sbd-service-list">
        {cluster.nodeList.map(node =>
          node.status !== "DATA_NOT_PROVIDED" ? (
            <tr key={node.name} data-test={`row-${node.name}`}>
              <td data-label="Node" data-test={"node"}>
                {node.name}
              </td>

              <td data-label="Installed" data-test="installed">
                {node.services.sbd.installed ? (
                  <SuccessIcon label="Installed" />
                ) : (
                  <>
                    <PlusCircleIcon className="ha-u-status-unknown" />
                    {" Not installed"}
                  </>
                )}
              </td>

              <td data-label="Enabled" data-test="enabled">
                {node.services.sbd.enabled ? (
                  <SuccessIcon label="Enabled" />
                ) : (
                  <>
                    <WrenchIcon className="ha-u-status-unknown" />
                    {" Not enabled"}
                  </>
                )}
              </td>

              <td data-label="Running" data-test="running">
                {node.services.sbd.running ? (
                  <SuccessIcon label="Running" />
                ) : (
                  <>
                    <ExclamationCircleIcon className="ha-u-status-unknown" />
                    {" Not running"}
                  </>
                )}
              </td>
            </tr>
          ) : (
            <tr key={node.name} data-test={`sbd-service-list-${node.name}`}>
              <td data-label="Node" data-test="node">
                {node.name}
              </td>

              <td
                colSpan={3}
                data-label="Data for node not provided"
                data-test="without-data"
              >
                Data not provided
              </td>
            </tr>
          ),
        )}
      </Table.Body>
    </Table>
  );
};
