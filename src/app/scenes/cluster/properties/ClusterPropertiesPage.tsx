import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardBody,
  PageSection,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import { selectors } from "app/store";

import { ClusterPropertiesList } from "./ClusterPropertiesList";

export const ClusterPropertiesPage = ({
  clusterUrlName,
}: {
  clusterUrlName: string;
}) => {
  const clusterProperties = useSelector(
    selectors.getClusterProperties(clusterUrlName),
  );

  return (
    <PageSection>
      <Card>
        <CardBody>
          <Stack hasGutter>
            <StackItem>
              {clusterProperties.length > 0 && (
                <ClusterPropertiesList clusterProperties={clusterProperties} />
              )}
            </StackItem>
          </Stack>
        </CardBody>
      </Card>
    </PageSection>
  );
};
