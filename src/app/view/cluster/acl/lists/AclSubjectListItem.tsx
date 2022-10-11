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

export const AclSubjectListItem = ({
  aclType,
  id,
  roleIdList,
}: {
  aclType: "user" | "group";
  id: string;
  roleIdList: string[];
}) => {
  const { selectedItemUrlName, selectedItemUrlType, compact } =
    useGroupDetailViewContext();

  return (
    <DataListItem aria-labelledby={id} data-test={`list-item ${id}`}>
      <DataListItemRow>
        <DataListItemCells
          dataListCells={
            <>
              <DataListCell data-test="name">
                <Link strong to={`/${aclType}/${id}`}>
                  {id}
                </Link>
              </DataListCell>
              <DataListCell>
                {compact ? "Roles" : "Roles assigned"}&nbsp;
                <Badge isRead data-test="roles-count">
                  {roleIdList.length}
                </Badge>
              </DataListCell>
            </>
          }
        />
        {selectedItemUrlName !== "" && (
          <SelectionIndicatorInGroup
            isSelected={
              selectedItemUrlType === aclType && id === selectedItemUrlName
            }
          />
        )}
      </DataListItemRow>
    </DataListItem>
  );
};
