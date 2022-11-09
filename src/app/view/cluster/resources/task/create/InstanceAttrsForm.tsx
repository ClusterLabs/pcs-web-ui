import React from "react";
import {Alert, Form} from "@patternfly/react-core";

import {
  FormText,
  LoadedPcmkAgent,
  TaskLibStep,
  ToolbarFilterTextGroupPair,
} from "app/view/share";

import {useTask} from "./useTask";

type AgentParameter = Parameters<
  React.ComponentProps<typeof LoadedPcmkAgent>["children"]
>[0]["parameters"][number];

const useFilterState = () =>
  ToolbarFilterTextGroupPair.useState<"Optional" | "Advanced", AgentParameter>(
    {
      Optional: false,
      Advanced: false,
    },
    p => ({
      Advanced: p.advanced,
      Optional: !p.required && !p.advanced,
    }),
    p => p.name,
    "all-off-display-none",
  );

export const InstanceAttrsForm = () => {
  const {
    state: {
      agentName,
      instanceAttrs,
      showValidationErrors,
      libCall: {reports},
    },
    clusterName,
    updateState,
  } = useTask();
  const {filterState, filterParameters} = useFilterState();
  return (
    <TaskLibStep title={`Instance attributes (${agentName})`} reports={reports}>
      <LoadedPcmkAgent clusterName={clusterName} agentName={agentName}>
        {agent => {
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
                toolbarName="instance-attributes"
              />
              <Form isHorizontal>
                {requiredParameters
                  .concat(filterParameters(agent.parameters))
                  .map(parameter => {
                    const hint =
                      "Please provide a value for required attribute";
                    return (
                      <FormText
                        key={parameter.name}
                        id={`instance-attr-${parameter.name}`}
                        label={parameter.name}
                        popover={{
                          header: parameter.shortdesc,
                          body: parameter.longdesc,
                          defaultValue: parameter.default,
                        }}
                        isRequired={parameter.required}
                        showValidationErrors={showValidationErrors}
                        isValid={
                          !parameter.required
                          || (parameter.name in instanceAttrs
                            && instanceAttrs[parameter.name].length > 0)
                        }
                        helperTextInvalid={`${hint} ${parameter.name}`}
                        onChange={value =>
                          updateState({
                            instanceAttrs: {[parameter.name]: value},
                          })
                        }
                        value={instanceAttrs[parameter.name] || ""}
                        data-test={`attr ${parameter.name}`}
                      />
                    );
                  })}
              </Form>
            </>
          );
        }}
      </LoadedPcmkAgent>
    </TaskLibStep>
  );
};
