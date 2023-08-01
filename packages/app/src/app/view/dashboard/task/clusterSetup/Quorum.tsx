import {Form} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {FormText, TaskLibStep} from "app/view/share";
import {FormRadios} from "app/view/share";

import {useTask} from "./useTask";

const {quorum} = testMarks.task.clusterSetup.advancedOptions;

export const Quorum = () => {
  const {
    allReports,
    updateQuorumOptions,
    state: {quorumOptions},
  } = useTask();
  return (
    <TaskLibStep title="Quorum" reports={allReports}>
      <Form {...quorum.mark}>
        <FormRadios
          id="cluster-setup-quorum-auto-tie-breaker"
          label="Auto tie breaker"
          popover={{
            header: "Enables Auto Tie Breaker (ATB) feature",
            body: (
              <>
                <p>
                  The general behaviour of votequorum allows a simultaneous node
                  failure up to 50% - 1 node, assuming each node has 1 vote.
                </p>
                <p>
                  When ATB is enabled, the cluster can suffer up to 50% of the
                  nodes failing at the same time, in a deterministic fashion.
                  The cluster partition, or the set of nodes that are still in
                  contact with the node that has the lowest nodeid will remain
                  quorate. The other nodes will be inquorate.
                </p>
              </>
            ),
            defaultValue: "off",
          }}
          options={["off", "on", "default"]}
          selected={quorumOptions.auto_tie_breaker}
          onChange={value => updateQuorumOptions({auto_tie_breaker: value})}
          {...quorum.auto_tie_breaker.mark}
        />
        <FormRadios
          id="cluster-setup-quorum-last-man-standing"
          label="Last man standing"
          popover={{
            header: "Enables Last Man Standing (LMS) feature",
            body: (
              <>
                <p>
                  The general behaviour of votequorum is to set Expected Votes
                  and Quorum at startup and use those values during the whole
                  lifetime of the cluster.
                </p>
                <p>
                  Using for example an 8 node cluster where each node has 1
                  vote, Expected Votes is set to 8 and Quorum to 5. This
                  condition allows a total failure of 3 nodes. If a 4th node
                  fails, the cluster becomes inquorate and it will stop
                  providing services.
                </p>
              </>
            ),
            defaultValue: "off",
          }}
          options={["off", "on", "default"]}
          selected={quorumOptions.last_man_standing}
          onChange={value => updateQuorumOptions({last_man_standing: value})}
          {...quorum.last_man_standing.mark}
        />
        <FormText
          label="Last man standing window"
          id="cluster-setup-quorum-last-man-standing-window"
          popover={{
            header: "Tunes Last Man Standing Window",
            body: (
              <>
                The window of time between when a node (or group of nodes die)
                and quorum is recalculated if the Last Man Standing option is
                enabled.
              </>
            ),
            defaultValue: "1000 ms",
          }}
          value={quorumOptions.last_man_standing_window || ""}
          onChange={value =>
            updateQuorumOptions({last_man_standing_window: value})
          }
          {...quorum.last_man_standing_window.mark}
        />
        <FormRadios
          id="cluster-setup-quorum-wait-for-all"
          label="Wait for all"
          popover={{
            header: "Enables Wait For All (WFA) feature",
            body: (
              <>
                <p>
                  The general behaviour of votequorum is to switch a cluster
                  from inquorate to quorate as soon as possible. For example, in
                  an 8 node cluster, where every node has 1 vote, Expected Votes
                  is set to 8 and Quorum is (50% + 1) 5. As soon as 5 (or more)
                  nodes are visible to each other, the partition of 5 (or more)
                  becomes quorate and can start operating.{" "}
                </p>
                <p>
                  When WFA is enabled, the cluster will be quorate for the first
                  time only after all nodes have been visible at least once at
                  the same time.
                </p>
                <p>
                  This feature has the advantage of avoiding some startup race
                  conditions, with the cost that all nodes need to be up at the
                  same time at least once before the cluster can operate.{" "}
                </p>
                <p>
                  A common startup race condition based on the above example is
                  that as soon as 5 nodes become quorate, with the other 3 still
                  offline, the remaining 3 nodes will be fenced.{" "}
                </p>
                <p>It is very useful when combined with Last Man Standing.</p>
              </>
            ),
            defaultValue: "off",
          }}
          options={["off", "on", "default"]}
          selected={quorumOptions.wait_for_all}
          onChange={value => updateQuorumOptions({wait_for_all: value})}
          {...quorum.wait_for_all.mark}
        />
      </Form>
    </TaskLibStep>
  );
};
