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
  AttributeGroup,
  AttributeHelpPopover,
  AttributeList,
  AttributeName,
  AttributeValue,
  ClusterStoppedInfo,
  ToolbarFilterTextGroupPair,
  useLauncherDisableClusterNotRunning,
} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";
import {useOpenTask} from "app/view/task";

import {
  type ClusterProperties,
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

const {properties, propertiesToolbar} = testMarks.cluster;

export const ClusterPropertiesPage = () => {
  const {clusterPropertiesDefinition} = useClusterProperties();
  const {hasCibInfo, clusterProperties, clusterName} = useLoadedCluster();
  const {filterState, filterParameters} = useFilter();
  const openTask = useOpenTask();

  const launchDisable = useLauncherDisableClusterNotRunning();
  return (
    <>
      <PageSection variant="light" style={{paddingTop: "0"}} hasShadowBottom>
        <ToolbarFilterTextGroupPair
          textSearchId="cluster-properties-name"
          groupName="Importance"
          filterState={filterState}
          buttonsItems={[
            {
              name: "edit-attributes",
              run: () =>
                openTask("propertiesUpdate", {
                  type: "CLUSTER.PROPERTIES.UPDATE.INIT",
                  key: {clusterName},
                  payload: {
                    clusterName,
                    propertyMap: clusterProperties,
                  },
                }),
              launchDisable: launchDisable(
                "Cannot edit cluster properties on stopped cluster",
              ),
              ...propertiesToolbar.edit.mark,
            },
          ]}
        />
      </PageSection>
      <PageSection {...testMarks.cluster.mark}>
        <Card {...properties.mark}>
          <CardBody>
            <Stack hasGutter>
              <StackItem>
                {clusterPropertiesDefinition.length > 0 && (
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
                      attributes={filterParameters(clusterPropertiesDefinition)}
                    >
                      {property => (
                        <AttributeGroup
                          key={property.name}
                          {...properties.property.mark}
                        >
                          <AttributeName
                            name={property.readable_name}
                            {...properties.property.name.mark}
                          >
                            <AttributeHelpPopover
                              header={property.shortdesc}
                              body={property.longdesc}
                              defaultValue={property.default}
                            />
                          </AttributeName>
                          <AttributeValue
                            {...(property.name in clusterProperties
                              ? {value: clusterProperties[property.name]}
                              : {defaultValue: property.default})}
                            {...properties.property.value.mark}
                          />
                        </AttributeGroup>
                      )}
                    </AttributeList>
                  </>
                )}
              </StackItem>
            </Stack>
          </CardBody>
        </Card>
      </PageSection>
    </>
  );
};
