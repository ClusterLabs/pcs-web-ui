const communicationErrorStatuses = [
  "input_error",
  "exception",
  "unknown_cmd",
  "not_authorized",
] as const;

type CommunicationErrorStatus = (typeof communicationErrorStatuses)[number];

export function isCommunicationError<PAYLOAD extends {status: string}>(
  payload: PAYLOAD,
): payload is PAYLOAD & {status: CommunicationErrorStatus} {
  return (communicationErrorStatuses as readonly string[]).includes(
    payload.status,
  );
}
