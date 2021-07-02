import { useSelector } from "react-redux";

import { selectors } from "app/store";
import { useDispatch } from "app/view/share/useDispatch";

import { useTaskOpenClose } from "./useTaskOpenClose";

export function useDashboardTask<
  NAME extends Parameters<typeof selectors.getDashboardTask>[0],
>(name: NAME) {
  const state = useSelector(selectors.getDashboardTask(name));
  const dispatch = useDispatch();
  const openClose = useTaskOpenClose(name);

  return {
    name,
    state,
    ...openClose,
    dispatch,
  };
}
