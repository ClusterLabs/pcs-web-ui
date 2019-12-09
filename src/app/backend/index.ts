import {
  failMessage,
  isUnauthorizedError,
  ApiNotExpectedJson,
} from "./errors";
import {
  getForText,
  getJson,
  postForText,
  postForJson,
} from "./calls";

import authGuiAgainstNodes from "./authGuiAgainstNodes";
import checkAuthAgainstNodes from "./checkAuthAgainstNodes";
import existingCluster from "./existingCluster";
import clusterStatus from "./clusterStatus";
import clustersOverview from "./clustersOverview";
import getResourceAgentMetadata from "./getResourceAgentMetadata";
import {
  ApiResponse as ApiResponseType,
  ApiResult as ApiResultType,
  ApiCall,
} from "./tools";

export type ApiResponse<T> = ApiResponseType<T>;
export type ApiResult<T> = ApiResultType<T>;
export type ApiCall<T> = ApiCall<T>;


export {
  failMessage,
  ApiNotExpectedJson,
  isUnauthorizedError,
  getForText,
  getJson,
  postForText,
  postForJson,

  authGuiAgainstNodes,
  checkAuthAgainstNodes,
  existingCluster,
  getResourceAgentMetadata,
  clusterStatus,
  clustersOverview,
};
