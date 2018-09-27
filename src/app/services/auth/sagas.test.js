import { testSaga } from "redux-saga-test-plan";

import * as api from "app/core/api";

import { getJson, stillUnauthorizedError } from "./sagas";
import * as actions from "./actions";
import * as types from "./constants";

describe("getJson", () => {
  const url = "/some/url";
  const options = {};

  it("returns success response", () => {
    const result = { some: "result" };

    testSaga(getJson, url, options).next()
      .call(api.getJson, url, options).next(result)
      .put(actions.authVerified())
      .next()
      .returns(result)
    ;
  });

  it("throws error on unexpected error", () => {
    const error = new Error("Something happens...");

    const runSaga = () => (
      testSaga(getJson, url, options).next()
        .call(api.getJson, url, options).throw(error)
    );

    expect(runSaga).toThrow(error);
  });

  it("returns success response after login", () => {
    const error = new api.ApiBadStatus(401, "Unauthorized");
    const result = { some: "result" };


    testSaga(getJson, url, options).next()
      .call(api.getJson, url, options).throw(error)
      .put(actions.authRequired())
      .next()
      .take(types.AUTH_SUCCESS)
      .next(actions.authSuccess())
      .call(api.getJson, url, options)
      .next(result)
      .put(actions.authVerified())
      .next()
      .returns(result)
    ;
  });

  it("throws error on unexpected error with second attempt", () => {
    const unauthorizedError = new api.ApiBadStatus(401, "Unauthorized");
    const error = new Error("Something happens...");

    const runSaga = () => (
      testSaga(getJson, url, options).next()
        .call(api.getJson, url, options).throw(unauthorizedError)
        .put(actions.authRequired())
        .next()
        .take(types.AUTH_SUCCESS)
        .next(actions.authSuccess())
        .call(api.getJson, url, options)
        .throw(error)
    );

    expect(runSaga).toThrow(error);
  });

  it("throws still unauthorized when second attempt fails", () => {
    const unauthorizedError = new api.ApiBadStatus(401, "Unauthorized");

    const runSaga = () => (
      testSaga(getJson, url, options).next()
        .call(api.getJson, url, options).throw(unauthorizedError)
        .put(actions.authRequired())
        .next()
        .take(types.AUTH_SUCCESS)
        .next(actions.authSuccess())
        .call(api.getJson, url, options)
        .throw(unauthorizedError)
    );

    expect(runSaga).toThrow(stillUnauthorizedError(url));
  });
});
