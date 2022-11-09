import {ActionPayload, selectors} from "app/store";
import {useDispatch} from "app/view/share/useDispatch";
import {useSelectedClusterName} from "app/view/share/SelectedClusterContext";

export const useResourceSets = <
  NAME extends Parameters<typeof selectors.getClusterTask>[0],
>(
  task: NAME,
) => {
  const dispatch = useDispatch();
  const clusterName = useSelectedClusterName();
  return {
    createSet: () =>
      dispatch({
        type: "RESOURCE.SET.LIST.CREATE.SET",
        key: {clusterName, task},
      }),

    deleteSet: (index: number) =>
      dispatch({
        type: "RESOURCE.SET.LIST.DELETE.SET",
        key: {clusterName, task},
        payload: {
          index,
        },
      }),

    moveSet: (
      index: number,
      direction: ActionPayload["RESOURCE.SET.LIST.MOVE.SET"]["direction"],
    ) =>
      dispatch({
        type: "RESOURCE.SET.LIST.MOVE.SET",
        key: {clusterName, task},
        payload: {
          index,
          direction,
        },
      }),

    areSetsValid: (sets: {resources: string[]}[]) => {
      if (sets.length > 1) {
        return sets.every(s => s.resources.length > 0);
      }
      if (sets.length === 1) {
        return sets[0].resources.length > 1;
      }
      return false;
    },
  };
};
