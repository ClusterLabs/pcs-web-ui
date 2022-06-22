import { AttributeHelpPopover, EmptyStateNoItem, Table } from "app/view/share";

import { PermissionMenu } from "./PermissionMenu";
import { PermissionCompetenceCell } from "./PermissionCompetenceCell";
import { Permission } from "./types";
import { usePermissions } from "./usePermissions";

const dataTest = (
  rowIndex: number,
  permissionPart: Permission["allow"][number] | "name" | "type",
) => `permission-${rowIndex}-${permissionPart}`;

export const PermissionsTable = () => {
  const { permissionList } = usePermissions();

  if (permissionList.length === 0) {
    return <EmptyStateNoItem title={""} canAdd={false} />;
  }

  return (
    <Table>
      <thead>
        <tr>
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
        </tr>
      </thead>

      <Table.Body data-test="permission-list">
        {permissionList.map((permission, i) => (
          <tr key={i} data-test={`permission-${permission.name}`}>
            <td data-label="Name" data-test={dataTest(i, "name")}>
              {permission.name}
            </td>
            <td data-label="Type" data-test={dataTest(i, "type")}>
              {permission.type}
            </td>

            <PermissionCompetenceCell
              permission={permission}
              competenceName="read"
              presentInCompetenceNames={["write", "full"]}
              data-test={dataTest(i, "read")}
            />
            <PermissionCompetenceCell
              permission={permission}
              competenceName="write"
              presentInCompetenceNames={["full"]}
              data-test={dataTest(i, "write")}
            />
            <PermissionCompetenceCell
              permission={permission}
              competenceName="grant"
              presentInCompetenceNames={["full"]}
              data-test={dataTest(i, "grant")}
            />
            <PermissionCompetenceCell
              permission={permission}
              competenceName="full"
              data-test={dataTest(i, "full")}
            />

            <td data-label="Menu">
              <PermissionMenu permission={permission} />
            </td>
          </tr>
        ))}
      </Table.Body>
    </Table>
  );
};
