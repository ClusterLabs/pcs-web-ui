import {useDispatch} from "app/view/share";

import {LoadingDataLabel} from "./LoadingDataLabel";

export const ClusterStatusLoadingLabel = (props: {
  clusterName: string;
  when: number;
  isLoading: boolean;
}) => {
  const dispatch = useDispatch();

  return (
    <LoadingDataLabel
      onClick={() =>
        dispatch({
          type: "CLUSTER.STATUS.REFRESH",
          key: {clusterName: props.clusterName},
        })
      }
      when={props.when}
      isLoading={props.isLoading}
    />
  );
};
