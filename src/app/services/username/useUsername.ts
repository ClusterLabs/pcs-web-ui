import React from "react";
import { useSelector, useDispatch } from "react-redux";

import * as selectors from "./selectors";
import * as UsernameAction from "./actions";

const useUsername = () => {
  const username = useSelector(selectors.getUsername);
  const usernameLoaded = useSelector(selectors.loaded);
  const dispatch = useDispatch();
  React.useEffect(
    () => {
      if (!usernameLoaded) {
        dispatch<UsernameAction.LoadUsername>({ type: "USERNAME.LOAD" });
      }
    },
    [usernameLoaded, dispatch],
  );
  return username;
};

export default useUsername;
