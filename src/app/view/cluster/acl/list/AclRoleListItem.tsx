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

export const AclRoleListItem = ({
  name,
  description,
  permissions,
}: {
  name: string;
  description: string;
  permissions: string[];
}) => {
  const { selectedItemUrlName } = useGroupDetailViewContext();
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
                <Label>{description}</Label>
                <Label>{permissions[0]}</Label>
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
