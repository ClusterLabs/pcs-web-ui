import {
  Badge,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from "@patternfly/react-core";

import {
  SelectionIndicatorInGroup,
  useGroupDetailViewContext,
} from "app/view/share";

export const AclSubjectListItem = (props: {
  aclType: "user" | "group";
  id: string;
  idLink: React.ReactNode;
  rolesCount: React.ReactNode;
  "data-test"?: string;
}) => {
  const {selectedItemUrlName, selectedItemUrlType, compact} =
    useGroupDetailViewContext();

  return (
    <DataListItem data-test={props["data-test"]}>
      <DataListItemRow>
        <DataListItemCells
          dataListCells={
            <>
              <DataListCell>{props.idLink}</DataListCell>
              <DataListCell>
                {compact ? "Roles" : "Roles assigned"}&nbsp;
                <Badge isRead>{props.rolesCount}</Badge>
              </DataListCell>
            </>
          }
        />
        {selectedItemUrlName !== "" && (
          <SelectionIndicatorInGroup
            isSelected={
              selectedItemUrlType === props.aclType
              && props.id === selectedItemUrlName
            }
          />
        )}
      </DataListItemRow>
    </DataListItem>
  );
};
