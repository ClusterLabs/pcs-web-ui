import { ApiNotExpectedJson } from "app/backend";
import { createResultInvalid } from "./result";

export const dealWithInvalidJson = (e: Error) => {
  if (e instanceof ApiNotExpectedJson) {
    return createResultInvalid(
      e.text,
      ["Response is not in expected json format"],
    );
  }
  throw e;
};
