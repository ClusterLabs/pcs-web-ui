import {api, libCallCluster} from "app/backend";

/* eslint-disable no-console */

type LibPayload = api.PayloadOf<typeof libCallCluster>;
type CommunicationError = Extract<
  LibPayload,
  {status: "input_error"} | {status: "exception"} | {status: "unknown_cmd"}
>;

const libInputErrorStatusMsgMap: Record<CommunicationError["status"], string> =
  {
    input_error: "Backend cannot read the request",
    exception: "Exception during processing request on backend",
    unknown_cmd: "Backend does not recognize command",
  };

export const libInputError = (
  status: CommunicationError["status"],
  statusMessage: CommunicationError["status_msg"],
  taskLabel: string,
) => {
  console.error(
    `Communication error while: ${taskLabel}:\n`,
    `${libInputErrorStatusMsgMap[status]}:\n`,
    statusMessage,
  );
};

export const errorMessage = (
  result: api.result.HttpFail | api.result.NotJson,
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

    case "BACKEND_NOT_FOUND":
      return `${description}:\nBackend server not found`;

    case "NON_HTTP_PROBLEM":
      return `${description}:\nNon http problem: ${result.problem}`;

    default: {
      const {type} = result;
      const _exhaustiveCheck: never = type;
      throw new Error(`Unexpected result type: "${_exhaustiveCheck}"`);
    }
  }
};

export const error = (
  result: api.result.HttpFail | api.result.NotJson | api.result.InvalidPayload,
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
    case "BACKEND_NOT_FOUND":
    case "NON_HTTP_PROBLEM":
    case "NOT_JSON":
    case "UNAUTHORIZED":
      console.error(errorMessage(result, taskLabel));
      break;

    default: {
      const {type} = result;
      const _exhaustiveCheck: never = type;
      throw new Error(`Unexpected result type: "${_exhaustiveCheck}"`);
    }
  }
};

export const stillUnauthorized = () =>
  console.error("Still got unauthorized after successful authorization.");
