import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Action } from "app/actions";

import * as selectors from "./selectors";

const useResourceAgent = (clusterUrlName: string, agentName: string) => {
  const resourceAgent = useSelector(selectors.getResourceAgent(agentName));
  const dispatch = useDispatch();
  React.useEffect(
    () => {
      if (!resourceAgent) {
        dispatch<Action>({
          type: "RESOURCE_AGENT.LOAD",
          payload: { agentName, clusterUrlName },
        });
      }
    },
    [agentName, clusterUrlName, dispatch, resourceAgent],
  );
  return {
    resourceAgent,
  };
};

export default useResourceAgent;
