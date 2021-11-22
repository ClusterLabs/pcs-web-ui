import { DashboardClusterActions } from "./cluster";
import { DashboardClusterSetupActions } from "./clusterSetup";

// prettier-ignore
export type DashboardActions = (
  & DashboardClusterActions
  & DashboardClusterSetupActions
);
