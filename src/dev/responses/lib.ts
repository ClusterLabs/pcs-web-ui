import { api } from "app/backend";

type Response = api.types.lib.Response;

export const success: Response = {
  status: "success",
  status_msg: null,
  report_list: [],
  data: null,
};

export const missingKey: Response = {
  status: "input_error",
  status_msg: "Missing key cmd",
  report_list: [],
  data: null,
};

export const unknownCmd: Response = {
  status: "unknown_cmd",
  status_msg: "Unknown command 'unknown.command'",
  report_list: [],
  data: null,
};

export const invalid = {
  status: "invalid status",
  report_list: ["invalid report item"],
  invalid_attribute: true,
};

export const invalidJson = (message: string): Response => ({
  status: "input_error",
  status_msg: `Unable to parse input data: ${message}`,
  report_list: [],
  data: null,
});

export const error = (reportList: Response["report_list"]): Response => ({
  status: "error",
  status_msg: null,
  report_list: reportList,
  data: null,
});
