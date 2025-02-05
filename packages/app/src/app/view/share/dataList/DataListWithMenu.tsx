import type React from "react";
import {
  DataList,
  DataListAction,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from "@patternfly/react-core";

import {LauncherDropdown, type LauncherItem} from "app/view/share/toolbar";
import {EmptyStateNoItem} from "app/view/share/emptyState";
import {tools} from "app/store";

export const DataListWithMenu = ({
  name,
  itemList,
  emptyTitle,
  menuItems,
  formatItem,
}: {
  name: string;
  emptyTitle: string;
  itemList: string[];
  menuItems: ((_itemName: string) => LauncherItem)[];
  formatItem?: (_itemName: string) => React.ReactNode;
}) => {
  if (itemList.length === 0) {
    return <EmptyStateNoItem title={emptyTitle} />;
  }

  return (
    <DataList aria-label={`${tools.labelize(name)}-list`}>
      {itemList.map((itemName, i) => (
        <DataListItem key={i}>
          <DataListItemRow>
            <DataListItemCells
              dataListCells={
                <DataListCell>
                  {formatItem ? formatItem(itemName) : itemName}
                </DataListCell>
              }
            />
            <DataListAction
              className="pf-v5-u-pr-md"
              id={`${name}-${itemName}-menu`}
              aria-labelledby={`${name}-${itemName}-menu`}
              aria-label={`${tools.labelize(name)} ${itemName} menu`}
            >
              <LauncherDropdown items={menuItems.map(mi => mi(itemName))} />
            </DataListAction>
          </DataListItemRow>
        </DataListItem>
      ))}
    </DataList>
  );
};
