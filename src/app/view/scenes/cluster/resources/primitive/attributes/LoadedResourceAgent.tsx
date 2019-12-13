import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "@patternfly/react-core";

import { types, selectors } from "app/store";
import { Spinner } from "app/view/common";

const LoadedResourceAgent = ({ agentName, children }: {
  agentName: string;
  children: (ra: types.resourceAgents.ResourceAgentMetadata) => JSX.Element;
}) => {
  const resourceAgent = useSelector(selectors.getResourceAgent(agentName));

  if (!resourceAgent || resourceAgent.loadStatus === "LOADING") {
    return <Spinner text="Loading resource agent data" />;
  }

  if (["LOADED", "RELOADING"].includes(resourceAgent.loadStatus)) {
    return children(resourceAgent);
  }

  // resourceAgent.loadStatus === "FAILED"
  return (
    <Alert
      isInline
      variant="danger"
      title={`Cannot load metadata of resource agent "${agentName}"`}
    />
  );
};

export default LoadedResourceAgent;
