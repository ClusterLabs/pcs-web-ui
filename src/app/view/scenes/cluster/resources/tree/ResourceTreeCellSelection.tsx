import React from "react";
import { ArrowCircleRightIcon } from "@patternfly/react-icons";

import { useGroupDetailViewContext } from "app/view/common";

export const ResourceTreeCellSelection = ({
  resourceId,
}: {
  resourceId: string;
}) => {
  const { selectedItemUrlName } = useGroupDetailViewContext();
  const isSelected = selectedItemUrlName === resourceId;
  if (selectedItemUrlName === "") {
    return null;
  }
  return (
    <div
      className={`ha-c-tree-view__selected-status${
        isSelected ? " ha-m-active" : ""
      }`}
      data-test="resource-tree-item-selection"
    >
      <ArrowCircleRightIcon />
    </div>
  );
};
