import * as api from "app/common/api";
import {
  createResultInvalid,
  Invalid,
} from "./result";

export function dealWithInvalidJson<
  R,
  Fn extends(...args: any[]) => Promise<R>
>(apiCallFn: Fn) {
  const decorated = async (...args: Parameters<Fn>): Promise<R|Invalid> => {
    try {
      return await apiCallFn(...args);
    } catch (e) {
      if (e instanceof api.error.ApiNotExpectedJson) {
        return createResultInvalid(
          e.text,
          ["Response is not in expected json format"],
        );
      }
      throw e;
    }
  };
  return decorated;
}
