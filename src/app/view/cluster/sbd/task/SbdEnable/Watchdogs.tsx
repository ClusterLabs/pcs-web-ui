import { Form } from "@patternfly/react-core";

import { selectors } from "app/store";
import { FormText, TaskLibStep, useClusterSelector } from "app/view/share";

import { useTask } from "./useTask";

export const Watchdogs: React.FC = () => {
  const {
    updateState,
    state: { 
      defaultWatchdog,
      watchdogDict,
      libCall: { reports },
    },
  } = useTask();

  const [cluster] = useClusterSelector(selectors.getCluster);
  let watchdog: string;
  return (
    <TaskLibStep title="Specify watchdog devices for nodes" reports={reports}>
      <Form data-test="form-watchdogs">
        
        {cluster.nodeList.map((node, i) => node.status !== "DATA_NOT_PROVIDED" && (
          watchdogDict[node.name] === undefined
            && (watchdogDict[node.name] = defaultWatchdog),
          <FormText
            key={i}
            id={`watchdog-${i}`}
            label={`${node.name} :`}
            value={watchdog}
            onChange={(value) => {
              watchdogDict[node.name] = value;
              updateState({ watchdogDict: watchdogDict });
            }}
            placeholder={defaultWatchdog}
          />
        ))}
      </Form>
    </TaskLibStep>
  );
};
