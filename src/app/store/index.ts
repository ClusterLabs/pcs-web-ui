import React from "react";
import { useDispatch as useReduxDispatch, useSelector } from "react-redux";

import {
  Action as TAction,
  ActionLeaf as TActionLeaf,
  ActionMap as TActionMap,
} from "./actions";
import * as selectors from "./selectors";
import * as types from "./state/types";
import * as utils from "./utils";
import * as url from "./url";
import { setupStore } from "./store";

export const useDispatch = () => {
  const reduxDispatch = useReduxDispatch();
  const dispatch = React.useCallback(
    (action: TAction) => reduxDispatch<TAction>(action),
    [reduxDispatch],
  );
  return dispatch;
};

export type Action = TAction;
export type ActionMap = TActionMap;
export type ActionLeaf = TActionLeaf;

export { setupStore, useSelector, selectors, types, utils, url };
