import React from "react";
import { CheckCircleIcon, TimesCircleIcon } from "@patternfly/react-icons";

import { EmptyStateNoItem, Table } from "app/view/share";

import { useClusterPermissions } from "./useClusterPermissions";
import { PermissionMenu } from "./PermissionMenu";


export const PermissionsTable = () => {
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
              {clusterPermissions?.users_permissions.map((permission, i) => (
                  <tr key={i}>
                      <td data-label="Name">{permission.name}</td>
                      <td data-label="Type">{permission.type}</td>

                      <td data-label="Read">
                        {permission.allow.includes("read") ? (
                          <CheckCircleIcon className="ha-u-status-success" />
                        ) : (
                          <TimesCircleIcon className="ha-u-status-danger" />
                        )}
                      </td>
                      <td data-label="Write">
                        {permission.allow.includes("write") || permission.allow.includes("read") ? (
                          <CheckCircleIcon className="ha-u-status-success" />
                        ) : (
                          <TimesCircleIcon className="ha-u-status-danger" />
                        )}
                      </td>
                      <td data-label="Grant">
                        {permission.allow.includes("grant") ? (
                          <CheckCircleIcon className="ha-u-status-success" />
                        ) : (
                          <TimesCircleIcon className="ha-u-status-danger" />
                        )}
                      </td>
                      <td data-label="Full">
                        {permission.allow.includes("read") && permission.allow.includes("grant") ? (
                          <CheckCircleIcon className="ha-u-status-success" />
                        ) : (
                          <TimesCircleIcon className="ha-u-status-danger" />
                        )}
                      </td>

                      <td data-label="Menu"><PermissionMenu permissionName={permission.name}/></td>
                  </tr>
              ))}
            </Table.Body>
          </Table>
        );
  };