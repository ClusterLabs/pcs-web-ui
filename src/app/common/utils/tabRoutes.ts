import { match as Match } from "react-router";

export function selectCurrent<T extends string>(
  defaultTab: T,
  routes: Record<T, Match|null>,
) {
  const entries = Object.entries(routes);
  const currentRoute = entries.find(r => r[1] !== null);

  return currentRoute
    ? {
      tab: currentRoute[0] as T,
      url: (currentRoute[1] as Match).url,
    }
    : {
      tab: defaultTab,
      url: "/",
    }
  ;
}
