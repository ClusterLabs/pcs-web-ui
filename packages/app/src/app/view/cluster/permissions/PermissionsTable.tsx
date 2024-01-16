import {Td, Thead, Tr} from "@patternfly/react-table";

import {testMarks} from "app/view/dataTest";
import {AttributeHelpPopover, EmptyStateNoItem, Table} from "app/view/share";

import {useLoadedPermissions} from "./LoadedPermissionsContext";
import {PermissionMenu} from "./PermissionMenu";
import {PermissionCompetenceCell} from "./PermissionCompetenceCell";

const {permission: permissionMark} = testMarks.cluster.permissions;

export const PermissionsTable = () => {
  const {
    permissions: {users_permissions: permissionList},
  } = useLoadedPermissions();

  if (permissionList.length === 0) {
    return <EmptyStateNoItem title={""} canAdd={false} />;
  }

  return (
    <Table {...testMarks.cluster.permissions.mark}>
      <Thead>
        <Tr>
          <th data-label="Name">Name</th>
          <th data-label="Type">Type</th>
          <th data-label="Read">
            <>Read </>
            <AttributeHelpPopover
              header={"Allows to view cluster settings"}
              body={""}
            />
          </th>
          <th data-label="Write">
            <>Write </>
            <AttributeHelpPopover
              header={
                "Allows to modify cluster settings except permissions and ACLs"
              }
              body={""}
            />
          </th>
          <th data-label="Grant">
            <>Grant </>
            <AttributeHelpPopover
              header={"Allows to modify cluster permissions and ACLs"}
              body={""}
            />
          </th>
          <th data-label="Full">
            <>Full </>
            <AttributeHelpPopover
              header={
                "Allows unrestricted access to a cluster except for adding nodes"
              }
              body={""}
            />
          </th>
          <th data-label="Menu"> </th>
        </Tr>
      </Thead>

      <Table.Body>
        {permissionList.map((permission, i) => (
          <Tr key={i} {...permissionMark.mark}>
            <Td data-label="Name" {...permissionMark.name.mark}>
              {permission.name}
            </Td>
            <Td data-label="Type" {...permissionMark.type.mark}>
              {permission.type}
            </Td>

            <PermissionCompetenceCell
              permission={permission}
              competenceName="read"
              presentInCompetenceNames={["write", "full"]}
              {...permissionMark.read.mark}
            />
            <PermissionCompetenceCell
              permission={permission}
              competenceName="write"
              presentInCompetenceNames={["full"]}
              {...permissionMark.write.mark}
            />
            <PermissionCompetenceCell
              permission={permission}
              competenceName="grant"
              presentInCompetenceNames={["full"]}
              {...permissionMark.grant.mark}
            />
            <PermissionCompetenceCell
              permission={permission}
              competenceName="full"
              {...permissionMark.full.mark}
            />

            <Td data-label="Menu">
              <PermissionMenu
                permission={permission}
                permissionList={permissionList}
              />
            </Td>
          </Tr>
        ))}
      </Table.Body>
    </Table>
  );
};
