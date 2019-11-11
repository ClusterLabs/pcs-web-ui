import {
  createResult,
  createResultInvalid,
  ApiCallResult as ApiCallResultType,
  ApiCall as ApiCallType,
} from "./result";

import {
  validateSameNodes,
  validateShape,
} from "./validate";
import { dealWithNoAuth } from "./dealWithNoAuth";
import { dealWithInvalidJson } from "./dealWithInvalidJson";

export type ApiCallResult<T> = ApiCallResultType<T>;
export type ApiCall<T> = ApiCallType<T>;

export {
  createResult,
  createResultInvalid,
  dealWithNoAuth,
  dealWithInvalidJson,
  validateSameNodes,
  validateShape,
};
