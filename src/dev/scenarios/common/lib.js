import * as responses from "dev/api/responses/all";

const getResponses = res => ({
  fail: () => {
    res.status(500).send("SOMETHING WRONG");
  },
  invalid: () => {
    res.json(responses.lib.invalid);
  },
  "invalid-json": () => {
    try {
      JSON.parse("{");
    } catch (e) {
      res.json(responses.lib.invalidJson(e.message));
    }
  },
  "missing-key": () => {
    res.json(responses.lib.missingKey);
  },
  "unknown-cmd": () => {
    res.json(responses.lib.unknownCmd);
  },
  error: () => {
    res.json(
      responses.lib.error([
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
    res.json(responses.lib.success);
  },
});

export const standardResponses = ({ code, res, errors = {} }) => {
  if (code in errors) {
    res.json(responses.lib.error(errors[code]));
    return;
  }
  const stdResponses = getResponses(res);
  if (code in stdResponses) {
    stdResponses[code]();
    return;
  }
  stdResponses.success();
};
