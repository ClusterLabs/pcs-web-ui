import * as t from "io-ts";

import * as result from "./result";
import * as validate from "./validate";

type PayloadValidation<PAYLOAD, O, I> =
  | { shape: t.Type<PAYLOAD, O, I> }
  | { validate: (_payload: ReturnType<typeof JSON.parse>) => string[] };

type HttpParams = [string, string][];

type PostData =
  | { payload: Record<string, unknown> | string | [] | null }
  | { params: HttpParams };

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

const ajaxHeaders = { "X-Requested-With": "XMLHttpRequest" };

const httpGet = async (url: string, params: HttpParams) =>
  fetch(params.length > 0 ? `${url}?${httpParams(params)}` : url, {
    headers: ajaxHeaders,
  });

const httpPost = async (url: string, opts: PostData) => {
  const headers = {
    ...ajaxHeaders,
    "Content-Type": `application/${
      "params" in opts ? "x-www-form-urlencoded;charset=UTF-8" : "json"
    }`,
  };
  const body =
    "params" in opts ? httpParams(opts.params) : JSON.stringify(opts.payload);

  return fetch(url, { method: "post", headers, body });
};

function validatePayload<PAYLOAD, O, I>(
  payload: PAYLOAD,
  payloadValidation: PayloadValidation<PAYLOAD, O, I>,
): string[] {
  return "validate" in payloadValidation
    ? payloadValidation.validate(payload)
    : validate.shape(payload, payloadValidation.shape);
}

async function processHttpResponse<OUT extends Output, PAYLOAD, O, I>(
  response: Response,
  validationOpts?: ValidationOpts<OUT, PAYLOAD, O, I>,
): Promise<ApiResult<OUT, PAYLOAD>> {
  type AR = ApiResult<OUT, PAYLOAD>;
  if (response.status === 401) {
    return { type: "UNAUTHORIZED" } as AR;
  }

  const text = await response.text();

  if (!response.ok) {
    return {
      type: "BAD_HTTP_STATUS",
      status: response.status,
      statusText: response.statusText,
      text,
    } as AR;
  }

  if (validationOpts === undefined) {
    return { type: "OK", payload: text } as AR;
  }

  try {
    const payload = JSON.parse(text);
    const errors = validatePayload(
      payload,
      validationOpts as PayloadValidation<PAYLOAD, O, I>,
    );

    return errors.length > 0
      ? ({ type: "INVALID_PAYLOAD", errors, payload } as AR)
      : ({ type: "OK", payload } as AR);
  } catch (e) {
    return { type: "NOT_JSON", text } as AR;
  }
}

function getValidationOpts<OUT extends Output, PAYLOAD, O, I>(
  opts:
    | (Record<string, unknown> & ValidationOpts<OUT, PAYLOAD, O, I>)
    | Record<string, unknown>,
): ValidationOpts<OUT, PAYLOAD, O, I> {
  if ("shape" in opts) {
    return { shape: opts.shape } as ValidationOpts<OUT, PAYLOAD, O, I>;
  }
  if ("validate" in opts) {
    return { validate: opts.validate } as ValidationOpts<OUT, PAYLOAD, O, I>;
  }
  return undefined as ValidationOpts<OUT, PAYLOAD, O, I>;
}

export async function get<PAYLOAD, O, I>(
  url: string,
  opts:
    | ({ params?: HttpParams } & PayloadValidation<PAYLOAD, O, I>)
    | { params?: HttpParams } = { params: [] },
) {
  return processHttpResponse(
    await httpGet(url, opts.params || []),
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
    await httpPost(
      url,
      "params" in opts ? { params: opts.params } : { payload: opts.payload },
    ),
    getValidationOpts(opts),
  );
}
