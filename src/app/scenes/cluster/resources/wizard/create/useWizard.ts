import { actions, selectors, useDispatch, useSelector } from "app/store";
import { useClusterSelector, useWizardOpenClose } from "app/view";
import { CREATE_RESOURCE } from "app/scenes/wizardKeys";

export const useWizard = () => {
  const [wizardState, clusterUrlName] = useClusterSelector(
    selectors.getWizardResourceCreateState,
  );
  const [groupList] = useClusterSelector(selectors.getGroups);
  const agent = useSelector(
    selectors.getPcmkAgent(clusterUrlName, wizardState.agentName),
  );
  const dispatch = useDispatch();
  const openClose = useWizardOpenClose(CREATE_RESOURCE);

  const isAgentLoaded =
    agent
    && (agent.loadStatus === "LOADED" || agent.loadStatus === "RELOADING");

  type ActionUpdate = actions.PrimitiveResourceActions["CreateResourceUpdate"];
  return {
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
    tryNext: (isValid: boolean, next: () => void) => {
      if (isValid) {
        dispatch({
          type: "RESOURCE.PRIMITIVE.CREATE.VALIDATION.HIDE",
          payload: { clusterUrlName },
        });
        next();
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
