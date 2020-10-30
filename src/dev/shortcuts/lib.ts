import { Response } from "express";

import { api } from "app/backend";

import * as response from "dev/responses";

const getLibResponses = (res: Response): Record<string, () => void> => ({
  fail: () => {
    res.status(500).send("SOMETHING WRONG");
  },
  invalid: () => {
    res.json(response.lib.invalid);
  },
  "invalid-json": () => {
    try {
      JSON.parse("{");
    } catch (e) {
      res.json(response.lib.invalidJson(e.message));
    }
  },
  "missing-key": () => {
    res.json(response.lib.missingKey);
  },
  "unknown-cmd": () => {
    res.json(response.lib.unknownCmd);
  },
  error: () => {
    res.json(
      response.lib.error([
        {
          severity: { level: "ERROR", force_code: null },
          message: {
            code: "DEFAULT_ERROR",
            message: "Default error from devel server",
            payload: { error: "default" },
          },
          context: null,
        },
        {
          severity: { level: "ERROR", force_code: null },
          message: {
            code: "ANOTHER_DEFAULT_ERROR",
            message: "Another Default error from devel server",
            payload: { error: "another default" },
          },
          context: null,
        },
      ]),
    );
  },
  success: () => {
    res.json(response.lib.success);
  },
  ok: () => {
    res.json(response.lib.success);
  },
});

export const libStd = ({
  code,
  res,
  errors = {},
}: {
  code: string;
  res: Response;
  errors?: Record<string, api.types.lib.Response["report_list"]>;
}) => {
  if (code in errors) {
    res.json(response.lib.error(errors[code]));
    return;
  }
  const stdResponses = getLibResponses(res);
  if (code in stdResponses) {
    stdResponses[code]();
    return;
  }
  stdResponses.success();
};
