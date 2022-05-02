import React from "react";
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
  useClusterSelector,
} from "app/view/share";

import { PropertiesForm } from "./PropertiesForm";
import {
  ClusterProperties,
  useClusterProperties,
} from "./useClusterProperties";

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

export const ClusterPropertiesPage = () => {
  const { clusterProperties } = useClusterProperties();
  const [cluster] = useClusterSelector(selectors.getCluster);
  const { filterState, filterParameters } = useFilter();
  const [isEditing, setIsEditing] = React.useState(false);

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
                actions={{
                  ...(!isEditing
                    ? {
                        "Edit Properties": {
                          run: () => setIsEditing(true),
                          "data-test": "edit-cluster-properties",
                        },
                      }
                    : {}),
                }}
              />
            </StackItem>
            <StackItem>
              {clusterProperties.length > 0 && (
                <>
                  {isEditing && (
                    <PropertiesForm
                      clusterPropertiesDefinition={filterParameters(
                        clusterProperties,
                      )}
                      currentClusterProperties={cluster.clusterProperties}
                      close={() => setIsEditing(false)}
                    />
                  )}
                  {!isEditing && (
                    <AttributeList
                      attributes={filterParameters(clusterProperties)}
                    >
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
                            {...(property.name in cluster.clusterProperties
                              ? {
                                  value:
                                    cluster.clusterProperties[property.name],
                                }
                              : { defaultValue: property.default })}
                          />
                        </React.Fragment>
                      )}
                    </AttributeList>
                  )}
                </>
              )}
            </StackItem>
          </Stack>
        </CardBody>
      </Card>
    </PageSection>
  );
};
