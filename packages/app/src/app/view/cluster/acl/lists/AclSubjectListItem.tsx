import type React from "react";
import {
  Badge,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from "@patternfly/react-core";

import {useGroupDetailViewContext} from "app/view/cluster/share";

export const AclSubjectListItem = (props: {
  aclType: "user" | "group";
  id: string;
  idLink: React.ReactNode;
  rolesCount: React.ReactNode;
  "data-test"?: string;
}) => {
  const {compact} = useGroupDetailViewContext();

  return (
    <DataListItem
      id={`${props.aclType}-${props.id}`}
      data-test={props["data-test"]}
    >
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
      </DataListItemRow>
    </DataListItem>
  );
};
