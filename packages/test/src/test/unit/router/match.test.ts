import {match} from "app/view/share/router/match";

describe("Router match", () => {
  it("should return null on different lengths", async () => {
    expect(match("/some/path", "/:whatever")).toBeNull();
  });

  it("should return match object on matching simple parts", async () => {
    expect(match("/some/path", "/some/path")).toEqual({
      params: {},
      matched: "/some/path",
    });
  });

  it("should return null on non-matching elements", async () => {
    expect(match("/some/path", "/some/route")).toBeNull();
  });

  it("should return match object on matching simple parts", async () => {
    expect(match("/some/path", "/some/:name")).toEqual({
      params: {name: "path"},
      matched: "/some/path",
    });
  });

  it("should deal with trailing slashes", async () => {
    expect(match("/some/path", "/some/:name/*")).toEqual({
      params: {name: "path"},
      matched: "/some/path",
    });
  });

  it("should return null when path is longer than pattern", async () => {
    expect(match("/some/path/to/somewhere", "/some/:name")).toBeNull();
  });

  it("should return match object for longer path if pattern ends with *", async () => {
    expect(match("/some/path/to/somewhere", "/some/:name/*")).toEqual({
      params: {name: "path"},
      matched: "/some/path",
    });
  });

  it("should return match object for longer pattern", async () => {
    expect(
      match(
        "/some/path/to/somewhere/over/the/rainbow",
        "/some/:name/to/:destination/*",
      ),
    ).toEqual({
      params: {name: "path", destination: "somewhere"},
      matched: "/some/path/to/somewhere",
    });
  });

  it("should not match parameter when path is root", async () => {
    expect(match("/", "/:name")).toBeNull();
  });

  it("should match special cases for root", async () => {
    expect(match("/", "/")).toEqual({
      params: {},
      matched: "/",
    });
    expect(match("/", "/*")).toEqual({
      params: {},
      matched: "/",
    });
  });
});
