import type React from "react";
import {useSelector} from "react-redux";
import {
  DescriptionListDescription,
  Label,
  Spinner,
} from "@patternfly/react-core";
import {LockIcon, UnlockIcon} from "@patternfly/react-icons";

import {selectors} from "app/store";
import {useLoadedCluster} from "app/view/cluster/share/LoadedClusterContext";

export const isCibSecret = (value: string | undefined): boolean =>
  value === "lrm://";

export const AttributeValueSecret = ({
  resourceId,
  parameterName,
  revealed,
  hidden,
}: {
  resourceId: string;
  parameterName: string;
  revealed: (value: React.ReactNode) => React.ReactNode;
  hidden: (value: React.ReactNode) => React.ReactNode;
}) => {
  const {clusterName} = useLoadedCluster();
  const cibSecretsState = useSelector(
    selectors.getCibSecrets(clusterName, resourceId),
  );

  if (
    cibSecretsState?.loadStatus === "LOADED" &&
    cibSecretsState.secrets[parameterName]
  ) {
    return (
      <DescriptionListDescription>
        <Label color="gold" icon={<UnlockIcon />} isCompact>
          {revealed(cibSecretsState.secrets[parameterName])}
        </Label>
      </DescriptionListDescription>
    );
  }

  return (
    <DescriptionListDescription>
      <Label color="gold" icon={<LockIcon />} isCompact>
        {hidden("CIB secret")}
        {cibSecretsState?.loadStatus === "LOADING" && <Spinner size="sm" />}
      </Label>
    </DescriptionListDescription>
  );
};
