import React from "react";

import { ClusterSectionToolbar } from "app/view";

import { NodeAddToolbarItem } from "./wizard";

export const NodesToolbar: React.FC = () => {
  return (
    <ClusterSectionToolbar>
      <NodeAddToolbarItem />
    </ClusterSectionToolbar>
  );
};
