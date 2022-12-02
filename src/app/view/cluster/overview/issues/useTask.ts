import {useDispatch} from "app/view/share";
import {useClusterSources} from "app/view/cluster/share";

export const useTask = () => {
  const dispatch = useDispatch();
  const {
    tasks: {
      fixAuth: {
        authProcessId,
        open,
        fixing,
        errorMessage,
        authAttemptInProgress,
      },
    },
    loadedCluster: {clusterName},
  } = useClusterSources();
  return {
    open,
    fixing,
    errorMessage,
    authAttemptInProgress,
    authProcessId,

    cancel: () =>
      dispatch({
        type: "CLUSTER.FIX_AUTH.CANCEL",
        key: {clusterName},
      }),

    fixAuthStart: (initialNodeList: string[]) => {
      dispatch({
        type: "CLUSTER.FIX_AUTH.START",
        key: {clusterName},
        payload: {initialNodeList},
      });
    },

    fixAuthDone: () => {
      dispatch({
        type: "CLUSTER.FIX_AUTH.AUTH_DONE",
        key: {clusterName},
      });
    },
  };
};
