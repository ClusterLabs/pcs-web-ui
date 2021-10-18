import * as t from "io-ts";

const report_list = t.array(
  t.type({
    severity: t.type({
      level: t.keyof({
        ERROR: null,
        WARNING: null,
        INFO: null,
        DEBUG: null,
        DEPRECATION: null,
      }),
      force_code: t.union([t.string, t.null]),
    }),
    message: t.type({
      code: t.string,
      message: t.string,
      payload: t.type({}),
    }),
    context: t.union([t.type({ node: t.string }), t.null]),
  }),
);

export const shape = <DATA extends t.Any>(data: DATA) =>
  t.intersection([
    t.union([
      t.type({
        status: t.literal("success"),
        data,
      }),
      t.type({
        status: t.literal("error"),
        data: t.union([data, t.null]),
      }),
      t.type({
        status: t.keyof({
          exception: null,
          input_error: null,
          unknown_cmd: null,
        }),
        data: t.null,
      }),
    ]),
    t.type({
      report_list,
      status_msg: t.union([t.string, t.null]),
    }),
  ]);
