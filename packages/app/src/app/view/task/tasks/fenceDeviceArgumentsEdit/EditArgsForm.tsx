import {Form, Stack, StackItem} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {FormText} from "app/view/share";
import {PcmkAgentAttrsToolbar} from "app/view/cluster/share";

import {useTask} from "./useTask";

const {fenceDeviceArgumentsEdit: task} = testMarks.task;

export const EditArgsForm = () => {
  const {filterState, filterParameters} = PcmkAgentAttrsToolbar.useState();
  const {
    state: {agentParameters, fenceDeviceArguments},
    update,
  } = useTask();
  return (
    <Stack>
      <StackItem>
        <PcmkAgentAttrsToolbar filterState={filterState} />
      </StackItem>
      <StackItem>
        <Form isHorizontal>
          {filterParameters(agentParameters).map(parameter => (
            <span {...task.arg.mark} key={parameter.name}>
              <FormText
                id={`arg-${parameter.name}`}
                label={<span {...task.arg.name.mark}>{parameter.name}</span>}
                popover={{
                  header: parameter.shortdesc,
                  body: parameter.longdesc,
                  defaultValue: parameter.default,
                }}
                value={fenceDeviceArguments[parameter.name] ?? ""}
                onChange={value => update(parameter.name, value)}
                {...task.arg.value.mark}
              />
            </span>
          ))}
        </Form>
      </StackItem>
    </Stack>
  );
};
