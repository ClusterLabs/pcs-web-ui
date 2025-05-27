import type React from "react";
import {Td, Th, Thead, Tr} from "@patternfly/react-table";

import {EmptyStateNoItem} from "app/view/share/emptyState";
import type {ResourceOnNodeStatus} from "app/view/cluster/types";

import {StatusSign} from "./StatusSign";
import {Table} from "./table";
import {useWindowWidth} from "./useWindowWidth";

const isRoleOk = (crmStatus: ResourceOnNodeStatus): boolean =>
  crmStatus.role === crmStatus.targetRole ||
  (!crmStatus.targetRole &&
    ["started", "promoted", "unpromoted"].includes(
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
  const width = useWindowWidth();
  // 1072 corresponds with css value 67rem. Under this threshold the group
  // element (e.g. resource tree, node list) is hidden.
  const tableGridClassName = width > 1072 ? "pf-m-grid-2xl" : "pf-m-grid-lg";

  if (crmStatusList.length === 0) {
    return <EmptyStateNoItem title={emptyMessage} canAdd={false} />;
  }
  return (
    <Table className={`pf-v5-c-table ${tableGridClassName}`}>
      <Thead noWrap>
        <Tr>
          <Th data-label={rowObject.header}>{rowObject.header}</Th>
          <Th data-label="Active">Active</Th>
          <Th data-label="Failed">Failed</Th>
          <Th data-label="Blocked">Blocked</Th>
          <Th data-label="Managed">Managed</Th>
          <Th data-label="Target-role" style={{textWrap: "wrap"}}>
            Target role
          </Th>
          <Th data-label="Role">Role</Th>
          <Th data-label="Failure-ignored" style={{textWrap: "wrap"}}>
            Failure ignored
          </Th>
        </Tr>
      </Thead>
      <Table.Body>
        {crmStatusList.map((crmStatus, i) => (
          <Tr key={i}>
            <th data-label={rowObject.header}>{rowObject.cell(crmStatus)}</th>
            <Td data-label="Active" style={{textWrap: "nowrap"}}>
              {crmStatus.active ? (
                <StatusSign status="OK" label="Yes" showOkIco />
              ) : (
                <StatusSign status="WARNING" label="No" />
              )}
            </Td>
            <Td data-label="Failed" style={{textWrap: "nowrap"}}>
              {crmStatus.failed ? (
                <StatusSign status="WARNING" label="Yes" />
              ) : (
                <StatusSign status="OK" label="No" showOkIco />
              )}
            </Td>
            <Td data-label="Blocked" style={{textWrap: "nowrap"}}>
              {crmStatus.blocked ? (
                <StatusSign status="WARNING" label="Yes" />
              ) : (
                <StatusSign status="OK" label="No" showOkIco />
              )}
            </Td>
            <Td data-label="Managed" style={{textWrap: "nowrap"}}>
              {crmStatus.managed ? (
                <StatusSign status="OK" label="Yes" showOkIco />
              ) : (
                <StatusSign status="WARNING" label="No" />
              )}
            </Td>
            <Td data-label="Target-role" style={{textWrap: "nowrap"}}>
              {!crmStatus.targetRole && crmStatus.targetRole}
              {crmStatus.targetRole && isTargetRoleOk(crmStatus.targetRole) && (
                <StatusSign
                  status="OK"
                  label={crmStatus.targetRole}
                  showOkIco
                />
              )}
              {crmStatus.targetRole &&
                !isTargetRoleOk(crmStatus.targetRole) && (
                  <StatusSign status="WARNING" label={crmStatus.targetRole} />
                )}
            </Td>
            <Td data-label="Role" style={{textWrap: "nowrap"}}>
              {isRoleOk(crmStatus) ? (
                <StatusSign status="OK" label={crmStatus.role} showOkIco />
              ) : (
                <StatusSign status="WARNING" label={crmStatus.role} />
              )}
            </Td>
            <Td data-label="Failure-ignored">
              {crmStatus.failureIgnored ? "Yes" : "No"}
            </Td>
          </Tr>
        ))}
      </Table.Body>
    </Table>
  );
};
