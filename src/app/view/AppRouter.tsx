import { Router, useRoute } from "app/view/share";

import { ClusterApp } from "./cluster";
import { DashboardApp } from "./dashboard";

export const AppRouter = () => {
  const cluster = useRoute("/cluster/:name/*");
  if (cluster) {
    return (
      <Router base={cluster.matched}>
        <ClusterApp clusterName={cluster.params.name} />
      </Router>
    );
  }
  return <DashboardApp />;
};
