import React from "react";
import { Alert, Form, FormGroup, TextInput } from "@patternfly/react-core";

import {
  LoadedPcmkAgent,
  PcmkAgentAttrsHelpPopover,
  ToolbarFilterTextGroupPair,
  WizardLibStep,
} from "app/view";
import { types } from "app/store";

import { useWizard } from "../useWizard";

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

export const ResourceCreateInstanceAttrsForm: React.FC = () => {
  const {
    wizardState: { agentName, instanceAttrs, showValidationErrors },
    clusterUrlName,
    dispatch,
  } = useWizard();
  const { filterState, filterParameters } = useState({
    Optional: false,
    Advanced: false,
  });
  return (
    <WizardLibStep title="Instance attributes">
      <LoadedPcmkAgent clusterUrlName={clusterUrlName} agentName={agentName}>
        {(agent: types.pcmkAgents.Agent) => {
          const requiredParameters = agent.parameters.filter(p => p.required);
          return (
            <>
              {requiredParameters.length === 0 && (
                <Alert
                  variant="info"
                  isInline
                  title={
                    "No instance attribute is required."
                    + " Other available attributes can be added."
                  }
                />
              )}
              <ToolbarFilterTextGroupPair
                textSearchId="agent-attributes-name"
                groupName="More attributes"
                filterState={filterState}
              />
              <Form isHorizontal>
                {requiredParameters
                  .concat(filterParameters(agent.parameters))
                  .map((parameter) => {
                    const validated =
                      parameter.required
                      && showValidationErrors
                      && (!(parameter.name in instanceAttrs)
                        || instanceAttrs[parameter.name].length === 0)
                        ? "error"
                        : "default";
                    return (
                      <FormGroup
                        key={parameter.name}
                        fieldId={`instance-attr-${parameter.name}`}
                        label={parameter.name}
                        labelIcon={
                          <PcmkAgentAttrsHelpPopover
                            resourceAgentParam={parameter}
                          />
                        }
                        isRequired={parameter.required}
                        validated={validated}
                        helperTextInvalid={`Please provide a value for required attribute ${parameter.name}`}
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
                          validated={validated}
                          value={instanceAttrs[parameter.name] || ""}
                        />
                      </FormGroup>
                    );
                  })}
              </Form>
            </>
          );
        }}
      </LoadedPcmkAgent>
    </WizardLibStep>
  );
};
