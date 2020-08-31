import { InvalidResult } from "./tools";
import { libraryResponse } from "./types";
/* eslint-disable no-console */

export const invalidResponse = (result: InvalidResult, description: string) => {
  console.group(`%c${description}\n`, "background: #fff0f0 ;color: red");
  console.error("Invalid response from the backend:", result.raw);
  console.group(
    "%cValidation errors follows:",
    "background: #fff0f0 ;color: red",
  );
  result.errors.forEach(e => console.error(e));
  console.groupEnd();
  console.groupEnd();
};

const libInputErrorStatusMsgMap = {
  input_error: "Backend cannot read the request",
  exception: "Exception during processing request on backend",
  unknown_cmd: "Backend does not recognize command",
};
export const libInputError = (
  status: keyof typeof libInputErrorStatusMsgMap,
  statusMessage: libraryResponse.ApiResponse["status_msg"],
  description: string,
) => {
  console.error(
    `${description}:\n`,
    `${libInputErrorStatusMsgMap[status]}:\n`,
    statusMessage,
  );
};

export const error = (err: Error, description: string) => {
  console.error(`${description}:\n`, err.message);
};
