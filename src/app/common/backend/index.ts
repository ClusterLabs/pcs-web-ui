import * as authGuiAgainstNodes from "./authGuiAgainstNodes";
import * as checkAuthAgainstNodes from "./checkAuthAgainstNodes";
import * as existingCluster from "./existingCluster";
import * as getResourceAgentMetadata from "./getResourceAgentMetadata";
import { ApiCallResult as ApiCallResultType } from "./tools";

export type ApiCallResult<T> = ApiCallResultType<T>;

export {
  authGuiAgainstNodes,
  checkAuthAgainstNodes,
  existingCluster,
  getResourceAgentMetadata,
};
