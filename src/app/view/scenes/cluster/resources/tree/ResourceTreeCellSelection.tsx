import React from "react";
import { ArrowCircleRightIcon } from "@patternfly/react-icons";

import { useSelectedResource } from "./SelectedResourceContext";

export const ResourceTreeCellSelection = ({ resourceId }: {
  resourceId: string;
}) => {
  const selectedResourceId = useSelectedResource();
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
