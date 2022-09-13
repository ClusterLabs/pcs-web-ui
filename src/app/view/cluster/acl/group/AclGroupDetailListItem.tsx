import React from "react";
import {
  DataListAction,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from "@patternfly/react-core";

import {
  DropdownActionListMenu,
  useGroupDetailViewContext,
  useSelectedClusterName,
} from "app/view/share";

type DropdownAction = React.ComponentProps<
  typeof DropdownActionListMenu
>["dropdownActions"];
type MenuAction = DropdownAction[keyof DropdownAction];

export const AclGroupDetailListItem = ({ roleName }: { roleName: string }) => {
  const clusterName = useSelectedClusterName();
  const { selectedItemUrlName: groupName } = useGroupDetailViewContext();

  const unassignGroup: MenuAction = {
    action: {
      type: "LIB.CALL.CLUSTER",
      key: { clusterName },
      payload: {
        taskLabel: `unassign role "${roleName}"`,
        call: {
          name: "acl-unassign-role-from-group",
          payload: { role_id: roleName, group_id: groupName },
        },
      },
    },
    confirm: {
      title: "Unassign role?",
      description: <>This unassigns the role {roleName}</>,
    },
  };

  return (
    <DataListItem>
      <DataListItemRow>
        <DataListItemCells
          dataListCells={<DataListCell>{roleName}</DataListCell>}
        />
        <DataListAction
          id={"group-remove-role"}
          aria-labelledby={"group-remove-role"}
          aria-label={"Role actions"}
        >
          <DropdownActionListMenu
            dropdownActions={{ Unassign: unassignGroup }}
          />
        </DataListAction>
      </DataListItemRow>
    </DataListItem>
  );
};
