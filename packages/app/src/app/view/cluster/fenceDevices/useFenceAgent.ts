import React from "react";

import {useDispatch} from "app/view/share";
import {useClusterSources} from "app/view/cluster/share";

export const useClusterFenceAgent = (agentName: string) => {
  const {pcmkAgents} = useClusterSources();

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!pcmkAgents[agentName]) {
      dispatch({
        type: "FENCE_AGENT.LOAD",
        payload: {agentName},
      });
    }
  }, [agentName, dispatch, pcmkAgents]);
  return {
    resourceAgent: pcmkAgents[agentName],
  };
};
