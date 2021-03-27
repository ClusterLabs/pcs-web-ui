import React from "react";

import { EmptyStateNoItem } from "app/view/share/emptyState";
import { ResourceOnNodeStatus } from "app/view/cluster/types";

import { StatusSign } from "./StatusSign";
import { Table } from "./table";

const isRoleOk = (crmStatus: ResourceOnNodeStatus): boolean =>
  crmStatus.role === crmStatus.targetRole
  || (!crmStatus.targetRole
    && ["started", "master", "slave"].includes(crmStatus.role.toLowerCase()));

const isTargetRoleOk = (targetRole: string): boolean =>
  ["started", "master"].includes(targetRole.toLowerCase());

export const CrmStatusTable = ({
  crmStatusList,
  emptyMessage,
  rowObject,
}: {
  crmStatusList: ResourceOnNodeStatus[];
  emptyMessage: string;
  rowObject: {
    header: string;
    cell: (crmStatus: ResourceOnNodeStatus) => React.ReactNode;
  };
}) => {
  if (crmStatusList.length === 0) {
    return <EmptyStateNoItem title={emptyMessage} canAdd={false} />;
  }
  return (
    <Table>
      <thead>
        <tr>
          <th data-label={rowObject.header}>{rowObject.header}</th>
          <th data-label="Active">Active</th>
          <th data-label="Failed">Failed</th>
          <th data-label="Blocked">Blocked</th>
          <th data-label="Managed">Managed</th>
          <th data-label="Target-role">Target role</th>
          <th data-label="Role">Role</th>
          <th data-label="Failure-ignored">Failure ignored</th>
          <th data-label="Nodes-running-on">Nodes running on</th>
        </tr>
      </thead>
      <Table.Body>
        {crmStatusList.map((crmStatus, i) => (
          /* eslint-disable react/no-array-index-key */
          <tr key={i}>
            <th data-label={rowObject.header}>{rowObject.cell(crmStatus)}</th>
            <td data-label="Active">
              {crmStatus.active ? (
                <StatusSign status="OK" label="Yes" showOkIco />
              ) : (
                <StatusSign status="WARNING" label="No" />
              )}
            </td>
            <td data-label="Failed">
              {crmStatus.failed ? (
                <StatusSign status="WARNING" label="Yes" />
              ) : (
                <StatusSign status="OK" label="No" showOkIco />
              )}
            </td>
            <td data-label="Blocked">
              {crmStatus.blocked ? (
                <StatusSign status="WARNING" label="Yes" />
              ) : (
                <StatusSign status="OK" label="No" showOkIco />
              )}
            </td>
            <td data-label="Managed">
              {crmStatus.managed ? (
                <StatusSign status="OK" label="Managed" showOkIco />
              ) : (
                <StatusSign status="WARNING" label="Unmanaged" />
              )}
            </td>
            <td data-label="Target-role">
              {!crmStatus.targetRole && crmStatus.targetRole}
              {crmStatus.targetRole && isTargetRoleOk(crmStatus.targetRole) && (
                <StatusSign
                  status="OK"
                  label={crmStatus.targetRole}
                  showOkIco
                />
              )}
              {crmStatus.targetRole
                && !isTargetRoleOk(crmStatus.targetRole) && (
                  <StatusSign status="WARNING" label={crmStatus.targetRole} />
                )}
            </td>
            <td data-label="Role">
              {isRoleOk(crmStatus) ? (
                <StatusSign status="OK" label={crmStatus.role} showOkIco />
              ) : (
                <StatusSign status="WARNING" label={crmStatus.role} />
              )}
            </td>
            <td data-label="Failure-ignored">
              {crmStatus.failureIgnored ? "yes" : "no"}
            </td>
            <td data-label="Nodes-running-on">{crmStatus.nodesRunningOn}</td>
          </tr>
        ))}
      </Table.Body>
    </Table>
  );
};
