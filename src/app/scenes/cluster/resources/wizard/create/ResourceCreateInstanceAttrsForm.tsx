import React from "react";
import {
  Form,
  FormGroup,
  Text,
  TextContent,
  TextInput,
} from "@patternfly/react-core";

import {
  LoadedPcmkAgent,
  PcmkAgentAttrsHelpPopover,
  ToolbarFilterTextGroupPair,
} from "app/view";
import { types, useDispatch } from "app/store";

type AgentParameter = types.pcmkAgents.AgentParameter;

const useState = (
  initialGroupInclustionMap: {
    Optional: boolean;
    Advanced: boolean;
  } = {
    Optional: true,
    Advanced: false,
  },
): {
  filterState: ReturnType<
    typeof ToolbarFilterTextGroupPair.useState
  >["filterState"];
  filterParameters: (parameters: AgentParameter[]) => AgentParameter[];
} =>
  ToolbarFilterTextGroupPair.useState(
    initialGroupInclustionMap,
    p => ({
      Advanced: p.advanced,
      Optional: !p.required && !p.advanced,
    }),
    p => p.name,
    "all-off-display-none",
  );

export const ResourceCreateInstanceAttrsForm: React.FC<{
  wizardState: types.wizardResourceCreate.WizardResourceCreate;
  clusterUrlName: string;
}> = ({ wizardState: { agentName, instanceAttrs }, clusterUrlName }) => {
  const dispatch = useDispatch();
  const { filterState, filterParameters } = useState({
    Optional: false,
    Advanced: false,
  });
  return (
    <>
      <TextContent>
        <Text component="h2">Instance attributes</Text>
      </TextContent>
      <ToolbarFilterTextGroupPair
        textSearchId="agent-attributes-name"
        groupName="More attributes"
        filterState={filterState}
      />
      <LoadedPcmkAgent clusterUrlName={clusterUrlName} agentName={agentName}>
        {(agent: types.pcmkAgents.Agent) => (
          <Form isHorizontal>
            {agent.parameters
              .filter(p => p.required)
              .concat(filterParameters(agent.parameters))
              .map(parameter => (
                <FormGroup
                  key={parameter.name}
                  fieldId={`instance-attr-${parameter.name}`}
                  label={parameter.name}
                  labelIcon={
                    <PcmkAgentAttrsHelpPopover resourceAgentParam={parameter} />
                  }
                  isRequired={parameter.required}
                >
                  <TextInput
                    type="text"
                    id={`instance-attr-${parameter.name}`}
                    isRequired={parameter.required}
                    onChange={value =>
                      dispatch({
                        type:
                          "RESOURCE.PRIMITIVE.CREATE.SET_INSTANCE_ATTRIBUTE",
                        payload: {
                          name: parameter.name,
                          value,
                          clusterUrlName,
                        },
                      })
                    }
                    value={instanceAttrs[parameter.name] || ""}
                  />
                </FormGroup>
              ))}
          </Form>
        )}
      </LoadedPcmkAgent>
    </>
  );
};
