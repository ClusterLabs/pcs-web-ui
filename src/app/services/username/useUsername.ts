import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Action } from "app/common/actions";

import * as selectors from "./selectors";

const useUsername = () => {
  const username = useSelector(selectors.getUsername);
  const usernameLoaded = useSelector(selectors.loaded);
  const dispatch = useDispatch();
  React.useEffect(
    () => {
      if (!usernameLoaded) {
        dispatch<Action>({ type: "USERNAME.LOAD" });
      }
    },
    [usernameLoaded, dispatch],
  );
  return username;
};

export default useUsername;
