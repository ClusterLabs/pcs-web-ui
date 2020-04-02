import React from "react";
import { useSelector } from "react-redux";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Spinner,
  Title,
} from "@patternfly/react-core";
import { ExclamationCircleIcon } from "@patternfly/react-icons";

import { selectors, types } from "app/store";

// import { Spinner } from "./Spinner";
import * as pallete from "./pallete";

export const LoadedResourceAgent = ({
  agentName,
  children,
}: {
  agentName: string;
  children: (ra: types.resourceAgents.ResourceAgentMetadata) => JSX.Element;
}) => {
  const resourceAgent = useSelector(selectors.getResourceAgent(agentName));

  if (!resourceAgent || resourceAgent.loadStatus === "LOADING") {
    return (
      <EmptyState style={{ margin: "auto" }}>
        <EmptyStateIcon variant="container" component={Spinner} />
        <Title size="lg">{`Loading resource agent "${agentName}" data`}</Title>
      </EmptyState>
    );
  }

  if (["LOADED", "RELOADING"].includes(resourceAgent.loadStatus)) {
    return children(resourceAgent);
  }

  // resourceAgent.loadStatus === "FAILED"
  return (
    <EmptyState style={{ margin: "auto" }}>
      <EmptyStateIcon icon={ExclamationCircleIcon} color={pallete.ERROR} />
      <Title size="lg">Cannot load data</Title>
      <EmptyStateBody>
        {`Cannot load metadata of resource agent "${agentName}"`}
      </EmptyStateBody>
    </EmptyState>
  );
};
