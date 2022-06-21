import {
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  Label,
} from "@patternfly/react-core";

import {
  Link,
  SelectionIndicatorInGroup,
  useGroupDetailViewContext,
} from "app/view/share";

export const AclUserListItem = ({
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
                <Link to={`/user/${name}`}>
                  <strong>{name}</strong>
                </Link>
              </DataListCell>
              <DataListCell>
                <Label>{roleIdList[0]}</Label>
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
