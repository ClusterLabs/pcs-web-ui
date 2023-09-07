import {DashboardClusterActions} from "./cluster";
import {DashboardClusterSetupActions} from "./clusterSetup";
import {DashboardImportExistingClusterActions} from "./importExistingCluster";

// prettier-ignore
export type DashboardActions = (
  & DashboardClusterActions
  & DashboardClusterSetupActions
  & DashboardImportExistingClusterActions
);
