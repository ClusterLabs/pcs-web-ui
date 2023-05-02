import {Form} from "@patternfly/react-core";

import {FormText, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

export const Watchdogs = () => {
  const {
    updateState,
    state: {
      watchdogDict,
      libCall: {reports},
    },
  } = useTask();

  return (
    <TaskLibStep title="Specify watchdog devices for nodes" reports={reports}>
      <Form data-test="form-watchdogs">
        {Object.entries(watchdogDict).map(([nodeName, watchdog]) => (
          <FormText
            key={nodeName}
            id={`watchdog-${nodeName}`}
            data-test={`watchdog-${nodeName}`}
            label={`${nodeName} :`}
            value={watchdog}
            onChange={value =>
              updateState({
                watchdogDict: {...watchdogDict, [nodeName]: value},
              })
            }
          />
        ))}
      </Form>
    </TaskLibStep>
  );
};
