import {useDispatch} from "app/view/share";

import {LoadingDataLabel} from "./LoadingDataLabel";

export const ClusterStatusLoadingLabel = (props: {
  when: number;
  isLoading: boolean;
}) => {
  const dispatch = useDispatch();

  return (
    <LoadingDataLabel
      onClick={() => dispatch({type: "CLUSTER.STATUS.REFRESH"})}
      when={props.when}
      isLoading={props.isLoading}
    />
  );
};
