import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Action } from "app/actions";
import { selectors } from "app/store";

export const useUsername = () => {
  const username = useSelector(selectors.getUsername);
  const usernameLoaded = useSelector(selectors.usernameLoaded);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!usernameLoaded) {
      dispatch<Action>({ type: "USERNAME.LOAD" });
    }
  }, [usernameLoaded, dispatch]);
  return username;
};
