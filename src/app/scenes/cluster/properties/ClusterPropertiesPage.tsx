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
import { ClusterPropertiesToolbar } from "./ClusterPropertiesToolbar";

export const ClusterPropertiesPage = ({
  clusterUrlName,
}: {
  clusterUrlName: string;
}) => {
  const clusterProperties = useSelector(
    selectors.getClusterProperties(clusterUrlName),
  );
  const { filterState, filterParameters } = ClusterPropertiesToolbar.useState();

  return (
    <PageSection>
      <Card>
        <CardBody>
          <Stack hasGutter>
            <StackItem>
              <ClusterPropertiesToolbar filterState={filterState} />
            </StackItem>
            <StackItem>
              {clusterProperties.length > 0 && (
                <ClusterPropertiesList
                  clusterProperties={filterParameters(clusterProperties)}
                />
              )}
            </StackItem>
          </Stack>
        </CardBody>
      </Card>
    </PageSection>
  );
};
