import React from "react";
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

export const NVPairListPage = (props: {
  nvPairList: ContextProps["nvPairList"];
  owner: ContextProps["owner"];
  toolbar: React.ReactNode;
  listItem: (nvPair: ContextProps["nvPairList"][number]) => React.ReactNode;
  "data-test": string;
  beforeList?: React.ReactNode;
}) => {
  const {hasCibInfo, clusterName} = useLoadedCluster();
  return (
    <NVPairListContextProvider
      value={{nvPairList: props.nvPairList, owner: props.owner}}
    >
      <StackItem>{props.toolbar}</StackItem>

      {props.beforeList && <StackItem>{props.beforeList}</StackItem>}

      <StackItem>
        {!hasCibInfo && (
          <EmptyStateClusterStopped
            title={"Cannot get attributes from stopped cluster"}
            clusterName={clusterName}
          />
        )}

        {hasCibInfo && props.nvPairList.length === 0 && (
          <EmptyStateNoItem
            title="No attribute here."
            message="No attribute has been added."
          />
        )}

        {hasCibInfo && props.nvPairList.length > 0 && (
          <Table>
            <Table.Body>
              {props.nvPairList.map((nvPair, i) => (
                <React.Fragment key={i}>
                  {props.listItem(nvPair)}
                </React.Fragment>
              ))}
            </Table.Body>
          </Table>
        )}
      </StackItem>
    </NVPairListContextProvider>
  );
};
