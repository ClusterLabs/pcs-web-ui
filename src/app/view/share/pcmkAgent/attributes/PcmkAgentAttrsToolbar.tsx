import {
  LauncherItem,
  ToolbarFilterTextGroupPair,
} from "app/view/share/toolbar";

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

export const PcmkAgentAttrsToolbar = <ARGS extends unknown[] = []>({
  buttonsItems,
  filterState,
  toolbarName,
}: {
  buttonsItems?: LauncherItem<ARGS>[];
  filterState: ReturnType<typeof useState>["filterState"];
  toolbarName: string;
}) => {
  return (
    <ToolbarFilterTextGroupPair
      textSearchId="agent-attributes-name"
      groupName="Importance"
      filterState={filterState}
      buttonsItems={buttonsItems}
      toolbarName={toolbarName}
    />
  );
};

PcmkAgentAttrsToolbar.useState = useState;
