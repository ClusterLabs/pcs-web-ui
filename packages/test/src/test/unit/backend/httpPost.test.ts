import * as t from "io-ts";
import "isomorphic-fetch";

import * as http from "app/backend/calls/tools/http";

const mockFetch = (
  specificResponseParts: {
    ok?: boolean;
    status?: number;
    statusText?: string;
    text?: string;
  } = {},
) => {
  const response = {
    ok: true,
    status: 200,
    statusText: "Ok",
    text: "default text",
    ...specificResponseParts,
  };

  return jest.spyOn(global, "fetch").mockImplementation(
    // biome-ignore lint/suspicious/noExplicitAny:
    (): Promise<any> =>
      Promise.resolve({
        ...response,
        text: () => Promise.resolve(response.text),
      }),
  );
};

describe("post", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should use entered url and payload", async () => {
    const url = "/some/url";
    const payload = "some";

    const fetchSpy = mockFetch();
    await http.post(url, {payload});
    expect(fetchSpy).toBeCalledWith(url, {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
      },
    });
  });

  it("should use entered url and params", async () => {
    const url = "/some/url";
    const params: [string, string][] = [
      ["first", "one"],
      ["second", "two"],
    ];

    const fetchSpy = mockFetch();
    await http.post(url, {params});
    expect(fetchSpy).toBeCalledWith(url, {
      method: "post",
      body: "first=one&second=two",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    });
  });

  it("should return UNAUTHORIZED on 401", async () => {
    mockFetch({
      ok: false,
      status: 401,
    });

    expect(await http.post("/some/url", {payload: "some"})).toEqual({
      type: "UNAUTHORIZED",
    });
  });

  it("should return BAD_HTTP_STATUS on non 200", async () => {
    const statusText = "Server error";
    const text = "Error text body";
    mockFetch({
      ok: false,
      status: 500,
      statusText,
      text,
    });

    expect(await http.post("/some/url", {payload: "some"})).toEqual({
      type: "BAD_HTTP_STATUS",
      status: 500,
      statusText,
      text,
    });
  });

  it("should return OK with text", async () => {
    const text = "Text output";
    mockFetch({
      text,
    });
    expect(await http.post("/some/url", {payload: "some"})).toEqual({
      type: "OK",
      payload: text,
    });
  });

  it("should return OK with object enforced by validate", async () => {
    const payload = {key: "value"};
    mockFetch({
      text: JSON.stringify(payload),
    });
    expect(
      await http.post("/some/url", {
        payload: "some",
        validate: _payload => [],
      }),
    ).toEqual({
      type: "OK",
      payload,
    });
  });

  it("should return OK with object enforced by shape", async () => {
    const payload = {key: "value"};
    mockFetch({
      text: JSON.stringify(payload),
    });
    expect(
      await http.post("/some/url", {
        payload: "some",
        shape: t.type({key: t.string}),
      }),
    ).toEqual({
      type: "OK",
      payload,
    });
  });

  it("should return INVALID_PAYLOAD because of shape check", async () => {
    const payload = {key: "value"};
    mockFetch({
      text: JSON.stringify(payload),
    });
    expect(
      await http.post("/some/url", {
        payload: "some",
        shape: t.type({name: t.string}),
      }),
    ).toEqual({
      type: "INVALID_PAYLOAD",
      errors: [
        "Invalid value undefined supplied to : { name: string }/name: string",
      ],
      payload,
    });
  });

  it("should return INVALID_PAYLOAD because of validate", async () => {
    const payload = {key: "value"};
    mockFetch({
      text: JSON.stringify(payload),
    });
    const errors = ["Some error"];
    expect(
      await http.post("/some/url", {
        payload: "some",
        validate: _payload => errors,
      }),
    ).toEqual({
      type: "INVALID_PAYLOAD",
      errors,
      payload,
    });
  });

  it("should return NOT_JSON output", async () => {
    const invalidJson = '{"name" : 1, }';
    mockFetch({
      text: invalidJson,
    });
    expect(
      await http.post("/some/url", {
        payload: "some",
        shape: t.type({name: t.string}),
      }),
    ).toEqual({
      type: "NOT_JSON",
      text: invalidJson,
    });
  });
});
