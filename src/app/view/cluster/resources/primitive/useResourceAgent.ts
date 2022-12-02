import React from "react";

import {useDispatch} from "app/view/share";
import {useClusterSources} from "app/view/share";

export const useClusterResourceAgent = (agentName: string) => {
  const {
    pcmkAgents,
    loadedCluster: {clusterName},
  } = useClusterSources();

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!pcmkAgents[agentName]) {
      dispatch({
        type: "RESOURCE_AGENT.LOAD",
        key: {clusterName},
        payload: {agentName},
      });
    }
  }, [agentName, clusterName, dispatch, pcmkAgents]);
  return {
    resourceAgent: pcmkAgents[agentName],
  };
};
