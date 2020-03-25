import React from "react";
import { ArrowCircleRightIcon } from "@patternfly/react-icons";

import { useResourceTreeContext } from "./ResourceTreeContext";

export const ResourceTreeCellSelection = ({ resourceId }: {
  resourceId: string;
}) => {
  const { selectedResourceId } = useResourceTreeContext();
  const isSelected = selectedResourceId === resourceId;
  if (selectedResourceId === "") {
    return null;
  }
  return (
    <div
      className={
        `ha-c-tree-view__selected-status${isSelected ? " ha-m-active" : ""}`
      }
    >
      <ArrowCircleRightIcon />
    </div>
  );
};
