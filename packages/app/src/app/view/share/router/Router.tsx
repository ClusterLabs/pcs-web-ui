import React from "react";

import {useLocation as useLocationInternal} from "./useLocation";
import type {Path} from "./types";
import {match} from "./match";

type RouterProps = {base: Path};

// one of the coolest features of `createContext`:
// when no value is provided — default object is used.
// allows us to use the router context as a global ref to store
// the implicitly created router (see `useRouter` below)
const RouterCtx = React.createContext<{v: RouterProps | undefined}>({
  v: undefined,
});

export const useRouter = (): RouterProps => {
  const globalRef = React.useContext(RouterCtx);

  // either obtain the router from the outer context (provided by the
  // `<Router /> component) or create an implicit one on demand.
  // biome-ignore lint/suspicious/noAssignInExpressions:
  return globalRef.v || (globalRef.v = {base: ""});
};

export const useLocation = () => {
  const router = useRouter();
  return useLocationInternal({base: router.base});
};

export const useRoute = (pattern: Path): ReturnType<typeof match> => {
  const {path} = useLocation();
  return match(path, pattern);
};

export const Router = ({
  base,
  children,
}: {
  base: Path;
  children?: React.ReactNode;
}) => {
  const {base: parentBase} = useRouter();

  const value = {
    v: {base: parentBase ? parentBase + (base ?? "") : base},
  };

  return <RouterCtx.Provider value={value}>{children}</RouterCtx.Provider>;
};
