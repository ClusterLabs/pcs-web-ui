import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  PlusCircleIcon,
  WrenchIcon,
} from "@patternfly/react-icons";

import {NodeService} from "app/view/cluster/types";

export const NodeDaemonTr = ({
  serviceName,
  service,
}: {
  serviceName: string;
  service: NodeService;
}) => {
  return (
    <tr>
      <td data-label="Daemon">{serviceName}</td>

      <td data-label="Installed">
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
      </td>

      <td data-label="Enabled">
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
      </td>

      <td data-label="Running">
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
      </td>
    </tr>
  );
};
