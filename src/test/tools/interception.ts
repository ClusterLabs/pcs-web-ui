import * as playwright from "playwright";
import { ParsedQuery, parse, parseUrl } from "query-string";

type RequestData = {
  body?: ParsedQuery | null;
  query?: ParsedQuery | null;
  payload?: ReturnType<typeof JSON.parse> | null;
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
  const { url: querylessUrl } = parseUrl(realUrl);
  if (isRegExp(routeUrl)) {
    return routeUrl.test(querylessUrl);
  }
  return querylessUrl.endsWith(routeUrl);
};

const createRequestCheck = ({
  request,
  route,
}: {
  request: playwright.Request;
  route: Route;
}) => {
  const url = request.url();
  const { query } = parseUrl(url);
  let body = null;
  let payload = null;
  const postData = request.postData();
  if (postData) {
    try {
      payload = JSON.parse(postData);
    } catch (e) {
      body = parse(postData);
    }
  }

  return {
    url,
    real: {
      body,
      payload,
      query: Object.keys(query).length > 0 ? query : null,
    },
    expected: {
      body: route.body ?? null,
      query: route.query ?? null,
      payload: route.payload ?? null,
    },
  };
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
    const url = request.url();
    if (isAppLoadingUrl(url)) {
      return route.continue();
    }

    const matchingRoute = routeList.find(r => urlMatch(r.url, url));

    if (matchingRoute) {
      requestChecks.push(
        createRequestCheck({
          request,
          route: matchingRoute,
        }),
      );

      return handle(route, request, matchingRoute);
    }

    unmockedUrls.push(url);
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
