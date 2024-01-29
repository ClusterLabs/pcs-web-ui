import React from "react";
import {
  Alert,
  Card,
  CardBody,
  PageSection,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {
  AttributeHelpPopover,
  AttributeList,
  AttributeName,
  AttributeValue,
  ClusterStoppedInfo,
  ToolbarFilterTextGroupPair,
  useLauncherDisableClusterNotRunning,
} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

import {PropertiesForm} from "./PropertiesForm";
import {ClusterProperties, useClusterProperties} from "./useClusterProperties";

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

const {properties} = testMarks.cluster;

export const ClusterPropertiesPage = () => {
  const {clusterPropertiesDefinition} = useClusterProperties();
  const {hasCibInfo, clusterProperties, clusterName} = useLoadedCluster();
  const {filterState, filterParameters} = useFilter();
  const [isEditing, setIsEditing] = React.useState(false);

  const launchDisable = useLauncherDisableClusterNotRunning();
  return (
    <PageSection {...testMarks.cluster.mark}>
      <Card {...properties.mark}>
        <CardBody>
          <Stack hasGutter>
            <StackItem>
              <ToolbarFilterTextGroupPair
                textSearchId="cluster-properties-name"
                groupName="Importance"
                filterState={filterState}
                buttonsItems={[
                  ...(!isEditing
                    ? [
                        {
                          name: "edit-attributes",
                          run: () => setIsEditing(true),
                          launchDisable: launchDisable(
                            "Cannot edit cluster properties on stopped cluster",
                          ),
                        },
                      ]
                    : []),
                ]}
              />
            </StackItem>
            <StackItem>
              {clusterPropertiesDefinition.length > 0 && (
                <>
                  {isEditing && (
                    <PropertiesForm
                      clusterPropertiesDefinition={filterParameters(
                        clusterPropertiesDefinition,
                      )}
                      currentClusterProperties={clusterProperties}
                      close={() => setIsEditing(false)}
                    />
                  )}
                  {!isEditing && (
                    <>
                      {!hasCibInfo && (
                        <Alert
                          isInline
                          variant="warning"
                          title="Cannot get cluster properties values from stopped cluster"
                          className="pf-v5-u-mb-sm"
                        >
                          <ClusterStoppedInfo
                            startButton="link"
                            clusterName={clusterName}
                          />
                        </Alert>
                      )}
                      <AttributeList
                        attributes={filterParameters(
                          clusterPropertiesDefinition,
                        )}
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
                              {...(property.name in clusterProperties
                                ? {
                                    value: clusterProperties[property.name],
                                  }
                                : {defaultValue: property.default})}
                            />
                          </React.Fragment>
                        )}
                      </AttributeList>
                    </>
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
