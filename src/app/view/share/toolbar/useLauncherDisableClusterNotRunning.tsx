import React from "react";

import { selectors } from "app/store";
import { ClusterStoppedInfo } from "app/view/share/ClusterStoppedInfo";
import { useClusterSelector } from "app/view/share/useClusterSelector";

export const useLauncherDisableClusterNotRunning = () => {
  const [cluster] = useClusterSelector(selectors.getCluster);
  return React.useCallback(
    (title: string) => ({
      isDisabled: !cluster.hasCibInfo,
      title,
      message: <ClusterStoppedInfo startButton="link" />,
    }),
    [cluster],
  );
};
