import React from "react";

import { ClusterSectionToolbar } from "app/view";

import { ResourceCreateToolbarItem } from "./wizard";

export const ResourcesToolbar = () => {
  return (
    <ClusterSectionToolbar>
      <ResourceCreateToolbarItem />
    </ClusterSectionToolbar>
  );
};
