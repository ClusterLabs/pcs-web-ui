import React from "react";

import { ToolbarFilterTextGroupPair } from "app/view/share/toolbar";

import { AgentParameter } from "../types";

const useState = (
  initialGroupInclustionMap: {
    Required: boolean;
    Optional: boolean;
    Advanced: boolean;
  } = {
    Required: true,
    Optional: true,
    Advanced: false,
  },
): {
  filterState: ReturnType<
    typeof ToolbarFilterTextGroupPair.useState
  >["filterState"];
  filterParameters: (_parameters: AgentParameter[]) => AgentParameter[];
} =>
  ToolbarFilterTextGroupPair.useState(
    initialGroupInclustionMap,
    p => ({
      Advanced: p.advanced,
      Required: p.required,
      Optional: !p.required && !p.advanced,
    }),
    p => p.name,
  );

export const PcmkAgentAttrsToolbar = ({
  actions = {},
  filterState,
}: {
  actions?: React.ComponentProps<typeof ToolbarFilterTextGroupPair>["actions"];
  filterState: ReturnType<typeof useState>["filterState"];
}) => {
  return (
    <ToolbarFilterTextGroupPair
      textSearchId="agent-attributes-name"
      groupName="Importance"
      filterState={filterState}
      actions={actions}
    />
  );
};

PcmkAgentAttrsToolbar.useState = useState;
