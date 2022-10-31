import {ActionPayload, selectors} from "app/store";
import {useClusterSelector} from "app/view/share/useClusterSelector";
import {
  EmptyStateClusterStopped,
  EmptyStateNoItem,
} from "app/view/share/emptyState";
import {NVPair} from "app/view/cluster/types";

import {NVPairList} from "./NVPairList";

export const NVPairListView = ({
  nvPairList,
  owner,
}: {
  nvPairList: NVPair[];
  owner: ActionPayload["CLUSTER.NVPAIRS.EDIT"]["owner"];
}) => {
  const [cluster] = useClusterSelector(selectors.getCluster);

  if (!cluster.hasCibInfo) {
    return (
      <EmptyStateClusterStopped
        title={"Cannot get attributes from stopped cluster"}
        clusterName={cluster.name}
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
