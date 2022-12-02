import {EmptyStateError, EmptyStateSpinner} from "app/view/share/emptyState";
import {useClusterSources} from "app/view/cluster/share";

import {Agent} from "./types";

export const LoadedPcmkAgent = ({
  agentName,
  children,
}: {
  agentName: string;
  children: (_ra: Agent) => JSX.Element;
}) => {
  const {pcmkAgents} = useClusterSources();
  const agent = pcmkAgents[agentName];

  if (!agent || agent.loadStatus === "LOADING") {
    return <EmptyStateSpinner title={`Loading agent "${agentName}" data`} />;
  }

  if (["LOADED", "RELOADING"].includes(agent.loadStatus)) {
    return children(agent);
  }

  // agent.loadStatus === "FAILED"
  return (
    <EmptyStateError
      title="Cannot load data"
      message={`Cannot load metadata of agent "${agentName}"`}
    />
  );
};
