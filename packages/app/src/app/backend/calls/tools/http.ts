import * as t from "io-ts";

import * as result from "./result";
import * as validate from "./validate";

const request = (
  path: string,
  headers: Record<string, string> = {},
  postBody?: string,
) =>
  pcsUiEnvAdapter.request(
    path,
    {"X-Requested-With": "XMLHttpRequest", ...headers}, // added ajax header
    postBody,
  );

type PayloadValidation<PAYLOAD, O, I> =
  | {shape: t.Type<PAYLOAD, O, I>}
  | {validate: (_payload: ReturnType<typeof JSON.parse>) => string[]};

type HttpParams = [string, string][];

type PostData =
  | {payload: Record<string, unknown> | string | [] | null}
  | {params: HttpParams};

type Output = "TEXT" | "PAYLOAD";

type ValidationOpts<OUT extends Output, PAYLOAD, O, I> = [OUT] extends ["TEXT"]
  ? undefined
  : [OUT] extends ["PAYLOAD"]
  ? PayloadValidation<PAYLOAD, O, I>
  : never;

type ApiResult<OUT extends Output, PAYLOAD = string> = [OUT] extends ["TEXT"]
  ? result.Overall<string>
  : [OUT] extends ["PAYLOAD"]
  ? result.Overall<PAYLOAD>
  : never;

const httpParams = (params: HttpParams): string =>
  params
    .map(p => `${encodeURIComponent(p[0])}=${encodeURIComponent(p[1])}`)
    .join("&");

function validatePayload<PAYLOAD, O, I>(
  payload: PAYLOAD,
  payloadValidation: PayloadValidation<PAYLOAD, O, I>,
): string[] {
  return "validate" in payloadValidation
    ? payloadValidation.validate(payload)
    : validate.shape(payload, payloadValidation.shape);
}

async function processHttpResponse<OUT extends Output, PAYLOAD, O, I>(
  response: ReturnType<typeof request> extends Promise<infer U> ? U : never,
  validationOpts?: ValidationOpts<OUT, PAYLOAD, O, I>,
): Promise<ApiResult<OUT, PAYLOAD>> {
  type AR = ApiResult<OUT, PAYLOAD>;

  if ("type" in response) {
    switch (response.type) {
      case "BACKEND_NOT_FOUND":
        return {type: "BACKEND_NOT_FOUND"} as AR;
      case "NON_HTTP_PROBLEM":
        return {type: "NON_HTTP_PROBLEM", problem: response.problem} as AR;
      default: {
        const {type} = response;
        const _exhaustiveCheck: never = type;
        throw new Error(`Unexpected response type: "${_exhaustiveCheck}"`);
      }
    }
  }

  if (response.status === 401) {
    return {type: "UNAUTHORIZED"} as AR;
  }

  const text = response.text;

  if (response.status < 200 || response.status > 299) {
    return {
      type: "BAD_HTTP_STATUS",
      status: response.status,
      statusText: response.statusText,
      text,
    } as AR;
  }

  if (validationOpts === undefined) {
    return {type: "OK", payload: text} as AR;
  }

  try {
    const payload = JSON.parse(text);
    const errors = validatePayload(
      payload,
      validationOpts as PayloadValidation<PAYLOAD, O, I>,
    );

    return errors.length > 0
      ? ({type: "INVALID_PAYLOAD", errors, payload} as AR)
      : ({type: "OK", payload} as AR);
  } catch (e) {
    return {type: "NOT_JSON", text} as AR;
  }
}

function getValidationOpts<OUT extends Output, PAYLOAD, O, I>(
  opts:
    | (Record<string, unknown> & ValidationOpts<OUT, PAYLOAD, O, I>)
    | Record<string, unknown>,
): ValidationOpts<OUT, PAYLOAD, O, I> {
  if ("shape" in opts) {
    return {shape: opts.shape} as ValidationOpts<OUT, PAYLOAD, O, I>;
  }
  if ("validate" in opts) {
    return {validate: opts.validate} as ValidationOpts<OUT, PAYLOAD, O, I>;
  }
  return undefined as ValidationOpts<OUT, PAYLOAD, O, I>;
}

export async function get<PAYLOAD, O, I>(
  url: string,
  opts:
    | ({params?: HttpParams} & PayloadValidation<PAYLOAD, O, I>)
    | {params?: HttpParams} = {params: []},
) {
  return processHttpResponse(
    await request(
      opts.params && opts.params.length > 0
        ? `${url}?${httpParams(opts.params)}`
        : url,
    ),
    getValidationOpts(opts),
  );
}

export async function post<PAYLOAD, O, I>(
  url: string,
  opts: (PostData & PayloadValidation<PAYLOAD, O, I>) | PostData = {
    params: [],
  },
) {
  return processHttpResponse(
    "params" in opts
      ? await request(
          url,
          {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
          httpParams(opts.params),
        )
      : await request(
          url,
          {"Content-Type": "application/json"},
          JSON.stringify(opts.payload),
        ),
    getValidationOpts(opts),
  );
}
