import { api, libCallCluster } from "app/backend";

type Response = api.PayloadOf<typeof libCallCluster>;

/* eslint-disable @typescript-eslint/no-explicit-any */
export const success = (props: { data?: any } = { data: null }): Response => ({
  status: "success",
  report_list: [],
  data: props.data,
});

export const missingKey: Response = {
  status: "input_error",
  status_msg: "Missing key cmd",
  data: null,
};

export const unknownCmd: Response = {
  status: "unknown_cmd",
  status_msg: "Unknown command 'unknown.command'",
  data: null,
};

// invalid response - does not conform library response shape
export const invalid = {
  status: "invalid status",
  report_list: ["invalid report item"],
  invalid_attribute: true,
};

export const invalidJson = (message: string): Response => ({
  status: "input_error",
  status_msg: `Unable to parse input data: ${message}`,
  data: null,
});

export const error = (
  reportList: Extract<Response, { status: "error" }>["report_list"],
): Response => ({
  status: "error",
  report_list: reportList,
  data: null,
});
