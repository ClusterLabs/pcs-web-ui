import * as playwright from "playwright";
import { ParsedQuery, parse, parseUrl } from "query-string";

type RequestData = {
  body?: ParsedQuery | null;
  query?: ParsedQuery | null;
};
type Handler = (route: playwright.Route, request: playwright.Request) => void;
type RouteUrl = string | RegExp;
export type Route = { url: RouteUrl } & RequestData &
  (
    | { handler: Handler }
    | { text: string }
    | { json: ReturnType<typeof JSON.parse> }
    | { status: [number, string] | number }
  );

const isAppLoadingUrl = (url: string) =>
  /\/images\/favicon\.png/.exec(url)
  || (/\/ui\//.exec(url) && !/\/ui\/(login|logout)/.exec(url));

const isRegExp = (candidate: unknown): candidate is RegExp =>
  candidate instanceof RegExp
  || Object.prototype.toString.call(candidate) === "[object RegExp]";

const urlMatch = (routeUrl: RouteUrl, realUrl: string) => {
  if (isRegExp(routeUrl)) {
    return routeUrl.test(realUrl);
  }
  return realUrl.endsWith(routeUrl);
};

const handle = (
  route: playwright.Route,
  request: playwright.Request,
  match: Route,
) => {
  if ("handler" in match) {
    return match.handler(route, request);
  }
  if ("json" in match) {
    return route.fulfill({
      status: 200,
      body: JSON.stringify(match.json),
    });
  }
  if ("text" in match) {
    return route.fulfill({
      status: 200,
      body: match.text,
    });
  }
  let status = 0;
  let body = "";
  if (Array.isArray(match.status)) {
    [status, body] = match.status;
  } else {
    status = match.status;
  }
  return route.fulfill({ status, body });
};

let requestChecks: {
  url: string;
  real: RequestData;
  expected: RequestData;
}[] = [];

let unmockedUrls: string[] = [];

export async function run(routeList: Route[]) {
  if (requestChecks.length > 0) {
    expect(
      "Page requests are already intercepted."
        + " Have you forget to cleanup by `await intercept.stop()`?",
    ).toEqual("");
  }
  page.route("**/*", (route: playwright.Route) => {
    const request = route.request();
    const realUrl = request.url();
    if (isAppLoadingUrl(realUrl)) {
      return route.continue();
    }

    const { url: querylessUrl, query } = parseUrl(realUrl);

    const match = routeList.find(r => urlMatch(r.url, querylessUrl));

    if (match) {
      const postData = request.postData();
      requestChecks.push({
        url: realUrl,
        real: {
          body: postData !== null ? parse(postData) : null,
          query: querylessUrl !== realUrl ? query : null,
        },
        expected: {
          body: match.body ?? null,
          query: match.query ?? null,
        },
      });

      return handle(route, request, match);
    }

    unmockedUrls.push(realUrl);
    return route.fulfill({ status: 404 });
  });
}

export const start = (routeMap: Route[]) => async () => run(routeMap);

export const stop = async () => {
  await page.unroute("**/*");
  const oldChecks = [...requestChecks];
  requestChecks = [];
  const oldUnmockedUrls = [...unmockedUrls];
  unmockedUrls = [];
  if (oldUnmockedUrls.length > 0) {
    expect(`Unmocked urls detected: ${oldUnmockedUrls.join("\n")}`).toEqual("");
  }
  oldChecks.forEach(rc =>
    expect({ [rc.url]: rc.real }).toEqual({ [rc.url]: rc.expected }),
  );
};
