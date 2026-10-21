import React from "react";

import {useDispatch} from "app/view/share";

export const useClusterLoad = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({type: "CLUSTER.STATUS.SYNC"});
    dispatch({type: "CLUSTER.STATIC_INFO.LOAD"});
  }, [dispatch]);
};
