import React from "react";

import {type api, clusterStatus} from "app/backend";
import {useDispatch} from "app/view/share";

type BootstrapState =
  | {status: "loading"}
  | {
      status: "error";
      result: Exclude<
        api.ResultOf<typeof clusterStatus>,
        {type: "OK"} | {type: "UNAUTHORIZED"}
      >;
    }
  | {status: "ok"; clusterName: string};

export const useClusterNameBootstrap = (): BootstrapState => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState<BootstrapState>({
    status: "loading",
  });

  React.useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const result = await clusterStatus();

      if (cancelled) {
        return;
      }

      if (result.type === "OK") {
        setState({
          status: "ok",
          clusterName: result.payload.cluster_name,
        });
      } else if (result.type === "UNAUTHORIZED") {
        dispatch({type: "AUTH.REQUIRED"});
      } else {
        setState({
          status: "error",
          result,
        });
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  return state;
};
