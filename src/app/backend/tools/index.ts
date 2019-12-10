import {
  createResult,
  createResultInvalid,
  ApiCall as ApiCallType,
  ApiResponse as ApiResponseType,
  ApiResult as ApiResultType,
} from "./result";

import {
  validateSameNodes,
  validateShape,
} from "./validate";
import { dealWithInvalidJson } from "./dealWithInvalidJson";

export type ApiCall<T> = ApiCallType<T>;
export type ApiResponse<T> = ApiResponseType<T>;
export type ApiResult<T> = ApiResultType<T>;

export {
  createResult,
  createResultInvalid,
  dealWithInvalidJson,
  validateSameNodes,
  validateShape,
};
