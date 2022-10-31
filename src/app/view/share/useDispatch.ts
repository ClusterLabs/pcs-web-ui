import React from "react";
import {useDispatch as useReduxDispatch} from "react-redux";

import {Action} from "app/store";

export const useDispatch = () => {
  const reduxDispatch = useReduxDispatch();
  const dispatch = React.useCallback(
    (action: Action) => reduxDispatch<Action>(action),
    [reduxDispatch],
  );
  return dispatch;
};
