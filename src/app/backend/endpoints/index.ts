import {
  Commands,
  libCluster,
  pcmkAgentDescribeAgent,
  pcmkAgentListAgents,
} from "./lib/cluster";
import { clusterSetup } from "./lib";
import { authGuiAgainstNodes } from "./authGuiAgainstNodes";
import { canAddClusterOrNodes } from "./canAddClusterOrNodes";
import { checkAuthAgainstNodes } from "./checkAuthAgainstNodes";
import { clusterProperties } from "./clusterProperties";
import { updateClusterSettings } from "./updateClusterSettings";
import { clusterStart } from "./clusterStart";
import { clusterStatus } from "./clusterStatus";
import { clusterStop } from "./clusterStop";
import { existingCluster } from "./existingCluster";
import { fixAuthOfCluster } from "./fixAuthOfCluster";
import { importedClusterList } from "./importedClusterList";
import { login } from "./login";
import { logout } from "./logout";
import { rememberCluster } from "./rememberCluster";
import { removeCluster } from "./removeCluster";
import { removeResource } from "./removeResource";
import { resourceClone } from "./resourceClone";
import { resourceCleanup } from "./resourceCleanup";
import { resourceRefresh } from "./resourceRefresh";
import { resourceUnclone } from "./resourceUnclone";
import { resourceChangeGroup } from "./resourceChangeGroup";
import { sendKnownHosts } from "./sendKnownHosts";
import { sendKnownHostsToNode } from "./sendKnownHostsToNode";
import { updateResource } from "./updateResource";
import { addConstraintRemote } from "./addConstraintRemote";
import { removeConstraintRemote } from "./removeConstraintRemote";
import { removeConstraintRuleRemote } from "./removeConstraintRuleRemote";
import { addConstraintRuleRemote } from "./addConstraintRuleRemote";

const endpoints = {
  addConstraintRemote,
  removeConstraintRemote,
  removeConstraintRuleRemote,
  addConstraintRuleRemote,
  authGuiAgainstNodes,
  canAddClusterOrNodes,
  checkAuthAgainstNodes,
  clusterProperties,
  updateClusterSettings,
  resourceChangeGroup,
  clusterSetup,
  clusterStart,
  clusterStatus,
  clusterStop,
  existingCluster,
  fixAuthOfCluster,
  importedClusterList,
  libCluster,
  libClusterResourceAgentListAgents: pcmkAgentListAgents("resource"),
  libClusterStonithAgentListAgents: pcmkAgentListAgents("fence"),
  libClusterResourceAgentDescribeAgent: pcmkAgentDescribeAgent("resource"),
  libClusterStonithAgentDescribeAgent: pcmkAgentDescribeAgent("fence"),
  login,
  logout,
  rememberCluster,
  removeCluster,
  removeResource,
  resourceCleanup,
  resourceClone,
  resourceRefresh,
  resourceUnclone,
  sendKnownHosts,
  sendKnownHostsToNode,
  updateResource,
};

export type LibClusterCommands = Commands;

export { endpoints };
