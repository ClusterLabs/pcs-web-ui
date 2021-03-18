import React from "react";
import { useDispatch as useReduxDispatch, useSelector } from "react-redux";

import { Action } from "./actions";
import * as selectors from "./selectors";
import * as types from "./reducers/types";
import * as utils from "./utils";
import { setupStore } from "./store";

export * from "./actions";

export const useDispatch = () => {
  const reduxDispatch = useReduxDispatch();
  const dispatch = React.useCallback(
    (action: Action) => reduxDispatch<Action>(action),
    [reduxDispatch],
  );
  return dispatch;
};

export { setupStore, useSelector, selectors, types, utils };
