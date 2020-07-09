import { failMessage, isUnauthorizedError } from "./errors";
import { getForText, postForText } from "./calls";

import { authGuiAgainstNodes } from "./api/authGuiAgainstNodes";
import { checkAuthAgainstNodes } from "./api/checkAuthAgainstNodes";
import { existingCluster } from "./api/existingCluster";
import { clusterStatus } from "./api/clusterStatus";
import { importedClusterList } from "./api/importedClusterList";
import { getResourceAgentMetadata } from "./api/getResourceAgentMetadata";
import { getFenceAgentMetadata } from "./api/getFenceAgentMetadata";
import { updateResource } from "./api/updateResource";
import { clusterProperties } from "./api/clusterProperties";
import {
  ApiCall as ApiCallType,
  ApiResponse as ApiResponseType,
  ApiResult as ApiResultType,
} from "./tools";

export type ApiResponse<T> = ApiResponseType<T>;
export type ApiResult<T> = ApiResultType<T>;
export type ApiCall<T> = ApiCallType<T>;

export {
  failMessage,
  isUnauthorizedError,
  getForText,
  postForText,
  authGuiAgainstNodes,
  checkAuthAgainstNodes,
  existingCluster,
  getResourceAgentMetadata,
  getFenceAgentMetadata,
  clusterStatus,
  importedClusterList,
  updateResource,
  clusterProperties,
};
