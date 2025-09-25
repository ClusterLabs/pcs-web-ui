import {Alert, Divider, Form, Stack, StackItem} from "@patternfly/react-core";
import {useTask, type ClusterProperties} from "./useTask";
import {PropertyFormField} from "./PropertyFormField";
import {ToolbarFilterTextGroupPair} from "app/view/share";

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

export const Properties = () => {
  const {
    clusterPropertiesDefinition,
    state: {showValidationErrors},
    hasChanges,
  } = useTask();
  const {filterState, filterParameters} = useFilter();
  return (
    <Stack hasGutter>
      <StackItem>
        <ToolbarFilterTextGroupPair
          textSearchId="cluster-properties-name"
          groupName="Importance"
          filterState={filterState}
        />
        <Divider />
      </StackItem>
      {showValidationErrors && !hasChanges && (
        <Alert
          variant="danger"
          isInline
          title={"No changes! Please edit any cluster property."}
        />
      )}

      <StackItem>
        <Form isHorizontal>
          {filterParameters(clusterPropertiesDefinition).map(property => (
            <span key={property.name}>
              <PropertyFormField property={property} />
            </span>
          ))}
        </Form>
      </StackItem>
    </Stack>
  );
};
