import type React from "react";

import {
  type LauncherItem,
  ToolbarFilterTextGroupPair,
} from "app/view/share/toolbar";

import type {AgentParameter} from "../types";

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
  buttonsItems,
  filterState,
  additionalItems,
}: {
  buttonsItems?: LauncherItem[];
  filterState: ReturnType<typeof useState>["filterState"];
  additionalItems?: React.ReactNode;
}) => {
  return (
    <ToolbarFilterTextGroupPair
      textSearchId="agent-attributes-name"
      groupName="Importance"
      filterState={filterState}
      buttonsItems={buttonsItems}
      additionalItems={additionalItems}
    />
  );
};

PcmkAgentAttrsToolbar.useState = useState;
