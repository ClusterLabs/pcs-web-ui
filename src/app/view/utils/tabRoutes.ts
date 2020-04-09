import {
  match as MatchRR,
  RouteProps as RoutePropsRR,
  useRouteMatch as useRouteMatchRR,
} from "react-router";

type RouteProps = RoutePropsRR & { path: string };
type Match = { match: MatchRR | null; url: string };

type UrlMap<T> = Record<keyof T, string>;

type Analyzed<T> = {
  urlMap: UrlMap<T>;
  tab: keyof T;
  url: string;
  match: MatchRR | null;
};

export const useMatch = (path: string | RouteProps): Match => ({
  match: useRouteMatchRR(path),
  url: typeof path === "string" ? path : path.path,
});

export function analyzeRoutes<T extends Record<string, Match>>(
  defaultTab: keyof T,
  routes: T,
): Analyzed<T> {
  return Object.keys(routes).reduce<Analyzed<T>>(
    (analyzed, name) => {
      const { match } = routes[name];
      const urlMap = { ...analyzed.urlMap, [name]: routes[name].url };
      return analyzed.match === null && match !== null
        ? {
          match,
          url: match.url,
          tab: name,
          urlMap,
        }
        : {
          ...analyzed,
          urlMap,
        };
    },
    {
      match: null,
      urlMap: {} as UrlMap<T>,
      tab: defaultTab,
      url: "/",
    },
  );
}
