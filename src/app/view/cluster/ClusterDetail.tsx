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
import { useClusterSelector } from "app/view/share";

import { ClusterIssueList } from "./issues";

export const ClusterDetail = () => {
  const [cluster] = useClusterSelector(selectors.getCluster);
  return (
    <PageSection data-test="cluster-detail">
      <Card>
        <CardHeader>
          <span>
            Cluster <strong>{cluster.name}</strong>
          </span>
        </CardHeader>
        <CardBody>
          <Stack hasGutter className="pf-u-m-md">
            <StackItem>
              <ClusterIssueList issueList={cluster.issueList} />
            </StackItem>
          </Stack>
        </CardBody>
      </Card>
    </PageSection>
  );
};
