import React from "react";
import {DataList} from "@patternfly/react-core";

import {EmptyStateNoItem} from "app/view/share/emptyState";
import {tools} from "app/store";
import {DataListWithMenuContextProvider} from "./DataListWithMenuContext";

export const DataListWithMenu = (props: {
  name: string;
  emptyTitle: string;
  itemList: string[];
  children: (_itemName: string) => React.ReactNode;
  "data-test"?: string;
}) => {
  if (props.itemList.length === 0) {
    return (
      <EmptyStateNoItem
        title={props.emptyTitle}
        data-test={props["data-test"]}
      />
    );
  }

  return (
    <DataList
      aria-label={`${tools.labelize(props.name)}-list`}
      data-test={props["data-test"]}
    >
      <DataListWithMenuContextProvider value={{listName: props.name}}>
        {props.itemList.map((itemName, i) => (
          <React.Fragment key={i}>{props.children(itemName)}</React.Fragment>
        ))}
      </DataListWithMenuContextProvider>
    </DataList>
  );
};
