import {
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
    <DataListItem aria-labelledby={id}>
      <DataListItemRow>
        <DataListItemCells
          dataListCells={
            <>
              <DataListCell>
                <Link strong to={`/${aclType}/${id}`}>
                  {id}
                </Link>
              </DataListCell>
              <DataListCell>
                {compact ? "Roles" : "Roles assigned"}&nbsp;{roleIdList.length}
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
