import type React from "react";
import {
  DataListAction,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from "@patternfly/react-core";

import {tools} from "app/store";

import {useDataListWithMenuContext} from "./DataListWithMenuContext";

export const DataListItemWithMenu = (props: {
  item: string;
  menu: React.ReactNode;
  children: React.ReactNode;
  "data-test"?: string;
}) => {
  const {listName} = useDataListWithMenuContext();
  return (
    <DataListItem data-test={props["data-test"]}>
      <DataListItemRow>
        <DataListItemCells
          dataListCells={<DataListCell>{props.children}</DataListCell>}
        />
        <DataListAction
          className="pf-v5-u-pr-md"
          id={`${listName}-${props.item}-menu`}
          aria-labelledby={`${listName}-${props.item}-menu`}
          aria-label={`${tools.labelize(listName)} ${props.item} menu`}
        >
          {props.menu}
        </DataListAction>
      </DataListItemRow>
    </DataListItem>
  );
};
