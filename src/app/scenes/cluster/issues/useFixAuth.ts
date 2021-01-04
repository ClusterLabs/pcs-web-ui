import { selectors, useDispatch } from "app/store";
import { useClusterSelector } from "app/view/useClusterSelector";

export const useFixAuth = () => {
  const dispatch = useDispatch();
  const [state, clusterUrlName] = useClusterSelector(selectors.getFixAuth);
  return {
    state,
    dispatch,
    clusterUrlName,
  };
};
