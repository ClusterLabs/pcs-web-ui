import React from "react";
import { useDispatch as useReduxDispatch, useSelector } from "react-redux";

import * as actions from "./actions";
import * as selectors from "./selectors";
import * as types from "./state/types";
import * as utils from "./utils";
import * as url from "./url";
import { setupStore } from "./store";

export const useDispatch = () => {
  const reduxDispatch = useReduxDispatch();
  const dispatch = React.useCallback(
    (action: actions.Action) => reduxDispatch<actions.Action>(action),
    [reduxDispatch],
  );
  return dispatch;
};

export { setupStore, useSelector, actions, selectors, types, utils, url };
