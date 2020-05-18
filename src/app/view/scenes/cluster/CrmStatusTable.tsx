import React from "react";

import { types } from "app/store";
import { StatusSign, Table } from "app/view/common";

export const CrmStatusTable = ({
  crmStatusList,
  rowObject,
}: {
  crmStatusList: types.cluster.ResourceOnNodeStatus[];
  rowObject: {
    header: string;
    cell: (
      crmStatus: types.cluster.ResourceOnNodeStatus,
    ) => JSX.Element | string | undefined | null;
  };
}) => {
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
            <td data-label="Target-role">{crmStatus.targetRole}</td>
            <td data-label="Role">
              {crmStatus.role === crmStatus.targetRole ? (
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