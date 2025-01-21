import {Td, Tr} from "@patternfly/react-table";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  PlusCircleIcon,
  WrenchIcon,
} from "@patternfly/react-icons";

import type {NodeService} from "app/view/cluster/types";

export const NodeDaemonTr = ({
  serviceName,
  service,
}: {
  serviceName: string;
  service: NodeService;
}) => {
  return (
    <Tr>
      <Td data-label="Daemon">{serviceName}</Td>

      <Td data-label="Installed">
        {service.installed && (
          <>
            <CheckCircleIcon className="ha-u-status-success" />
            {" Installed"}
          </>
        )}
        {!service.installed && (
          <>
            <PlusCircleIcon className="ha-u-status-unknown" />
            {" Not installed"}
          </>
        )}
      </Td>

      <Td data-label="Enabled">
        {service.enabled && (
          <>
            <CheckCircleIcon className="ha-u-status-success" />
            {" Enabled"}
          </>
        )}
        {!service.enabled && (
          <>
            <WrenchIcon className="ha-u-status-unknown" />
            {" Not enabled"}
          </>
        )}
      </Td>

      <Td data-label="Running">
        {service.running && (
          <>
            <CheckCircleIcon className="ha-u-status-success" />
            {" Running"}
          </>
        )}
        {!service.running && (
          <>
            <ExclamationCircleIcon className="ha-u-status-unknown" />
            {" Not running"}
          </>
        )}
      </Td>
    </Tr>
  );
};
