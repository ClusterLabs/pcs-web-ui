import { selectors } from "app/store";
import { ReviewList, ReviewValue, TaskLibStep, useClusterSelector } from "app/view/share";

import { useTask } from "./useTask";

export const Review: React.FC = () => {
    const {
      state: {
        watchdogDict, 
        delayStart,
        startmode,
        watchdogTimeout,
        libCall: {reports},
      },
    } = useTask();

    const [cluster] = useClusterSelector(selectors.getCluster);

    return (
      <TaskLibStep title="Review settings" reports={reports}>
        <ReviewList>
          <ReviewValue
            label="sbd watchdogs"
            value={
              cluster.nodeList.length === 0 ? (
                <>No wotchdogs</>
              ) : (
                cluster.nodeList.map((node, i) => node.status !== "DATA_NOT_PROVIDED" && (
                  <div key={i}>{`${node.name}: ${watchdogDict[node.name]}`}</div>
              )))
            }
          />

          <ReviewValue label="sbd_delay_start" value={delayStart === "DEFAULT" ? "no" : delayStart} />
          <ReviewValue label="sbd_startmode" value={startmode === "DEFAULT" ? "always" : startmode} />
          <ReviewValue label="sbd_watchdog _timeout" value={watchdogTimeout} />
        </ReviewList>
      </TaskLibStep>
    );
};
