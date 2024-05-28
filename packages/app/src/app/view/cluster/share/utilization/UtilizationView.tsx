import * as React from "react";
import {Alert, AlertActionLink, AlertGroup} from "@patternfly/react-core";

import {location, useLocation} from "app/view/share";
import {NVPairListPage} from "app/view/cluster/share/nvpair";
import {useLoadedCluster} from "app/view/cluster/share/LoadedClusterContext";

type PageProps = React.ComponentProps<typeof NVPairListPage>;

export const UtilizationView = (props: {
  owner: PageProps["owner"];
  nvPairList: PageProps["nvPairList"];
  toolbar: React.ReactNode;
  listItem: PageProps["listItem"];
  "data-test": string;
}) => {
  const {hasCibInfo, clusterProperties, clusterName} = useLoadedCluster();
  const {navigate} = useLocation();
  return (
    <NVPairListPage
      nvPairList={props.nvPairList}
      owner={props.owner}
      toolbar={props.toolbar}
      beforeList={
        <AlertGroup>
          {hasCibInfo
            && (
              clusterProperties["placement-strategy"] ?? "default"
            ).toLowerCase() === "default" && (
              <Alert
                isInline
                title="Utilization attributes have no effect"
                variant="warning"
              >
                <p>
                  Utilization attributes have no effect because the cluster
                  property placement-strategy is
                  {clusterProperties["placement-strategy"]
                    ? " set to value default. "
                    : " not set. "}
                  Set the cluster property placement-strategy to an appropriate
                  value (utilization, balanced, minimal) for the utilization to
                  take effect.
                </p>
                <AlertActionLink
                  onClick={() => navigate(location.properties({clusterName}))}
                >
                  Go to properties section
                </AlertActionLink>
              </Alert>
            )}
          <Alert isInline title="Utilization attributes" variant="info">
            <p>
              To configure the capacity that a node provides or a resource
              requires, you can use utilization attributes in node and resource
              objects. A node is considered eligible for a resource if it has
              sufficient free capacity to satisfy the resource’s requirements
            </p>
          </Alert>
        </AlertGroup>
      }
      listItem={props.listItem}
      data-test={props["data-test"]}
    />
  );
};
