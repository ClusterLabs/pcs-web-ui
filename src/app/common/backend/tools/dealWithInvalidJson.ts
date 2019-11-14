import * as api from "app/common/api";
import { createResultInvalid } from "./result";

export const dealWithInvalidJson = (e: Error) => {
  if (e instanceof api.error.ApiNotExpectedJson) {
    return createResultInvalid(
      e.text,
      ["Response is not in expected json format"],
    );
  }
  throw e;
};
