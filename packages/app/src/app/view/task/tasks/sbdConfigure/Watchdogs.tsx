import {Form} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {FormText, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

const {sbdConfigure: task} = testMarks.task;
const {perNode} = task.watchdogs;

export const Watchdogs = () => {
  const {
    updateState,
    state: {
      watchdogDict,
      libCall: {reports},
    },
  } = useTask();

  return (
    <TaskLibStep
      title="Specify watchdog devices for nodes"
      reports={reports}
      {...task.watchdogs.mark}
    >
      <Form>
        {Object.entries(watchdogDict).map(([nodeName, watchdog]) => (
          <span key={nodeName} {...perNode.mark}>
            <FormText
              id={`watchdog-${nodeName}`}
              label={
                <>
                  <span {...perNode.node.mark}>{nodeName}</span>:
                </>
              }
              value={watchdog}
              onChange={value =>
                updateState({
                  watchdogDict: {...watchdogDict, [nodeName]: value},
                })
              }
              {...perNode.value.mark}
            />
          </span>
        ))}
      </Form>
    </TaskLibStep>
  );
};
