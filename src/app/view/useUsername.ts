import React from "react";
import { useSelector } from "react-redux";

import { selectors } from "app/store";
import { useDispatch } from "app/view/useDispatch";

export const useUsername = () => {
  const username = useSelector(selectors.getUsername);
  const usernameLoaded = useSelector(selectors.usernameLoaded);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!usernameLoaded) {
      dispatch({ type: "USERNAME.LOAD" });
    }
  }, [usernameLoaded, dispatch]);
  return username;
};
