import React from "react";

import { selectors, useDispatch } from "app/store";
import { useClusterSelector } from "app/view";

export const useClusterFenceAgent = (agentName: string) => {
  const [fenceAgent, clusterUrlName] = useClusterSelector(
    selectors.getPcmkAgent,
    agentName,
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!fenceAgent) {
      dispatch({
        type: "FENCE_AGENT.LOAD",
        payload: { agentName, clusterUrlName },
      });
    }
  }, [agentName, clusterUrlName, dispatch, fenceAgent]);
  return {
    fenceAgent,
  };
};
