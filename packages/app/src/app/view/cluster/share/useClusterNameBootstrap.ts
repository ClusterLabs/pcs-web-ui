import React from "react";

import {type api, clusterStatus} from "app/backend";

type BootstrapState =
  | {status: "loading"}
  | {
      status: "error";
      result: Exclude<api.ResultOf<typeof clusterStatus>, {type: "OK"}>;
    }
  | {status: "ok"; clusterName: string};

export const useClusterNameBootstrap = (): BootstrapState => {
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
  }, []);

  return state;
};
