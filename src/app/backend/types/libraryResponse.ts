import * as t from "io-ts";

const ReportBase = t.type({
  severity: t.keyof({
    ERROR: null,
    WARNING: null,
    INFO: null,
    DEBUG: null,
  }),
  report_text: t.string,
  forceable: t.union([t.null, t.string]),
});

const TApiReportAny = t.intersection([
  ReportBase,
  t.type({
    code: t.string,
    info: t.type({}),
  }),
]);

export const TApiReport = TApiReportAny;

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
