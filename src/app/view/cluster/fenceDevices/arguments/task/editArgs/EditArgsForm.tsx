import {Form, Stack, StackItem} from "@patternfly/react-core";

import {FormText, PcmkAgentAttrsToolbar} from "app/view/share";

import {useTask} from "./useTask";

export const EditArgsForm = () => {
  const {filterState, filterParameters} = PcmkAgentAttrsToolbar.useState();
  const {
    state: {agentParameters, fenceDeviceArguments},
    update,
  } = useTask();
  return (
    <Stack>
      <StackItem>
        <PcmkAgentAttrsToolbar
          toolbarName="fence-device-args"
          filterState={filterState}
        />
      </StackItem>
      <StackItem>
        <Form isHorizontal>
          {filterParameters(agentParameters).map(parameter => (
            <FormText
              key={parameter.name}
              id={`arg-${parameter.name}`}
              label={parameter.name}
              popover={{
                header: parameter.shortdesc,
                body: parameter.longdesc,
                defaultValue: parameter.default,
              }}
              value={fenceDeviceArguments[parameter.name] ?? ""}
              onChange={value => update(parameter.name, value)}
              data-test={`fence-device-arg-${parameter.name}`}
            />
          ))}
        </Form>
      </StackItem>
    </Stack>
  );
};
