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
import {
  AttributeHelpPopover,
  AttributeList,
  AttributeName,
  AttributeValue,
  ToolbarFilterTextGroupPair,
} from "app/view/share";

const { getClusterProperties } = selectors;

type ClusterProperties = selectors.ExtractClusterSelector<
  typeof getClusterProperties
>;

const useFilter = (): {
  filterState: ReturnType<
    typeof ToolbarFilterTextGroupPair.useState
  >["filterState"];
  filterParameters: (_parameters: ClusterProperties) => ClusterProperties;
} =>
  ToolbarFilterTextGroupPair.useState(
    {
      Advanced: false,
      Basic: true,
    },
    p => ({
      Advanced: p.advanced,
      Basic: !p.advanced,
    }),
    p => p.readable_name,
  );

export const ClusterPropertiesPage: React.FC<{ clusterName: string }> = ({
  clusterName,
}) => {
  const clusterProperties = useSelector(getClusterProperties(clusterName));
  const { filterState, filterParameters } = useFilter();

  return (
    <PageSection>
      <Card>
        <CardBody>
          <Stack hasGutter>
            <StackItem>
              <ToolbarFilterTextGroupPair
                textSearchId="cluster-properties-name"
                groupName="Importance"
                filterState={filterState}
              />
            </StackItem>
            <StackItem>
              {clusterProperties.length > 0 && (
                <AttributeList attributes={filterParameters(clusterProperties)}>
                  {property => (
                    <React.Fragment key={property.name}>
                      <AttributeName name={property.readable_name}>
                        <AttributeHelpPopover
                          header={property.shortdesc}
                          body={property.longdesc}
                          defaultValue={property.default}
                        />
                      </AttributeName>
                      <AttributeValue
                        value={property.value}
                        defaultValue={property.default}
                      />
                    </React.Fragment>
                  )}
                </AttributeList>
              )}
            </StackItem>
          </Stack>
        </CardBody>
      </Card>
    </PageSection>
  );
};
