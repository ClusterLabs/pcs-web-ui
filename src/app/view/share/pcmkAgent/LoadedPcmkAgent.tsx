import { useSelector } from "react-redux";

import { selectors } from "app/store";
import { EmptyStateError, EmptyStateSpinner } from "app/view/share/emptyState";

import { Agent } from "./types";

export const LoadedPcmkAgent = ({
  clusterName,
  agentName,
  children,
}: {
  clusterName: string;
  agentName: string;
  children: (_ra: Agent) => JSX.Element;
}) => {
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
