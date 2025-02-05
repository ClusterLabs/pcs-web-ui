import {testMarks} from "app/view/dataTest";
import type {Node} from "app/view/cluster/types";
import {DefaultValue} from "app/view/share";

const {watchdog, watchdogNotProvided, watchdogNotConfigured} =
  testMarks.cluster.sbd.perNode;
export const SbdOnNodesWatchdog = ({node}: {node: Node}) => {
  if (node.status === "DATA_NOT_PROVIDED") {
    return (
      <DefaultValue
        value="Node data not provided"
        {...watchdogNotProvided.mark}
      />
    );
  }
  if (node.sbd?.watchdog === undefined) {
    return (
      <DefaultValue
        value="Watchdog not configured"
        {...watchdogNotConfigured.mark}
      />
    );
  }
  return <span {...watchdog.mark}>{node.sbd?.watchdog}</span>;
};
