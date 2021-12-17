import { Router, useRoute } from "app/view/share";

import { ClusterDetailPage } from "./cluster/";
import { DashboardPage } from "./dashboard";

export const AppPage = () => {
  const cluster = useRoute("/cluster/:name/*");
  if (cluster) {
    return (
      <Router base={cluster.matched}>
        <ClusterDetailPage clusterName={cluster.params.name} />
      </Router>
    );
  }
  return <DashboardPage />;
};
