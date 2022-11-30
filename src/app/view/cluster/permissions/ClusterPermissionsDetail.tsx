import {PageSection} from "@patternfly/react-core";

import {EmptyStateSpinner} from "app/view/share";
import {useCurrentClusterStoreItem} from "app/view/cluster/share";

import {ClusterPermissionsPage} from "./ClusterPermissionsPage";
import {LoadedPermissionsProvider} from "./LoadedPermissionsContext";

export const ClusterPermissionsDetail = () => {
  const {clusterPermissions} = useCurrentClusterStoreItem();

  if (clusterPermissions.data === null) {
    return (
      <PageSection>
        <EmptyStateSpinner title="Loading cluster permission data" />;
      </PageSection>
    );
  }

  return (
    <LoadedPermissionsProvider value={clusterPermissions.data}>
      <ClusterPermissionsPage />
    </LoadedPermissionsProvider>
  );
};
