import React from "react";
import {useSelector} from "react-redux";

import {selectors} from "app/store";
import {Router, useDispatch, useRoute} from "app/view/share";

import {ClusterApp} from "./cluster";
import {DashboardApp} from "./dashboard";
import {AppLoadingUserInfo} from "./AppLoadingUserInfo";
import {AppUserNotHaclient} from "./AppUserNotHaclient";

export const AppRouter = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({type: "USER.INIT"});
  }, [dispatch]);

  const user = useSelector(selectors.getUser);
  const cluster = useRoute("/cluster/:name/*");

  if (!user.isLoaded) {
    return <AppLoadingUserInfo />;
  }

  if (!(user.isHaclient || user.isSuperuser)) {
    return <AppUserNotHaclient />;
  }

  if (cluster) {
    return (
      <Router base={cluster.matched}>
        <ClusterApp clusterName={cluster.params.name} />
      </Router>
    );
  }
  return <DashboardApp />;
};
