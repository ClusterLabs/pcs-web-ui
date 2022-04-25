import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  PlusCircleIcon,
  WrenchIcon,
} from "@patternfly/react-icons";
import { Caption } from "@patternfly/react-table";

import { selectors } from "app/store";
import { EmptyStateNoItem, Table, useClusterSelector } from "app/view/share";

export const SbdServiceStatus = () => {
  const [cluster] = useClusterSelector(selectors.getCluster);

  if (cluster.nodeList.length === 0) {
    return <EmptyStateNoItem title="No sbd is configured." />;
  }

  return (
    <>
      <Table>
        <Caption>SBD service status </Caption>
        <thead>
          <tr>
            <th data-label="Node">Node</th>
            <th data-label="Installed">Installed</th>
            <th data-label="Enabled">Enabled</th>
            <th data-label="Running">Running</th>
          </tr>
        </thead>

        <Table.Body data-test="sbd-service-list">
          {cluster.nodeList.map((node, i) =>
            node.status !== "DATA_NOT_PROVIDED" ? (
              <tr key={i}>
                <td data-label="Node" data-test={`sbd-service-list-${i}-node`}>
                  {node.name}
                </td>

                <td
                  data-label="Installed"
                  data-test={`sbd-service-list-${i}-installed`}
                >
                  {node.services.sbd.installed && (
                    <>
                      <CheckCircleIcon className="ha-u-status-success" />
                      {" Installed"}
                    </>
                  )}
                  {!node.services.sbd.installed && (
                    <>
                      <PlusCircleIcon className="ha-u-status-unknown" />
                      {" Not installed"}
                    </>
                  )}
                </td>

                <td
                  data-label="Enabled"
                  data-test={`sbd-service-list-${i}-enabled`}
                >
                  {node.services.sbd.enabled && (
                    <>
                      <CheckCircleIcon className="ha-u-status-success" />
                      {" Enabled"}
                    </>
                  )}
                  {!node.services.sbd.enabled && (
                    <>
                      <WrenchIcon className="ha-u-status-unknown" />
                      {" Not enabled"}
                    </>
                  )}
                </td>

                <td
                  data-label="Running"
                  data-test={`sbd-service-list-${i}-running`}
                >
                  {node.services.sbd.running && (
                    <>
                      <CheckCircleIcon className="ha-u-status-success" />
                      {" Running"}
                    </>
                  )}
                  {!node.services.sbd.running && (
                    <>
                      <ExclamationCircleIcon className="ha-u-status-unknown" />
                      {" Not running"}
                    </>
                  )}
                </td>
              </tr>
            ) : (
              <tr key={i}>
                <td data-label="Node" data-test={`sbd-service-list-${i}-node`}>
                  {node.name}
                </td>

                <td
                  colSpan={3}
                  data-label="Without information"
                  data-test={`sbd-service-list-${i}-installed`}
                >
                  Data not provided
                </td>
              </tr>
            ),
          )}
        </Table.Body>
      </Table>
    </>
  );
};
