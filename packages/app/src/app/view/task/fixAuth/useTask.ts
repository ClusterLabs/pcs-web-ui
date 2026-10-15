import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("fixAuth");
  const {dispatch, state, close} = task;
  return {
    state,

    cancel: () => {
      dispatch({type: "CLUSTER.FIX_AUTH.CANCEL"});
      close();
    },

    fixAuthDone: () => {
      dispatch({type: "CLUSTER.FIX_AUTH.AUTH_DONE"});
      close();
    },
  };
};
