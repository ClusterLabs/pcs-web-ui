import {PageSection} from "@patternfly/react-core";

import {EmptyStateSpinner} from "app/view/share";
import {useRegisteredClusterInfo} from "app/view/cluster/share";

import {ClusterPermissionsPage} from "./ClusterPermissionsPage";
import {LoadedPermissionsProvider} from "./LoadedPermissionsContext";

export const ClusterPermissionsDetail = () => {
  const {permissions} = useRegisteredClusterInfo();

  if (!permissions.isLoaded) {
    return (
      <PageSection>
        <EmptyStateSpinner title="Loading cluster permission data" />;
      </PageSection>
    );
  }

  return (
    <LoadedPermissionsProvider value={permissions.data}>
      <ClusterPermissionsPage />
    </LoadedPermissionsProvider>
  );
};
