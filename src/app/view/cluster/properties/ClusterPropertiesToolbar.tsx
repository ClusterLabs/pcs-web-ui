import React from "react";

import { types } from "app/store";
import { ToolbarFilterTextGroupPair } from "app/view/share/toolbar";

type ClusterProperty = types.clusterProperties.ClusterProperty;

const useState = (): {
  filterState: ReturnType<
    typeof ToolbarFilterTextGroupPair.useState
  >["filterState"];
  filterParameters: (parameters: ClusterProperty[]) => ClusterProperty[];
} =>
  ToolbarFilterTextGroupPair.useState(
    {
      Advanced: false,
      Basic: true,
    },
    p => ({
      Advanced: p.advanced,
      Basic: !p.advanced,
    }),
    p => p.readable_name,
  );

export const ClusterPropertiesToolbar: React.FC<{
  actions?: Record<string, () => void>;
  filterState: ReturnType<typeof useState>["filterState"];
}> & { useState: typeof useState } = ({ actions = {}, filterState }) => {
  return (
    <ToolbarFilterTextGroupPair
      textSearchId="cluster-properties-name"
      groupName="Importance"
      filterState={filterState}
      actions={actions}
    />
  );
};

ClusterPropertiesToolbar.useState = useState;
