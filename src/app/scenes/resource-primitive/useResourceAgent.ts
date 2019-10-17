import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ResourcePrimitiveAction from "./actions";

import * as selectors from "./selectors";

const useResourceAgent = (clusterUrlName: string, agentName: string) => {
  const resourceAgent = useSelector(selectors.getResourceAgent(agentName));
  const dispatch = useDispatch();
  React.useEffect(
    () => {
      if (!resourceAgent) {
        dispatch<ResourcePrimitiveAction.LoadResourceAgent>({
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
