import { useSelector } from "react-redux";
import { CheckCircleIcon, TimesCircleIcon } from "@patternfly/react-icons";

import { selectors } from "app/store";
import { EmptyStateNoItem, Table } from "app/view/share";
import { useSelectedClusterName } from "app/view/share";

import { PermissionMenu } from "./PermissionMenu";

const { getClusterPermissions } = selectors;

export const PermissionsTable = () => {
  const clusterName = useSelectedClusterName();
  const clusterPermissions = useSelector(getClusterPermissions(clusterName));

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
        {clusterPermissions?.users_permissions.map((permission, i: number) => (
          <tr key={i}>
            <td data-label="Name">{permission.name}</td>
            <td data-label="Type">{permission.type}</td>

            <td data-label="Read">
              {permission.allow.includes("read")
              || permission.allow.includes("write") ? (
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
              {permission.allow.includes("write") ? (
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
              {permission.allow.includes("read")
              && permission.allow.includes("grant") ? (
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

            <td data-label="Menu">
              <PermissionMenu
                clusterName={clusterName}
                permission={permission}
                permissionList={clusterPermissions.users_permissions}
              />
            </td>
          </tr>
        ))}
      </Table.Body>
    </Table>
  );
};
