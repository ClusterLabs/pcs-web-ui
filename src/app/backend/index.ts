import { failMessage, isUnauthorizedError } from "./errors";
import { getForText, postForText } from "./calls";
import {
  ApiCall as ApiCallType,
  InvalidResult as ApiInvalidResult,
  ApiResponse as ApiResponseType,
  ApiResult as ApiResultType,
} from "./tools";
import * as types from "./types";
import * as log from "./log";

export { failMessage, isUnauthorizedError, getForText, postForText };
export type ApiResponse<T> = ApiResponseType<T>;
export type ApiResult<T> = ApiResultType<T>;
export type ApiCall<T> = ApiCallType<T>;
export type InvalidResult = ApiInvalidResult;

export { types, log };
export * from "./api";
