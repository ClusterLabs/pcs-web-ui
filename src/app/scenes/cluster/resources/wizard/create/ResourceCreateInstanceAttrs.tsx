import React from "react";
import {
  Form,
  FormGroup,
  Text,
  TextContent,
  TextInput,
} from "@patternfly/react-core";

import { LoadedPcmkAgent, PcmkAgentAttrsHelpPopover } from "app/view";
import { types, useDispatch } from "app/store";

export const ResourceCreateInstanceAttrs: React.FC<{
  wizardState: types.wizardResourceCreate.WizardResourceCreate;
  clusterUrlName: string;
}> = ({ wizardState: { agentName }, clusterUrlName }) => {
  const dispatch = useDispatch();
  return (
    <>
      <TextContent>
        <Text component="h2">Instance attributes</Text>
      </TextContent>
      <LoadedPcmkAgent clusterUrlName={clusterUrlName} agentName={agentName}>
        {(agent: types.pcmkAgents.Agent) => (
          <Form isHorizontal>
            {agent.parameters.map(parameter => (
              <FormGroup
                key={parameter.name}
                fieldId={`instance-attr-${parameter.name}`}
                label={parameter.name}
                labelIcon={
                  <PcmkAgentAttrsHelpPopover resourceAgentParam={parameter} />
                }
              >
                <TextInput
                  type="text"
                  id={`instance-attr-${parameter.name}`}
                  onChange={value =>
                    dispatch({
                      type: "RESOURCE.PRIMITIVE.CREATE.SET_INSTANCE_ATTRIBUTE",
                      payload: {
                        name: parameter.name,
                        value,
                        clusterUrlName,
                      },
                    })
                  }
                />
              </FormGroup>
            ))}
          </Form>
        )}
      </LoadedPcmkAgent>
    </>
  );
};
