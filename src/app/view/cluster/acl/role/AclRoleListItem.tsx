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

export const AclRoleListItem = ({
  name,
  permissions,
}: {
  name: string;
  permissions: string[];
}) => {
  const [cluster] = useClusterSelector(selectors.getCluster);
  const { selectedItemUrlName } = useGroupDetailViewContext();

  const aclAssignedCount = (acls: Record<string, string[]> | undefined) => {
    if (acls === undefined) {
      return 0;
    }

    let count = 0;
    Object.entries(acls).map((acl) => {
      if (acl[1].includes(name)) {
        count += 1;
      }
      return null;
    });
    return count;
  };

  return (
    <DataListItem aria-labelledby={name}>
      <DataListItemRow>
        <DataListItemCells
          dataListCells={
            <>
              <DataListCell>
                <Link to={`/role/${name}`}>
                  <strong>{name}</strong>
                </Link>
              </DataListCell>
              <DataListCell>
                <>{`Permissions (${permissions.length})`}</>
              </DataListCell>
              <DataListCell>
                <>{`Users assigned (${aclAssignedCount(cluster.acls.user)})`}</>
              </DataListCell>
              <DataListCell>
                <>{`Groups assigned (${aclAssignedCount(
                  cluster.acls.group,
                )})`}</>
              </DataListCell>
            </>
          }
        />
        {selectedItemUrlName !== "" && (
          <SelectionIndicatorInGroup
            isSelected={name === selectedItemUrlName}
          />
        )}
      </DataListItemRow>
    </DataListItem>
  );
};
