import {Th, Thead, Tr} from "@patternfly/react-table";

import {Table} from "app/view/share";
import {NodeServiceMap} from "app/view/cluster/types";

import {NodeDaemonTr} from "./NodeDaemonTr";

export const NodeDaemonTable = ({services}: {services: NodeServiceMap}) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th data-label="Daemon">Daemon</Th>
          <Th data-label="Installed">Installed</Th>
          <Th data-label="Enabled">Enabled</Th>
          <Th data-label="Running">Running</Th>
        </Tr>
      </Thead>
      <Table.Body>
        <NodeDaemonTr serviceName="corosync" service={services.corosync} />
        {services.pacemaker_remote.installed && (
          <NodeDaemonTr
            serviceName="pacemaker-remote"
            service={services.pacemaker_remote}
          />
        )}
        {!services.pacemaker_remote.installed && (
          <NodeDaemonTr serviceName="pacemaker" service={services.pacemaker} />
        )}
        <NodeDaemonTr serviceName="pcsd" service={services.pcsd} />
        <NodeDaemonTr serviceName="sbd" service={services.sbd} />
      </Table.Body>
    </Table>
  );
};
