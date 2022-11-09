import {useSelector} from "react-redux";

import {selectors} from "app/store";
import {useDispatch} from "app/view/share/useDispatch";

import {useTaskOpenClose} from "./useTaskOpenClose";

export function useTask<NAME extends Parameters<typeof selectors.getTask>[0]>(
  name: NAME,
) {
  const state = useSelector(selectors.getTask(name));
  const dispatch = useDispatch();
  const openClose = useTaskOpenClose(name);

  return {
    name,
    state,
    ...openClose,
    dispatch,
  };
}
