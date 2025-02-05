import deepmerge from "deepmerge";

import type {api, libCallCluster} from "app/backend";

type Response = api.PayloadOf<typeof libCallCluster>;
type Report = Response["report_list"][number];
type PartialReport = {
  [KEY in keyof Report]?: Partial<Report[KEY]>;
};

// biome-ignore lint/suspicious/noExplicitAny:
export const success = (props: {data?: any} = {data: null}): Response => ({
  status: "success",
  report_list: [],
  data: props.data,
  status_msg: null,
});

export const missingKey: Response = {
  status: "input_error",
  report_list: [],
  status_msg: "Missing key cmd",
  data: null,
};

export const unknownCmd: Response = {
  status: "unknown_cmd",
  report_list: [],
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
  report_list: [],
  status_msg: `Unable to parse input data: ${message}`,
  data: null,
});

export const error = (reportList: Response["report_list"]): Response => ({
  status: "error",
  report_list: reportList,
  data: null,
  status_msg: null,
});

const errorReport = (partialReport: PartialReport = {}): Report =>
  deepmerge<Report>(
    {
      severity: {
        level: "ERROR",
        force_code: null,
      },
      message: {
        message: "Something wrong happened",
        code: "SOME_CODE",
        payload: {},
      },
      context: null,
    },
    partialReport as Partial<Report>,
  );

export const report = {
  error: errorReport,
};
