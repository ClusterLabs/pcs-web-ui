import {useTask as useTaskCommon} from "app/view/share";

export const useTask = () => {
  const task = useTaskCommon("fixAuth");
  const {dispatch, state, close} = task;
  return {
    state,

    cancel: () => {
      dispatch({
        type: "CLUSTER.FIX_AUTH.CANCEL",
        key: {clusterName: state.clusterName},
      });
      close();
    },

    fixAuthDone: () => {
      dispatch({
        type: "CLUSTER.FIX_AUTH.AUTH_DONE",
        key: {clusterName: state.clusterName},
      });
      close();
    },
  };
};
