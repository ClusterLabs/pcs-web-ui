import React from "react";
import { useSelector } from "react-redux";

import { selectors, types } from "app/store";
import { EmptyStateError, EmptyStateSpinner } from "app/view/emptyState";

export const LoadedPcmkAgent: React.FC<{
  clusterName: string;
  agentName: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  children: (ra: types.pcmkAgents.Agent) => React.ReactElement<any, any> | null;
}> = ({ clusterName, agentName, children }) => {
  const agent = useSelector(selectors.getPcmkAgent(clusterName, agentName));

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
