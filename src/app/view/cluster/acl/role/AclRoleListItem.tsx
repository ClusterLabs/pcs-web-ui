import {
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
  roleId,
  permissions,
}: {
  roleId: string;
  permissions: AclType<"role">["permissions"];
}) => {
  const [cluster] = useClusterSelector(selectors.getCluster);
  const { selectedItemUrlName } = useGroupDetailViewContext();

  return (
    <DataListItem aria-labelledby={roleId}>
      <DataListItemRow>
        <DataListItemCells
          dataListCells={
            <>
              <DataListCell>
                <Link to={`/role/${roleId}`}>
                  <strong>{roleId}</strong>
                </Link>
              </DataListCell>
              <DataListCell>Permissions ({permissions.length})</DataListCell>
              <DataListCell>
                Users assigned (
                {getAssignedSubjectCount(cluster.acls.user, roleId)})
              </DataListCell>
              <DataListCell>
                Groups assigned (
                {getAssignedSubjectCount(cluster.acls.group, roleId)})
              </DataListCell>
            </>
          }
        />
        {selectedItemUrlName !== "" && (
          <SelectionIndicatorInGroup
            isSelected={roleId === selectedItemUrlName}
          />
        )}
      </DataListItemRow>
    </DataListItem>
  );
};
