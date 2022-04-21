import { Form } from "@patternfly/react-core";

import { selectors } from "app/store";
import { FormText, TaskLibStep, useClusterSelector } from "app/view/share";

import { useTask } from "./useTask";

export const Watchdogs: React.FC = () => {
  const {
    updateState,
    state: {
      watchdogDict,
      libCall: { reports },
    },
  } = useTask();

  const [cluster] = useClusterSelector(selectors.getCluster);
  let watchdog: string;
  return (
    <TaskLibStep title="Specify watchdog devices for nodes" reports={reports}>
      <Form data-test="form-watchdogs">
        {cluster.nodeList.map(
          (node, i) =>
            node.status !== "DATA_NOT_PROVIDED" && (
              <FormText
                key={i}
                id={`watchdog-${i}`}
                data-test={`watchdog-${i}`}
                label={`${node.name} :`}
                value={watchdog}
                onChange={(value) => {
                  value.length > 0
                    ? (watchdogDict[node.name] = value)
                    : delete watchdogDict[node.name];
                  updateState({ watchdogDict: watchdogDict });
                }}
                placeholder={watchdogDict[node.name]}
              />
            ),
        )}
      </Form>
    </TaskLibStep>
  );
};
