export type HttpFail =
  | {type: "UNAUTHORIZED"}
  | {
      type: "BAD_HTTP_STATUS";
      status: number;
      statusText: string;
      text: string;
    };
export type NotJson = {type: "NOT_JSON"; text: string};

export type Ok<PAYLOAD> = {
  type: "OK";
  payload: PAYLOAD;
};

export type InvalidPayload = {
  type: "INVALID_PAYLOAD";
  errors: string[];
  payload: unknown;
};

// Wrapping any naked type parameters in a 1-tuple to avoid distribution of
// conditional types over union types. See
// https://github.com/microsoft/TypeScript/issues/29368#issuecomment-453529532
// The issue was with CallForShape (where typeof shape is PAYLOAD) - when shape
// was an union (A|B) I got OK<A>|OK<B> instead of expected OK<A|B>.
export type Overall<PAYLOAD> = [PAYLOAD] extends [string]
  ? Ok<string> | HttpFail
  : Ok<PAYLOAD> | InvalidPayload | HttpFail | NotJson;
