import {Td, Th, Thead, Tr} from "@patternfly/react-table";

import {Table, StatusSign, Link, location} from "app/view/share";
import type {ResourceOnNodeStatus} from "app/view/cluster/types";
import {useLoadedCluster} from "app/view/cluster/share";

const isRoleOk = (crmStatus: ResourceOnNodeStatus): boolean =>
  crmStatus.role === crmStatus.targetRole ||
  (!crmStatus.targetRole &&
    ["started", "promoted", "unpromoted"].includes(
      crmStatus.role.toLowerCase(),
    ));

export const NodeDetailCrmStatusTable = ({
  crmStatusList,
}: {
  crmStatusList: ResourceOnNodeStatus[];
}) => {
  const {clusterName} = useLoadedCluster();
  return (
    <Table>
      <Thead noWrap>
        <Tr>
          <Th data-label="Resource">Resource</Th>
          <Th data-label="Active">Active</Th>
          <Th data-label="Role">Role</Th>
          <Th data-label="Nodes-running-on">Nodes running on</Th>
        </Tr>
      </Thead>
      <Table.Body>
        {crmStatusList.map((crmStatus, i) => (
          <Tr key={i}>
            <Th data-label="Resource">
              <Link
                to={location.resource({
                  clusterName,
                  resourceId: crmStatus.resource.id,
                })}
              />
            </Th>
            <Td data-label="Active">
              {crmStatus.active ? (
                <StatusSign status="OK" label="Yes" showOkIco />
              ) : (
                <StatusSign status="WARNING" label="No" />
              )}
            </Td>
            <Td data-label="Role">
              {isRoleOk(crmStatus) ? (
                <StatusSign status="OK" label={crmStatus.role} showOkIco />
              ) : (
                <StatusSign status="WARNING" label={crmStatus.role} />
              )}
            </Td>
            <Td data-label="Nodes-running-on">{crmStatus.nodesRunningOn}</Td>
          </Tr>
        ))}
      </Table.Body>
    </Table>
  );
};
