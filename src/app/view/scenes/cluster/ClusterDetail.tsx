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
import { IssueList, StatusSign } from "app/view/common";
import { useSelectedCluster } from "app/view/scenes/cluster";

export const ClusterDetail = () => {
  const cluster = useSelector(selectors.getCluster(useSelectedCluster()));
  return (
    <PageSection data-test="cluster-detail">
      <Card>
        <CardHeader>
          {"Cluster "}
          <strong>{cluster.name}</strong>
        </CardHeader>
        <CardBody>
          <Stack gutter="md" className="pf-u-m-md">
            <StackItem>
              <span>
                {"Status "}
                <StatusSign
                  status={cluster.statusSeverity}
                  label={<strong>{cluster.status}</strong>}
                />
              </span>
            </StackItem>
            <StackItem>
              <IssueList issueList={cluster.issueList} hideEmpty />
            </StackItem>
          </Stack>
        </CardBody>
      </Card>
    </PageSection>
  );
};
