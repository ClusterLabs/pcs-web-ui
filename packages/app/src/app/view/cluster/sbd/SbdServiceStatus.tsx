import {Td, Thead, Tr} from "@patternfly/react-table";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  PlusCircleIcon,
  WrenchIcon,
} from "@patternfly/react-icons";

import {testMarks} from "app/view/dataTest";
import {EmptyStateNoItem, Table} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

const {service} = testMarks.cluster.sbd;

export const SbdServiceStatus = () => {
  const {nodeList} = useLoadedCluster();

  if (nodeList.length === 0) {
    return <EmptyStateNoItem title="No SBD is configured." />;
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <th data-label="Node">Node</th>
          <th data-label="Installed">Installed</th>
          <th data-label="Enabled">Enabled</th>
          <th data-label="Running">Running</th>
        </Tr>
      </Thead>

      <Table.Body>
        {nodeList.map(node =>
          node.status !== "DATA_NOT_PROVIDED" ? (
            <Tr key={node.name} {...service.mark}>
              <Td data-label="Node" {...service.node.mark}>
                {node.name}
              </Td>

              <Td data-label="Installed">
                {node.services.sbd.installed ? (
                  <>
                    <CheckCircleIcon className="ha-u-status-success" />
                    <span {...service.installed.mark}>{" Installed"}</span>
                  </>
                ) : (
                  <>
                    <PlusCircleIcon className="ha-u-status-unknown" />
                    <span {...service.installed.mark}>{" Not installed"}</span>
                  </>
                )}
              </Td>

              <Td data-label="Enabled">
                {node.services.sbd.enabled ? (
                  <>
                    <CheckCircleIcon className="ha-u-status-success" />
                    <span {...service.enabled.mark}>{" Enabled"}</span>
                  </>
                ) : (
                  <>
                    <WrenchIcon className="ha-u-status-unknown" />
                    <span {...service.enabled.mark}>{" Not enabled"}</span>
                  </>
                )}
              </Td>

              <Td data-label="Running">
                {node.services.sbd.running ? (
                  <>
                    <CheckCircleIcon className="ha-u-status-success" />
                    <span {...service.running.mark}>{" Running"}</span>
                  </>
                ) : (
                  <>
                    <ExclamationCircleIcon className="ha-u-status-unknown" />
                    <span {...service.running.mark}>{" Not running"}</span>
                  </>
                )}
              </Td>
            </Tr>
          ) : (
            <Tr key={node.name} {...service.mark}>
              <Td data-label="Node" {...service.node.mark}>
                {node.name}
              </Td>

              <Td
                colSpan={3}
                data-label="Data for node not provided"
                {...service.noData.mark}
              >
                Data not provided
              </Td>
            </Tr>
          ),
        )}
      </Table.Body>
    </Table>
  );
};
