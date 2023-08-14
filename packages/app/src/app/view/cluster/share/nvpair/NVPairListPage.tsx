import * as React from "react";
import {StackItem} from "@patternfly/react-core";

import {EmptyStateClusterStopped} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share/LoadedClusterContext";
import {NVPair} from "app/view/cluster/types";

import {NVPairList} from "./NVPairList";

export const NVPairListPage = ({
  nvPairList,
  toolbar,
  beforeList,
  itemMenu,
}: {
  nvPairList: NVPair[];
  toolbar: React.ReactNode;
  beforeList?: React.ReactNode;
  itemMenu: React.ComponentProps<typeof NVPairList>["itemMenu"];
}) => {
  const {hasCibInfo, clusterName} = useLoadedCluster();
  return (
    <>
      <StackItem>{toolbar}</StackItem>

      {beforeList && <StackItem>{beforeList}</StackItem>}

      <StackItem>
        {!hasCibInfo && (
          <EmptyStateClusterStopped
            title={"Cannot get attributes from stopped cluster"}
            clusterName={clusterName}
          />
        )}
        {hasCibInfo && (
          <NVPairList nvPairList={nvPairList} itemMenu={itemMenu} />
        )}
      </StackItem>
    </>
  );
};
