import * as t from "io-ts";

const ReportSeverity = t.type({
  level: t.keyof({
    ERROR: null,
    WARNING: null,
    INFO: null,
    DEBUG: null,
  }),
  force_code: t.union([t.string, t.null]),
});

const ReportMessage = t.type({
  code: t.string,
  message: t.string,
  payload: t.type({}),
});

const ReportContext = t.type({
  node: t.string,
});

export const TApiReport = t.type({
  severity: ReportSeverity,
  message: ReportMessage,
  context: t.union([ReportContext, t.null]),
});

export const TApiResponse = t.type({
  status: t.keyof({
    success: null,
    error: null,
    exception: null,
    input_error: null,
    unknown_cmd: null,
  }),
  status_msg: t.union([t.string, t.null]),
  report_list: t.array(TApiReport),
  data: t.any,
});

export type ApiResponse = t.TypeOf<typeof TApiResponse>;
export type ApiReport = t.TypeOf<typeof TApiReport>;
