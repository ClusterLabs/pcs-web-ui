import {useCallback, useEffect, useRef, useState} from "react";

import type {Path} from "./types";

const {location} = pcsUiEnvAdapter;

const currentPathname = (base: string, path = location.getPath()) =>
  path.toLowerCase().startsWith(base.toLowerCase())
    ? path.slice(base.length)
    : "~" + path;

export const useLocation = (
  {base}: {base: Path} = {base: ""},
): {
  path: Path;
  navigate: (_to: Path, _options?: {replace?: boolean}) => void;
  search: string;
} => {
  const [{path, search}, update] = useState(() => ({
    path: currentPathname(base),
    search: location.getSearch(),
  })); // @see https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const prevHash = useRef(path + search);

  useEffect(() => {
    // this function checks if the location has been changed since the
    // last render and updates the state only when needed.
    // unfortunately, we can't rely on `path` value here, since it can be stale,
    // that's why we store the last pathname in a ref.
    const checkForUpdates = () => {
      const pathname = currentPathname(base);
      const search = location.getSearch();
      const hash = pathname + search;

      if (prevHash.current !== hash) {
        prevHash.current = hash;
        update({path: pathname, search});
      }
    };

    location.addEventsListener(checkForUpdates);

    // it's possible that an update has occurred between render and the effect
    // handler, so we run additional check on mount to catch these updates.
    // Based on:
    // https://gist.github.com/bvaughn/e25397f70e8c65b0ae0d7c90b731b189
    checkForUpdates();

    return () => location.removeEventsListener(checkForUpdates);
  }, [base]);

  // the 2nd argument of the `useLocation` return value is a function
  // that allows to perform a navigation.
  //
  // the function reference should stay the same between re-renders, so that
  // it can be passed down as an element prop without any performance concerns.
  const navigate = useCallback(
    (to: string, {replace = false} = {}) =>
      location.navigate(to[0] === "~" ? to.slice(1) : base + to, {
        replace,
      }),
    [base],
  );

  return {path, navigate, search};
};
