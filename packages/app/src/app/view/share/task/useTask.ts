import {useSelector} from "react-redux";

import {selectors} from "app/store";
import {useDispatch} from "app/view/share/useDispatch";

export function useTask<NAME extends Parameters<typeof selectors.getTask>[0]>(
  name: NAME,
) {
  const state = useSelector(selectors.getTask(name));
  const dispatch = useDispatch();
  const currentTaskKey = useSelector(selectors.getCurrentTaskKey);

  return {
    name,
    state,
    open: () =>
      dispatch({
        type: "TASK.OPEN",
        payload: {taskKey: name},
      }),
    close: () =>
      dispatch({
        type: "TASK.CLOSE",
      }),
    isOpened: currentTaskKey === name,
    dispatch,
  };
}
