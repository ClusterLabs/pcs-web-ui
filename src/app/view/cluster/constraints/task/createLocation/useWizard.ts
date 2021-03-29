import { ActionPayload, selectors } from "app/store";
import { useClusterSelector, useClusterWizard } from "app/view/share";

export const useWizard = () => {
  const clusterWizard = useClusterWizard("taskConstraintLocationCreate");

  const { clusterName, dispatch, state, close } = clusterWizard;
  const [clusterStatus] = useClusterSelector(selectors.getCluster);

  return {
    ...clusterWizard,
    nodeNameList: clusterStatus.nodeList.map(n => n.name),
    resourceIdList: clusterStatus.resourceTree.reduce<string[]>(
      (idList, resource) => {
        if (resource.itemType === "primitive") {
          return [...idList, resource.id];
        }

        if (resource.itemType === "group") {
          return [...idList, resource.id, ...resource.resources.map(r => r.id)];
        }

        return idList;
      },
      [],
    ),

    // actions
    updateState: (
      payload: ActionPayload["CONSTRAINT.LOCATION.CREATE.UPDATE"],
    ) =>
      dispatch({
        type: "CONSTRAINT.LOCATION.CREATE.UPDATE",
        key: { clusterName },
        payload,
      }),

    createLocation: () =>
      dispatch({
        type: "CONSTRAINT.LOCATION.CREATE",
        key: { clusterName },
        payload: {
          resourceSpecification: state.resourceSpecification,
          resourceValue:
            state.resourceSpecification === "pattern"
              ? state.resourcePattern
              : state.resourceId,
          locationSpecification: state.locationSpecification,
          nodeName: state.nodeName,
          rule: state.rule,
          score: `${state.preference === "prefer" ? "" : "-"}${state.score}`,
        },
      }),

    recoverFromError: () => {
      dispatch({
        type: "CONSTRAINT.LOCATION.CREATE.FAIL.RECOVER",
        key: { clusterName },
      });
    },

    close: () => {
      close();
      dispatch({
        type: "CONSTRAINT.LOCATION.CREATE.CLOSE",
        key: { clusterName },
      });
    },
  };
};
