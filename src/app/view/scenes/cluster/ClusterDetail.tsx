import React from "react";
import { useSelector } from "react-redux";
import {
  PageSection,
  Card,
  CardBody,
  CardHeader,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import { selectors } from "app/store";
import { StatusSign, IssueList } from "app/view/common";

const ClusterDetail = () => {
  const cluster = useSelector(selectors.getCluster);
  return (
    <PageSection>
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
              <IssueList issueList={cluster.issueList} />
            </StackItem>
          </Stack>
        </CardBody>
      </Card>
    </PageSection>
  );
};

export default ClusterDetail;
