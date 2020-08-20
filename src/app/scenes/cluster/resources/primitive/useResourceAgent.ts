import React from "react";
import { useDispatch } from "react-redux";

import { Action, selectors } from "app/store";
import { useClusterSelector } from "app/view";

export const useClusterResourceAgent = (agentName: string) => {
  const [resourceAgent, clusterUrlName] = useClusterSelector(
    selectors.getPcmkAgent,
    agentName,
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!resourceAgent) {
      dispatch<Action>({
        type: "RESOURCE_AGENT.LOAD",
        payload: { agentName, clusterUrlName },
      });
    }
  }, [agentName, clusterUrlName, dispatch, resourceAgent]);
  return {
    resourceAgent,
  };
};
