import React from "react";

import {ClusterStoppedInfo} from "app/view/share/ClusterStoppedInfo";
import {useLoadedCluster} from "app/view/cluster/share";

export const useLauncherDisableClusterNotRunning = () => {
  const {hasCibInfo, clusterName} = useLoadedCluster();
  return React.useCallback(
    (title: string) => ({
      isDisabled: !hasCibInfo,
      title,
      message: (
        <ClusterStoppedInfo startButton="link" clusterName={clusterName} />
      ),
    }),
    [hasCibInfo, clusterName],
  );
};
