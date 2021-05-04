import React from "react";
import { Alert, Form } from "@patternfly/react-core";

import {
  FormText,
  LoadedPcmkAgent,
  TaskLibStep,
  ToolbarFilterTextGroupPair,
} from "app/view/share";

import { useTask } from "./useTask";

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

export const InstanceAttrsForm: React.FC = () => {
  const {
    state: { agentName, instanceAttrs, showValidationErrors, reports },
    clusterName,
    updateState,
  } = useTask();
  const { filterState, filterParameters } = useFilterState();
  return (
    <TaskLibStep title={`Instance attributes (${agentName})`} reports={reports}>
      <LoadedPcmkAgent clusterName={clusterName} agentName={agentName}>
        {(agent) => {
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
                        validated={validated}
                        helperTextInvalid={`${hint} ${parameter.name}`}
                        onChange={value =>
                          updateState({
                            instanceAttrs: { [parameter.name]: value },
                          })
                        }
                        value={instanceAttrs[parameter.name] || ""}
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
