import React from "react";
import {useSelector} from "react-redux";

import {selectors} from "app/store";
import {useDispatch} from "app/view/share";

import {AppLoadingUserInfo} from "./AppLoadingUserInfo";
import {AppUserNotHaclient} from "./AppUserNotHaclient";

export const EnsurePermissions = ({children}: {children: JSX.Element}) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({type: "USER.INIT"});
  }, [dispatch]);

  const user = useSelector(selectors.getUser);

  if (!user.isLoaded) {
    return <AppLoadingUserInfo />;
  }

  if (!(user.isHaclient || user.isSuperuser)) {
    return <AppUserNotHaclient />;
  }

  return children;
};
