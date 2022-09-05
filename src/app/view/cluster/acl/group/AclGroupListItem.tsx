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

export const AclGroupListItem = ({
  name,
  roleIdList,
}: {
  name: string;
  roleIdList: string[];
}) => {
  const { selectedItemUrlName } = useGroupDetailViewContext();
  return (
    <DataListItem aria-labelledby={name}>
      <DataListItemRow>
        <DataListItemCells
          dataListCells={
            <>
              <DataListCell>
                <Link to={`/group/${name}`}>
                  <strong>{name}</strong>
                </Link>
              </DataListCell>
              <DataListCell>Roles assigned ({roleIdList.length})</DataListCell>
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
