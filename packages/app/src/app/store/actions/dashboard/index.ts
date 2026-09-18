import type {DashboardClusterActions} from "./cluster";
import type {DashboardClusterSetupActions} from "./clusterSetup";

// biome-ignore format: this is better formating
export type DashboardActions = (
  & DashboardClusterActions
  & DashboardClusterSetupActions
);
