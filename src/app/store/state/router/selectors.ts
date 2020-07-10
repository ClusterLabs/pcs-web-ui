import { History } from "history";

import { Selector } from "app/store/types";

export const getLocationPathname: Selector<History.Pathname> = state =>
  state.router.location.pathname;
