import {useSelector} from "react-redux";
import {Switch} from "@patternfly/react-core";

import {selectors} from "app/store";
import {useLoadedCluster} from "app/view/cluster/share";
import {useDispatch} from "app/view/share";

import {SecretsAgePopover} from "./SecretsAgePopover";

export const CibSecretsToggle = ({
  resourceId,
  attributeNames,
  "data-test": dataTest,
}: {
  resourceId: string;
  attributeNames: string[];
  "data-test"?: string;
}) => {
  const {clusterName} = useLoadedCluster();
  const dispatch = useDispatch();
  const cibSecretsState = useSelector(
    selectors.getCibSecrets(clusterName, resourceId),
  );

  return (
    <>
      <span data-test={dataTest}>
        <Switch
          id={`secrets-toggle-${resourceId}`}
          label="Reveal secrets"
          isChecked={cibSecretsState?.loadStatus === "LOADED"}
          isDisabled={cibSecretsState?.loadStatus === "LOADING"}
          onChange={(_event, checked) =>
            dispatch(
              checked
                ? {
                    type: "RESOURCE.CIB_SECRETS.LOAD",
                    key: {clusterName},
                    payload: {
                      resourceId,
                      attributeNames,
                    },
                  }
                : {
                    type: "RESOURCE.CIB_SECRETS.CLEAR",
                    key: {clusterName},
                    payload: {resourceId},
                  },
            )
          }
        />
      </span>
      {cibSecretsState?.loadStatus === "LOADED" && (
        <SecretsAgePopover when={cibSecretsState.when} />
      )}
    </>
  );
};
