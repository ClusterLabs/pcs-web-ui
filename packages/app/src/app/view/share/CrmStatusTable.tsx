import React from "react";
import {Td, Th, Thead, Tr} from "@patternfly/react-table";

import {EmptyStateNoItem} from "app/view/share/emptyState";
import {ResourceOnNodeStatus} from "app/view/cluster/types";

import {StatusSign} from "./StatusSign";
import {Table} from "./table";

const isRoleOk = (crmStatus: ResourceOnNodeStatus): boolean =>
  crmStatus.role === crmStatus.targetRole
  || (!crmStatus.targetRole
    && ["started", "promoted", "unpromoted"].includes(
      crmStatus.role.toLowerCase(),
    ));

const isTargetRoleOk = (targetRole: string): boolean =>
  ["started", "unpromoted"].includes(targetRole.toLowerCase());

export const CrmStatusTable = ({
  crmStatusList,
  emptyMessage,
  rowObject,
}: {
  crmStatusList: ResourceOnNodeStatus[];
  emptyMessage: string;
  rowObject: {
    header: string;
    cell: (_crmStatus: ResourceOnNodeStatus) => React.ReactNode;
  };
}) => {
  if (crmStatusList.length === 0) {
    return <EmptyStateNoItem title={emptyMessage} canAdd={false} />;
  }
  return (
    <Table>
      <Thead>
        <Tr>
          <Th data-label={rowObject.header}>{rowObject.header}</Th>
          <Th data-label="Active">Active</Th>
          <Th data-label="Failed">Failed</Th>
          <Th data-label="Blocked">Blocked</Th>
          <Th data-label="Managed">Managed</Th>
          <Th data-label="Target-role">Target role</Th>
          <Th data-label="Role">Role</Th>
          <Th data-label="Failure-ignored">Failure ignored</Th>
          <Th data-label="Nodes-running-on">Nodes running on</Th>
        </Tr>
      </Thead>
      <Table.Body>
        {crmStatusList.map((crmStatus, i) => (
          /* eslint-disable react/no-array-index-key */
          <Tr key={i}>
            <th data-label={rowObject.header}>{rowObject.cell(crmStatus)}</th>
            <Td data-label="Active">
              {crmStatus.active ? (
                <StatusSign status="OK" label="Yes" showOkIco />
              ) : (
                <StatusSign status="WARNING" label="No" />
              )}
            </Td>
            <Td data-label="Failed">
              {crmStatus.failed ? (
                <StatusSign status="WARNING" label="Yes" />
              ) : (
                <StatusSign status="OK" label="No" showOkIco />
              )}
            </Td>
            <Td data-label="Blocked">
              {crmStatus.blocked ? (
                <StatusSign status="WARNING" label="Yes" />
              ) : (
                <StatusSign status="OK" label="No" showOkIco />
              )}
            </Td>
            <Td data-label="Managed">
              {crmStatus.managed ? (
                <StatusSign status="OK" label="Managed" showOkIco />
              ) : (
                <StatusSign status="WARNING" label="Unmanaged" />
              )}
            </Td>
            <Td data-label="Target-role">
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
            </Td>
            <Td data-label="Role">
              {isRoleOk(crmStatus) ? (
                <StatusSign status="OK" label={crmStatus.role} showOkIco />
              ) : (
                <StatusSign status="WARNING" label={crmStatus.role} />
              )}
            </Td>
            <Td data-label="Failure-ignored">
              {crmStatus.failureIgnored ? "yes" : "no"}
            </Td>
            <Td data-label="Nodes-running-on">{crmStatus.nodesRunningOn}</Td>
          </Tr>
        ))}
      </Table.Body>
    </Table>
  );
};
