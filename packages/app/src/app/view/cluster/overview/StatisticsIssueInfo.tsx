import React from "react";
import {Label} from "@patternfly/react-core";

export const StatisticsIssueInfo = <ITEM extends string | string[]>({
  icon: iconComponent,
  color,
  issueName,
  itemList,
  createItemLabel,
}: {
  icon: React.ReactNode;
  color: React.ComponentProps<typeof Label>["color"];
  issueName: string;
  itemList: ITEM[];
  createItemLabel: (_item: ITEM) => React.ReactNode;
}) => {
  if (itemList.length === 0) {
    return null;
  }

  return (
    <div className="pf-v5-u-my-xs">
      <Label icon={iconComponent} color={color}>
        <strong className="pf-v5-u-mr-xs">{itemList.length}</strong>
        {issueName}
      </Label>{" "}
      {itemList.length < 4 && (
        <span>
          {itemList
            .map<React.ReactNode>((item, i) => (
              <React.Fragment key={i}>{createItemLabel(item)}</React.Fragment>
            ))
            .reduce((prev, curr) => [prev, ", ", curr])}{" "}
        </span>
      )}
    </div>
  );
};
