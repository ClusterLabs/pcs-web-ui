import {useSelector} from "react-redux";
import {Switch} from "@patternfly/react-core";

import {selectors} from "app/store";
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
  const dispatch = useDispatch();
  const cibSecretsState = useSelector(selectors.getCibSecrets(resourceId));

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
                    payload: {
                      resourceId,
                      attributeNames,
                    },
                  }
                : {
                    type: "RESOURCE.CIB_SECRETS.CLEAR",
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
