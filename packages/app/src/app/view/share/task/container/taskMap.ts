import React from "react";

import {selectors} from "app/store";
import * as task from "app/view/dashboard/task";

type TaskNames = Parameters<typeof selectors.getTask>[0];

export const taskMap = {
  clusterSetup: task.clusterSetup.ClusterSetup,
  clusterStop: task.clusterStop.Task,
  importExistingCluster: task.importExistingCluster.ImportExistingCluster,
  // forceableConfirm: ,
} satisfies Record<
  Exclude<TaskNames, "forceableConfirm">,
  React.FunctionComponent
>;
