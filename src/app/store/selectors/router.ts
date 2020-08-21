import { History } from "history";

import { Selector } from "./selector";

export const getLocationPathname: Selector<History.Pathname> = state =>
  state.router.location.pathname;
