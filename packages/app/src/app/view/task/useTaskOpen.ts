import {Action, selectors} from "app/store";
import {useDispatch} from "app/view/share/useDispatch";

export const useOpenTask = () => {
  const dispatch = useDispatch();

  return (
    taskKey: Parameters<typeof selectors.getTask>[0],
    initAction?: Action,
  ) => {
    dispatch({
      type: "TASK.OPEN",
      payload: {taskKey},
    });
    if (initAction) {
      dispatch(initAction);
    }
  };
};
