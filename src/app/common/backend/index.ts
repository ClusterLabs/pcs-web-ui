import authGuiAgainstNodes from "./authGuiAgainstNodes";
import checkAuthAgainstNodes from "./checkAuthAgainstNodes";
import existingCluster from "./existingCluster";
import getResourceAgentMetadata from "./getResourceAgentMetadata";
import {
  ApiResponse as ApiResponseType,
  ApiResult as ApiResultType,
  authSafe,
} from "./tools";

export type ApiResponse<T> = ApiResponseType<T>;
export type ApiResult<T> = ApiResultType<T>;

export {
  authGuiAgainstNodes,
  checkAuthAgainstNodes,
  existingCluster,
  getResourceAgentMetadata,
  authSafe,
};
