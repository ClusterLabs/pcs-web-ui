import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";

shortcut.dashboard([
  response.clusterStatus.ok,
  response.clusterStatus.error,
  response.clusterStatus.big,
  response.clusterStatus.ok2,
  response.clusterStatus.empty,
  response.clusterStatus.resourceTree,
]);
