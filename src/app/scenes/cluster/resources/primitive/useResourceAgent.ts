import React from "react";

import { selectors, useDispatch } from "app/store";
import { useClusterSelector } from "app/view";

export const useClusterResourceAgent = (agentName: string) => {
  const [resourceAgent, cluster] = useClusterSelector(
    selectors.getPcmkAgent,
    agentName,
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!resourceAgent) {
      dispatch({
        type: "RESOURCE_AGENT.LOAD",
        key: { clusterName: cluster },
        payload: { agentName },
      });
    }
  }, [agentName, cluster, dispatch, resourceAgent]);
  return {
    resourceAgent,
  };
};
