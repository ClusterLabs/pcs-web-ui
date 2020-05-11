import React from "react";
import { Text, TextContent } from "@patternfly/react-core";

import { types } from "app/store";
import { StatusSign, Table } from "app/view/common";

const isBlocked = (primitive: types.cluster.Primitive) =>
  primitive.status.infoList.some(
    info => info.label.toLowerCase() === "blocked",
  );

export const PrimitiveStatus = ({
  primitive,
}: {
  primitive: types.cluster.Primitive;
}) => {
  return (
    <>
      <TextContent>
        <Text component="h1"> Resource status on nodes </Text>
      </TextContent>
      <Table>
        <thead>
          <tr>
            <th data-label="Node">Node</th>
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
          {primitive.crmStatusList.map((crmStatus, i) => (
            /* eslint-disable react/no-array-index-key */
            <tr key={i}>
              <th data-label="Node">{crmStatus.node?.name ?? " - "}</th>
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
                {isBlocked(primitive) ? (
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
              <td data-label="Target-role">{crmStatus.target_role}</td>
              <td data-label="Role">
                {crmStatus.role === crmStatus.target_role ? (
                  <StatusSign status="OK" label={crmStatus.role} showOkIco />
                ) : (
                  <StatusSign status="WARNING" label={crmStatus.role} />
                )}
              </td>
              <td data-label="Failure-ignored">
                {crmStatus.failure_ignored ? "yes" : "no"}
              </td>
              <td data-label="Nodes-running-on">
                {crmStatus.nodes_running_on}
              </td>
            </tr>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
