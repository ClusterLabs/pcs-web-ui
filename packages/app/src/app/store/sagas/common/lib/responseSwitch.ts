const commandRejectedStatuses = [
  "input_error",
  "exception",
  "unknown_cmd",
  "not_authorized",
  "permission_denied",
] as const;

type CommandRejectedStatus = (typeof commandRejectedStatuses)[number];

export function isCommandRejected<PAYLOAD extends {status: string}>(
  payload: PAYLOAD,
): payload is PAYLOAD & {status: CommandRejectedStatus} {
  return (commandRejectedStatuses as readonly string[]).includes(
    payload.status,
  );
}
