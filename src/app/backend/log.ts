import * as apiResult from "./apiResult";
import { libCallCluster } from "./calls";
import { PayloadOf } from "./call";
/* eslint-disable no-console */

const libInputErrorStatusMsgMap = {
  input_error: "Backend cannot read the request",
  exception: "Exception during processing request on backend",
  unknown_cmd: "Backend does not recognize command",
};
export const libInputError = (
  status: keyof typeof libInputErrorStatusMsgMap,
  statusMessage: PayloadOf<typeof libCallCluster>["status_msg"],
  description: string,
) => {
  console.error(
    `${description}:\n`,
    `${libInputErrorStatusMsgMap[status]}:\n`,
    statusMessage,
  );
};

export const errorMessage = (
  result: apiResult.HttpFail | apiResult.NotJson,
  taskLabel: string,
) => {
  const description = `Communication error while: ${taskLabel}`;
  switch (result.type) {
    case "BAD_HTTP_STATUS":
      return (
        `${description}:\n`
        + `Server returned http status: ${result.status} (${result.text})`
      );

    case "NOT_JSON":
      return (
        `${description}:\n`
        + `Data returned from server is not in JSON format: '${result.text}'`
      );

    case "UNAUTHORIZED":
      return `${description}:\nServer returned http status: 401 (Unauthorized)`;

    default: {
      const { type } = result;
      const _exhaustiveCheck: never = type;
      throw new Error(`Unexpected result type: "${_exhaustiveCheck}"`);
    }
  }
};

export const error = (
  result: apiResult.HttpFail | apiResult.NotJson | apiResult.InvalidPayload,
  taskLabel: string,
) => {
  const description = `Communication error while: ${taskLabel}`;
  switch (result.type) {
    case "INVALID_PAYLOAD":
      console.group(`%c${description}\n`, "background: #fff0f0 ;color: red");
      console.error("Invalid response from the backend:", result.payload);
      console.group(
        "%cValidation errors follows:",
        "background: #fff0f0 ;color: red",
      );
      result.errors.forEach(e => console.error(e));
      console.groupEnd();
      console.groupEnd();
      break;
    case "BAD_HTTP_STATUS":
    case "NOT_JSON":
    case "UNAUTHORIZED":
      console.error(errorMessage(result, taskLabel));
      break;
    default: {
      const { type } = result;
      const _exhaustiveCheck: never = type;
      throw new Error(`Unexpected result type: "${_exhaustiveCheck}"`);
    }
  }
};

export const stillUnauthorized = () =>
  console.error("Still got unauthorized after successfull authorization.");
