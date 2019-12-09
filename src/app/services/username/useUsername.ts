import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Action } from "app/actions";

import { selectors } from "app/store";

const useUsername = () => {
  const username = useSelector(selectors.getUsername);
  const usernameLoaded = useSelector(selectors.usernameLoaded);
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
