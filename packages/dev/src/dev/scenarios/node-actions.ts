import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";

shortcut.nodeActionsRelated();
shortcut.clusterStatus(response.clusterStatus.actions);
shortcut.clusterRelated();
