import React from "react";
import { CheckCircleIcon, TimesCircleIcon } from "@patternfly/react-icons";

import { EmptyStateNoItem, Table } from "app/view/share";
import { useSelectedClusterName } from "app/view/share";

import { useClusterPermissions } from "./useClusterPermissions";
import { PermissionMenu } from "./PermissionMenu";


export const PermissionsTable = () => {
    const clusterName = useSelectedClusterName();
    const { clusterPermissions } = useClusterPermissions();

    if (clusterPermissions?.users_permissions.length === 0) {
        return <EmptyStateNoItem title={""} canAdd={false} />;
      }
  
      return (
          <Table>
            <thead>
              <tr>
                <th data-label="Name">Name</th>
                <th data-label="Type">Type</th>
                <th data-label="Read">Read</th>
                <th data-label="Write">Write</th>
                <th data-label="Grant">Grant</th>
                <th data-label="Full">Full</th>
                <th data-label="Menu"> </th>
              </tr>
            </thead>

            <Table.Body>
              {clusterPermissions?.users_permissions.map(
                (permission: {name: string, type: string, allow: string[]},
                 i: number) => (
                  <tr key={i}>
                      <td data-label="Name">{permission.name}</td>
                      <td data-label="Type">{permission.type}</td>

                      <td data-label="Read">
                        {permission.allow.includes("read") ? (
                          <>
                            <CheckCircleIcon className="ha-u-status-success" />
                            {" Allowed"}
                          </>
                        ) : (
                          <>
                            <TimesCircleIcon className="ha-u-status-danger" />
                            {" Disallowed"}
                          </>
                        )}
                      </td>
                      <td data-label="Write">
                        {permission.allow.includes("write") || permission.allow.includes("read") ? (
                          <>
                            <CheckCircleIcon className="ha-u-status-success" />
                            {" Allowed"}
                          </>
                        ) : (
                          <>
                            <TimesCircleIcon className="ha-u-status-danger" />
                            {" Disallowed"}
                          </>
                        )}
                      </td>
                      <td data-label="Grant">
                        {permission.allow.includes("grant") ? (
                          <>
                            <CheckCircleIcon className="ha-u-status-success" />
                            {" Allowed"}
                          </>
                        ) : (
                          <>
                            <TimesCircleIcon className="ha-u-status-danger" />
                            {" Disallowed"}
                          </>
                        )}
                      </td>
                      <td data-label="Full">
                        {permission.allow.includes("read") && permission.allow.includes("grant") ? (
                          <>
                            <CheckCircleIcon className="ha-u-status-success" />
                            {" Allowed"}
                          </>
                        ) : (
                          <>
                            <TimesCircleIcon className="ha-u-status-danger" />
                            {" Disallowed"}
                          </>
                        )}
                      </td>

                      <td data-label="Menu"><PermissionMenu
                        clusterName={clusterName}
                        permissionName={permission.name}
                        permissions={
                          clusterPermissions.users_permissions}/></td>
                  </tr>
              ))}
            </Table.Body>
          </Table>
        );
  };
