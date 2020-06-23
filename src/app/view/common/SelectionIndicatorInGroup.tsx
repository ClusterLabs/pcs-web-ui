import React from "react";
import { ArrowCircleRightIcon } from "@patternfly/react-icons";

export const SelectionIndicatorInGroup = ({
  isSelected,
}: {
  isSelected: boolean;
}) => {
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
