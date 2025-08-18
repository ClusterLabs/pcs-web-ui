import type {DashboardClusterActions} from "./cluster";
import type {DashboardClusterSetupActions} from "./clusterSetup";
import type {DashboardImportExistingClusterActions} from "./importExistingCluster";

// biome-ignore format: this is better formating
export type DashboardActions = (
  & DashboardClusterActions
  & DashboardClusterSetupActions
  & DashboardImportExistingClusterActions
);
