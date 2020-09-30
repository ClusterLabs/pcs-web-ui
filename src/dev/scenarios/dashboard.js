import * as responses from "dev/api/responses/all";

import { clusterScenario } from "./common/scenarios";

export const displayMulti = clusterScenario({
  ok: responses.clusterStatus.ok,
  error: responses.clusterStatus.error,
  big: responses.clusterStatus.big,
  ok2: responses.clusterStatus.ok2,
  empty: responses.clusterStatus.empty,
  resourceTree: responses.clusterStatus.resourceTree,
});
