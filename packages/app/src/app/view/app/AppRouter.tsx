import {PageSection} from "@patternfly/react-core";

import {
  ClusterApp,
  ClusterAppBackendNotFound,
  ClusterAppForbidden,
  ClusterAppLoading,
  useClusterNameBootstrap,
} from "app/view/cluster";
import {EmptyStateError} from "app/view/share";

export const AppRouter = () => {
  const bootstrap = useClusterNameBootstrap();

  if (bootstrap.status === "ok") {
    return <ClusterApp clusterName={bootstrap.clusterName} />;
  }

  if (bootstrap.status === "loading") {
    return <ClusterAppLoading title="Loading cluster" />;
  }

  // it's error
  const {result} = bootstrap;

  if (result.type === "BACKEND_NOT_FOUND") {
    return <ClusterAppBackendNotFound />;
  }

  if (result.type === "BAD_HTTP_STATUS" && result.status === 403) {
    return <ClusterAppForbidden />;
  }

  return (
    <PageSection>
      <EmptyStateError
        title="Error loading cluster"
        message="Failed to connect to the cluster backend."
      />
    </PageSection>
  );
};
