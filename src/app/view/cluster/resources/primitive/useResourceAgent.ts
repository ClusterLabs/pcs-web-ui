import React from "react";

import { selectors } from "app/store";
import { useClusterSelector, useDispatch } from "app/view/share";

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
