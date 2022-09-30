import {
  DataList,
  DataListAction,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from "@patternfly/react-core";

import { LauncherDropdown, LauncherItem } from "app/view/share/toolbar";
import { EmptyStateNoItem } from "app/view/share/emptyState";
import { tools } from "app/store";

export const DataListWithMenu = ({
  name,
  itemList,
  emptyTitle,
  menuItems,
}: {
  name: string;
  emptyTitle: string;
  itemList: string[];
  menuItems: ((_itemName: string) => LauncherItem)[];
}) => {
  if (itemList.length === 0) {
    return <EmptyStateNoItem title={emptyTitle} />;
  }

  const nameList = `${name}-list`;

  return (
    <DataList aria-label={tools.labelize(nameList)} data-test={nameList}>
      {itemList.map((itemName, i) => (
        <DataListItem key={i}>
          <DataListItemRow>
            <DataListItemCells
              dataListCells={<DataListCell>{itemName}</DataListCell>}
            />
            <DataListAction
              className="pf-u-pr-md"
              id={`${name}-${itemName}-menu`}
              aria-labelledby={`${name}-${itemName}-menu`}
              aria-label={`${tools.labelize(name)} ${itemName} menu`}
            >
              <LauncherDropdown
                items={menuItems.map(mi => mi(itemName))}
                dropdownName={`${name}-${itemName}`}
              />
            </DataListAction>
          </DataListItemRow>
        </DataListItem>
      ))}
    </DataList>
  );
};
