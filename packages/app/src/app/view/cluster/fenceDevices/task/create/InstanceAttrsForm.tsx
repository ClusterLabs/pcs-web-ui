import React from "react";
import {Alert, Form} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {
  FormText,
  TaskLibStep,
  ToolbarFilterTextGroupPair,
} from "app/view/share";
import {LoadedPcmkAgent} from "app/view/cluster/share";

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

const {attr} = testMarks.createFenceDevice.instanceAttrs;

export const InstanceAttrsForm = () => {
  const {
    state: {
      agentName,
      instanceAttrs,
      showValidationErrors,
      libCall: {reports},
    },
    updateState,
  } = useTask();
  const {filterState, filterParameters} = useFilterState();
  return (
    <TaskLibStep
      title={`Instance attributes (${agentName})`}
      reports={reports}
      {...testMarks.createFenceDevice.instanceAttrs.mark}
    >
      <LoadedPcmkAgent agentName={agentName}>
        {agent => {
          const nonDeprecatedParameters = agent.parameters.filter(
            p => !("deprecated" in p && p.deprecated),
          );
          const requiredParameters = nonDeprecatedParameters.filter(
            p => p.required,
          );
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
                  .concat(filterParameters(nonDeprecatedParameters))
                  .map(parameter => {
                    const hint =
                      "Please provide a value for required attribute";
                    return (
                      <div key={parameter.name} {...attr.mark}>
                        <FormText
                          id={`instance-attr-${parameter.name}`}
                          label={
                            <span {...attr.name.mark}>{parameter.name}</span>
                          }
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
                          {...attr.value.mark}
                        />
                      </div>
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
