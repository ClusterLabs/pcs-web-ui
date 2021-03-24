import { selectors } from "app/store";
import { useClusterSelector, useDispatch } from "app/view/share";

export const useWizard = () => {
  const dispatch = useDispatch();
  const [
    { authProcessId, open, fixing, errorMessage, authAttemptInProgress },
    clusterName,
  ] = useClusterSelector(selectors.getClusterPart("fixAuth"));
  return {
    open,
    fixing,
    errorMessage,
    authAttemptInProgress,
    authProcessId,

    cancel: () =>
      dispatch({
        type: "CLUSTER.FIX_AUTH.CANCEL",
        key: { clusterName },
      }),

    fixAuthStart: (initialNodeList: string[]) => {
      dispatch({
        type: "CLUSTER.FIX_AUTH.START",
        key: { clusterName },
        payload: { initialNodeList },
      });
    },

    fixAuthDone: () => {
      dispatch({
        type: "CLUSTER.FIX_AUTH.AUTH_DONE",
        key: { clusterName },
      });
    },
  };
};
