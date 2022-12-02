import {ActionPayload} from "app/store";
import {
  EmptyStateClusterStopped,
  EmptyStateNoItem,
} from "app/view/share/emptyState";
import {useLoadedCluster} from "app/view/cluster/share";
import {NVPair} from "app/view/cluster/types";

import {NVPairList} from "./NVPairList";

export const NVPairListView = ({
  nvPairList,
  owner,
}: {
  nvPairList: NVPair[];
  owner: ActionPayload["CLUSTER.NVPAIRS.EDIT"]["owner"];
}) => {
  const {hasCibInfo, clusterName} = useLoadedCluster();

  if (!hasCibInfo) {
    return (
      <EmptyStateClusterStopped
        title={"Cannot get attributes from stopped cluster"}
        clusterName={clusterName}
      />
    );
  }

  if (nvPairList.length === 0) {
    return (
      <EmptyStateNoItem
        title="No attribute here."
        message="No attribute has been added."
      />
    );
  }

  return <NVPairList nvPairList={nvPairList} owner={owner} />;
};
