import {app, type Response, type Request} from "dev/app";
import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";

const noCluster = (_req: Request, res: Response) =>
  res.status(400).send(response.noCluster.message);

app.clusterStatus(noCluster);
app.libClusterResourceAgentListAgents(noCluster);
app.libClusterStonithAgentListAgents(noCluster);
app.getClusterPropertiesDefinition(noCluster);
app.getPermissions(noCluster);

shortcut.getSetupClusterRelated();
