import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  PageSection,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import { selectors } from "app/store";
import { IssueList, useClusterSelector } from "app/view";

export const ClusterDetail = () => {
  const [cluster] = useClusterSelector(selectors.getCluster);
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
