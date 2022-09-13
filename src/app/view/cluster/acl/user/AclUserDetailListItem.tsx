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

export const AclUserDetailListItem = ({ roleName }: { roleName: string }) => {
  const clusterName = useSelectedClusterName();
  const { selectedItemUrlName: userName } = useGroupDetailViewContext();

  const unassignUser: MenuAction = {
    action: {
      type: "LIB.CALL.CLUSTER",
      key: { clusterName },
      payload: {
        taskLabel: `unassign role "${roleName}"`,
        call: {
          name: "acl-unassign-role-from-target",
          payload: { role_id: roleName, target_id: userName },
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
          id={"user-remove-role"}
          aria-labelledby={"user-remove-role"}
          aria-label={"Role actions"}
        >
          <DropdownActionListMenu
            dropdownActions={{ Unassign: unassignUser }}
          />
        </DataListAction>
      </DataListItemRow>
    </DataListItem>
  );
};
