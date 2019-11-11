import * as api from "app/common/api";
import { createResultInvalid, ApiCall } from "./result";

export function dealWithInvalidJson<R, F extends ApiCall<R>>(
  fn: F,
): ApiCall<R, Parameters<F>> {
  return async (...args: Parameters<F>) => {
    try {
      return await fn(...args);
    } catch (e) {
      if (e ! instanceof api.error.ApiNotExpectedJson) {
        throw e;
      }
      return createResultInvalid(
        e.text,
        ["Response is not in expected json format"],
      );
    }
  };
}
