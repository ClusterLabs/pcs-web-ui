import {Router, SelectedClusterProvider, useRoute} from "app/view/share";

import {ClusterApp} from "./cluster";
import {DashboardApp} from "./dashboard";

export const AppRouter = () => {
  const cluster = useRoute("/cluster/:name/*");
  if (cluster) {
    return (
      <Router base={cluster.matched}>
        <SelectedClusterProvider value={cluster.params.name}>
          <ClusterApp />
        </SelectedClusterProvider>
      </Router>
    );
  }
  return <DashboardApp />;
};
