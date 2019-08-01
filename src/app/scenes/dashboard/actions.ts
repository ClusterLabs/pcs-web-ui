import { action } from "typesafe-actions";

import {
  REFRESH_DASHBOARD_DATA,
} from "./types";

export const refreshDashboardData = () => action(REFRESH_DASHBOARD_DATA);
