import {AppReducer} from "app/store/reducers/appReducer";

export const resourceSetCreateFactory = <
  INITIAL_SET extends {resources: string[]},
>(
  initialSet: INITIAL_SET,
) => {
  const initialState: typeof initialSet[] = [initialSet];
  const resourceSet: AppReducer<typeof initialState> = (
    state = initialState,
    action,
  ) => {
    switch (action.type) {
      case "RESOURCE.SET.LIST.MOVE.SET": {
        const i = action.payload.index;
        if (action.payload.direction === "up") {
          if (i < 0 || i >= state.length) {
            return state;
          }
          [state[i], state[i - 1]] = [state[i - 1], state[i]];
        } else {
          if (i >= state.length - 1) {
            return state;
          }
          [state[i], state[i + 1]] = [state[i + 1], state[i]];
        }
        return state;
      }

      case "RESOURCE.SET.LIST.CREATE.SET":
        return [...state, initialSet];

      case "RESOURCE.SET.LIST.DELETE.SET": {
        return [...state.filter((_set, i) => i !== action.payload.index)];
      }

      default:
        return state;
    }
  };
  const updateSet = (
    setList: typeof initialState,
    index: number,
    setUpdate: Partial<typeof initialSet>,
  ) => setList.map((set, i) => (i !== index ? set : {...set, ...setUpdate}));

  return {resourceSet: resourceSet, initialState, updateSet};
};
