import * as React from "react";
import {StackItem} from "@patternfly/react-core";

import {
  EmptyStateClusterStopped,
  EmptyStateNoItem,
  Table,
} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share/LoadedClusterContext";

import {NVPairListContextProvider} from "./NVPairListContext";

type ContextProps = React.ComponentProps<
  typeof NVPairListContextProvider
>["value"];

export const NVPairListPage = ({
  nvPairList,
  owner,
  toolbar,
  listItem,
  beforeList,
}: {
  nvPairList: ContextProps["nvPairList"];
  owner: ContextProps["owner"];
  toolbar: React.ReactNode;
  listItem: (nvPair: ContextProps["nvPairList"][number]) => React.ReactNode;
  beforeList?: React.ReactNode;
}) => {
  const {hasCibInfo, clusterName} = useLoadedCluster();
  return (
    <NVPairListContextProvider value={{nvPairList, owner}}>
      <StackItem>{toolbar}</StackItem>

      {beforeList && <StackItem>{beforeList}</StackItem>}

      <StackItem>
        {!hasCibInfo && (
          <EmptyStateClusterStopped
            title={"Cannot get attributes from stopped cluster"}
            clusterName={clusterName}
          />
        )}

        {hasCibInfo && nvPairList.length === 0 && (
          <EmptyStateNoItem
            title="No attribute here."
            message="No attribute has been added."
          />
        )}

        {hasCibInfo && nvPairList.length > 0 && (
          <Table>
            <Table.Body>
              {nvPairList.map(nvPair => listItem(nvPair))}
            </Table.Body>
          </Table>
        )}
      </StackItem>
    </NVPairListContextProvider>
  );
};
