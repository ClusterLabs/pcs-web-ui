import type {ActionPayload, selectors} from "app/store";
import {useDispatch} from "app/view/share/useDispatch";

export const useResourceSets = <
  NAME extends Parameters<typeof selectors.getTask>[0],
>(
  task: NAME,
) => {
  const dispatch = useDispatch();
  return {
    createSet: () =>
      dispatch({
        type: "RESOURCE.SET.LIST.CREATE.SET",
        key: {task},
      }),

    deleteSet: (index: number) =>
      dispatch({
        type: "RESOURCE.SET.LIST.DELETE.SET",
        key: {task},
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
        key: {task},
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
