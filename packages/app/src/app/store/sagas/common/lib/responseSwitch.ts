import type {api, libCallCluster} from "app/backend";

type LibPayload = api.PayloadOf<typeof libCallCluster>;

type CommunicationError = Extract<
  LibPayload,
  {status: "input_error"} | {status: "exception"} | {status: "unknown_cmd"}
>;

export function isCommunicationError<
  PAYLOAD extends {status: "success" | "error"},
>(payload: CommunicationError | PAYLOAD): payload is CommunicationError {
  return ["input_error", "exception", "unknown_cmd"].includes(payload.status);
}
