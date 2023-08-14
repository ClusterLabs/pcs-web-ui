import {EmptyStateClusterStopped, EmptyStateNoItem} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share/LoadedClusterContext";
import {NVPair} from "app/view/cluster/types";

import {NVPairList} from "./NVPairList";

export const NVPairListView = ({
  nvPairList,
  itemMenu,
}: {
  nvPairList: NVPair[];
  itemMenu: React.ComponentProps<typeof NVPairList>["itemMenu"];
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

  return <NVPairList nvPairList={nvPairList} itemMenu={itemMenu} />;
};
