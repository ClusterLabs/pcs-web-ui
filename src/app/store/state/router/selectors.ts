import { History } from "history";

import { Selector } from "app/store/types";

export const getPathName: Selector<History.Pathname> = state =>
  state.router.location.pathname;

export const getLocationPathname: Selector<History.Pathname> = state =>
  state.router.location.pathname;
