import {
  Badge,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
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

const {role} = testMarks.cluster.acl.lists;

export const AclRoleListItem = ({
  id,
  permissions,
}: {
  id: string;
  permissions: AclType<"role">["permissions"];
}) => {
  const {acls} = useLoadedCluster();
  const {selectedItemUrlName, selectedItemUrlType, compact} =
    useGroupDetailViewContext();

  return (
    <DataListItem aria-labelledby={id} {...role.mark}>
      <DataListItemRow>
        <DataListItemCells
          dataListCells={
            <>
              <DataListCell>
                <Link strong to={`/role/${id}`} {...role.id.mark}>
                  {id}
                </Link>
              </DataListCell>
              <DataListCell>
                {compact && <div>Permissions</div>}
                {!compact && "Permissions "}
                <Badge isRead {...role.permissionsCount.mark}>
                  {permissions.length}
                </Badge>
              </DataListCell>
              <DataListCell>
                {compact && <div>Users</div>}
                {!compact && "Users assigned "}
                <Badge isRead {...role.usersCount.mark}>
                  {getAssignedSubjectCount(acls.user, id)}
                </Badge>
              </DataListCell>
              <DataListCell>
                {compact && <div>Groups</div>}
                {!compact && "Groups assigned "}
                <Badge isRead {...role.groupsCount.mark}>
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
