import React from "react";

import { Table } from "app/view/share";
import { NodeServiceMap } from "app/view/cluster/types";

import { NodeDaemonTr } from "./NodeDaemonTr";

export const NodeDaemonTable = ({ services }: { services: NodeServiceMap }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th data-label="Daemon">Daemon</th>
          <th data-label="Installed">Installed</th>
          <th data-label="Enabled">Enabled</th>
          <th data-label="Running">Running</th>
        </tr>
      </thead>
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
