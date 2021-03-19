import React from "react";

import { selectors } from "app/store";
import { useClusterSelector, useDispatch } from "app/view";

export const useClusterFenceAgent = (agentName: string) => {
  const [fenceAgent, cluster] = useClusterSelector(
    selectors.getPcmkAgent,
    agentName,
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!fenceAgent) {
      dispatch({
        type: "FENCE_AGENT.LOAD",
        key: { clusterName: cluster },
        payload: { agentName },
      });
    }
  }, [agentName, cluster, dispatch, fenceAgent]);
  return {
    fenceAgent,
  };
};
