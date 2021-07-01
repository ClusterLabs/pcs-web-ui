import { selectors } from "app/store";
import { useDispatch } from "app/view/share/useDispatch";
import { useClusterSelector } from "app/view/share/useClusterSelector";

import { useTaskOpenClose } from "./useTaskOpenClose";

export function useClusterTask<
  NAME extends Parameters<typeof selectors.getTask>[0],
>(name: NAME) {
  const [state, clusterName] = useClusterSelector(selectors.getTask(name));
  const dispatch = useDispatch();
  const openClose = useTaskOpenClose(name);

  return {
    name,
    state,
    ...openClose,
    clusterName,
    dispatch,
  };
}
