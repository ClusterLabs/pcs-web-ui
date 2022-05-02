import { Node } from "app/view/cluster/types";
import { DefaultValue } from "app/view/share";

export const SbdOnNodesWatchdog = ({ node }: { node: Node }) => {
  if (node.status === "DATA_NOT_PROVIDED") {
    return <DefaultValue value="Node data not provided" />;
  }
  if (node.sbd?.watchdog === undefined) {
    return <DefaultValue value="Watchdog not configured" />;
  }
  return <>{node.sbd?.watchdog}</>;
};
