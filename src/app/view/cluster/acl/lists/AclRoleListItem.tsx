import {
  Badge,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from "@patternfly/react-core";

import { selectors } from "app/store";
import {
  Link,
  SelectionIndicatorInGroup,
  useClusterSelector,
  useGroupDetailViewContext,
} from "app/view/share";

import { AclType, Acls } from "../types";

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
  const [cluster] = useClusterSelector(selectors.getCluster);
  const { selectedItemUrlName, selectedItemUrlType, compact } =
    useGroupDetailViewContext();

  return (
    <DataListItem aria-labelledby={id}>
      <DataListItemRow>
        <DataListItemCells
          dataListCells={
            <>
              <DataListCell>
                <Link strong to={`/role/${id}`}>
                  {id}
                </Link>
              </DataListCell>
              <DataListCell>
                {compact && <div>Permissions</div>}
                {!compact && "Permissions "}
                <Badge isRead>{permissions.length}</Badge>
              </DataListCell>
              <DataListCell>
                {compact && <div>Users</div>}
                {!compact && "Users assigned "}
                <Badge isRead>
                  {getAssignedSubjectCount(cluster.acls.user, id)}
                </Badge>
              </DataListCell>
              <DataListCell>
                {compact && <div>Groups</div>}
                {!compact && "Groups assigned "}
                <Badge isRead>
                  {getAssignedSubjectCount(cluster.acls.group, id)}
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
