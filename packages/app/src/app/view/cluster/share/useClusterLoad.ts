import React from "react";

import {useDispatch} from "app/view/share";

export const useClusterLoad = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({type: "CLUSTER.STATUS.SYNC"});
    dispatch({type: "CLUSTER.PROPERTIES.LOAD"});
    dispatch({type: "CLUSTER.PERMISSIONS.LOAD"});
    dispatch({type: "RESOURCE_AGENT.LIST.LOAD"});
    dispatch({type: "FENCE_AGENT.LIST.LOAD"});
  }, [dispatch]);
};
