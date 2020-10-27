import React from "react";
import { WizardContext } from "@patternfly/react-core";

import { actions, selectors, useDispatch, useSelector } from "app/store";
import { useClusterSelector, useWizardOpenClose } from "app/view";
import { RESOURCE_CREATE } from "app/scenes/wizardKeys";

export const useWizard = () => {
  const [wizardState, clusterUrlName] = useClusterSelector(
    selectors.getWizardResourceCreateState,
  );
  const [groupList] = useClusterSelector(selectors.getGroups);
  const agent = useSelector(
    selectors.getPcmkAgent(clusterUrlName, wizardState.agentName),
  );
  const dispatch = useDispatch();
  const openClose = useWizardOpenClose(RESOURCE_CREATE);

  const isAgentLoaded =
    agent
    && (agent.loadStatus === "LOADED" || agent.loadStatus === "RELOADING");

  const wizardContext = React.useContext(WizardContext);

  type ActionUpdate = actions.PrimitiveResourceActions["CreateResourceUpdate"];
  return {
    // don't spread wizardContext to avoid conflict if patternfly adds something
    wizard: wizardContext,
    wizardState,
    clusterUrlName,
    dispatch,
    close: () => {
      openClose.close();
      dispatch({
        type: "RESOURCE.PRIMITIVE.CREATE.CLOSE",
        payload: {
          clusterUrlName,
        },
      });
    },
    open: openClose.open,
    isOpened: openClose.isOpened,
    isNameTypeValid:
      wizardState.resourceName.length > 0 && wizardState.agentName.length > 0,
    areInstanceAttrsValid:
      isAgentLoaded
      && agent.parameters.every(
        p => !p.required || p.name in wizardState.instanceAttrs,
      ),
    areSettingsValid:
      wizardState.useGroup !== "new" || wizardState.group.length > 0,
    isAgentLoaded,
    tryNext: (isValid: boolean) => {
      if (isValid) {
        dispatch({
          type: "RESOURCE.PRIMITIVE.CREATE.VALIDATION.HIDE",
          payload: { clusterUrlName },
        });
        wizardContext.onNext();
      } else {
        dispatch({
          type: "RESOURCE.PRIMITIVE.CREATE.VALIDATION.SHOW",
          payload: { clusterUrlName },
        });
      }
    },
    groupList,
    updateState: (state: ActionUpdate["payload"]["state"]) => {
      dispatch({
        type: "RESOURCE.PRIMITIVE.CREATE.UPDATE",
        payload: {
          clusterUrlName,
          state,
        },
      });
    },
  };
};
