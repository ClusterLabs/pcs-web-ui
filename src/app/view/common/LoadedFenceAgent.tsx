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

export const LoadedFenceAgent = ({
  agentName,
  children,
}: {
  agentName: string;
  children: (fa: types.pcmkAgents.FenceAgent) => JSX.Element;
}) => {
  const fenceAgent = useSelector(selectors.getFenceAgent(agentName));

  if (!fenceAgent || fenceAgent.loadStatus === "LOADING") {
    return (
      <EmptyState style={{ margin: "auto" }}>
        <EmptyStateIcon variant="container" component={Spinner} />
        <Title size="lg">{`Loading fence agent "${agentName}" data`}</Title>
      </EmptyState>
    );
  }

  if (["LOADED", "RELOADING"].includes(fenceAgent.loadStatus)) {
    return children(fenceAgent);
  }

  // fenceAgent.loadStatus === "FAILED"
  return (
    <EmptyState style={{ margin: "auto" }}>
      <EmptyStateIcon icon={ExclamationCircleIcon} color={pallete.ERROR} />
      <Title size="lg">Cannot load data</Title>
      <EmptyStateBody>
        {`Cannot load metadata of fence agent "${agentName}"`}
      </EmptyStateBody>
    </EmptyState>
  );
};
