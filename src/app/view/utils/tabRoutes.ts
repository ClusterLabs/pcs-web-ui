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

export function useRoutesAnalysis<T extends Record<string, Match>>(
  defaultTab: keyof T,
  routes: T,
): Analyzed<T> {
  // if we would like to remember last url under tab e.g.
  // cluster/resourceTree/fence-devices/F1/arguments
  // instead of just
  // cluster/resourceTree/fence-devices/
  //
  // we need to:
  // import { useLocation } from "react-router";
  //
  // then here:
  // const currentLocation = useLocation().pathname;
  // const matchingUrl = Object.keys(routes).reduce<string | null>(
  //   (url, name) => (routes[name].match ? routes[name].url : url),
  //   null,
  // );
  // now we can put {matchingUrl: currentLocation} to global state
  // we can also load this map here and use right url to url map...
  // (we do not forget to put action to remove item when
  // matchingUrl === currentLocation to keep this map small)
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
