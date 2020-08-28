import { useDispatch } from "app/store";
import { useSelectedClusterName } from "app/view";

export const useTryNext = () => {
  const clusterUrlName = useSelectedClusterName();
  const dispatch = useDispatch();
  return (isValid: boolean, next: () => void) => {
    if (isValid) {
      dispatch({
        type: "RESOURCE.PRIMITIVE.CREATE.VALIDATION.HIDE",
        payload: { clusterUrlName },
      });
      next();
    } else {
      dispatch({
        type: "RESOURCE.PRIMITIVE.CREATE.VALIDATION.SHOW",
        payload: { clusterUrlName },
      });
    }
  };
};
