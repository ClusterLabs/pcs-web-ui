import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  PageSection,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import { selectors } from "app/store";
import { IssueList } from "app/view/common";
import { useSelectedClusterName } from "app/view/scenes/cluster";

export const ClusterDetail = () => {
  const cluster = useSelector(selectors.getCluster(useSelectedClusterName()));
  return (
    <PageSection data-test="cluster-detail">
      <Card>
        <CardHeader>
          <span>
            Cluster
            {" "}
            <strong>{cluster.name}</strong>
          </span>
        </CardHeader>
        <CardBody>
          <Stack hasGutter className="pf-u-m-md">
            <StackItem>
              <IssueList issueList={cluster.issueList} hideEmpty />
            </StackItem>
          </Stack>
        </CardBody>
      </Card>
    </PageSection>
  );
};
