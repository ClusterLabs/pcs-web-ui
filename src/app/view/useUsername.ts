import React from "react";

import { selectors, useDispatch, useSelector } from "app/store";

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
