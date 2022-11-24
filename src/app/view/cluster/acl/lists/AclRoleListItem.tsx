import {
  Badge,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from "@patternfly/react-core";

import {
  Link,
  SelectionIndicatorInGroup,
  useGroupDetailViewContext,
} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

import {AclType, Acls} from "../types";

const getAssignedSubjectCount = (
  subjectMap: Acls["user"] | Acls["group"],
  roleId: string,
) => {
  return Object.entries(subjectMap || {}).filter(([_id, roleIdList]) =>
    roleIdList.includes(roleId),
  ).length;
};

export const AclRoleListItem = ({
  id,
  permissions,
}: {
  id: string;
  permissions: AclType<"role">["permissions"];
}) => {
  const [{acls}] = useLoadedCluster();
  const {selectedItemUrlName, selectedItemUrlType, compact} =
    useGroupDetailViewContext();

  return (
    <DataListItem aria-labelledby={id} data-test={`list-item ${id}`}>
      <DataListItemRow>
        <DataListItemCells
          dataListCells={
            <>
              <DataListCell data-test="name">
                <Link strong to={`/role/${id}`}>
                  {id}
                </Link>
              </DataListCell>
              <DataListCell>
                {compact && <div>Permissions</div>}
                {!compact && "Permissions "}
                <Badge isRead data-test="permissions-count">
                  {permissions.length}
                </Badge>
              </DataListCell>
              <DataListCell>
                {compact && <div>Users</div>}
                {!compact && "Users assigned "}
                <Badge isRead data-test="users-count">
                  {getAssignedSubjectCount(acls.user, id)}
                </Badge>
              </DataListCell>
              <DataListCell>
                {compact && <div>Groups</div>}
                {!compact && "Groups assigned "}
                <Badge isRead data-test="groups-count">
                  {getAssignedSubjectCount(acls.group, id)}
                </Badge>
              </DataListCell>
            </>
          }
        />
        {selectedItemUrlName !== "" && (
          <SelectionIndicatorInGroup
            isSelected={
              selectedItemUrlType === "role" && id === selectedItemUrlName
            }
          />
        )}
      </DataListItemRow>
    </DataListItem>
  );
};
