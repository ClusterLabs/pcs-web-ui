import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Action } from "app/actions";

import { selectors } from "app/store";

export const useFenceAgent = (clusterUrlName: string, agentName: string) => {
  const fenceAgent = useSelector(selectors.getFenceAgent(agentName));
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!fenceAgent) {
      dispatch<Action>({
        type: "FENCE_AGENT.LOAD",
        payload: { agentName, clusterUrlName },
      });
    }
  }, [agentName, clusterUrlName, dispatch, fenceAgent]);
  return {
    fenceAgent,
  };
};
