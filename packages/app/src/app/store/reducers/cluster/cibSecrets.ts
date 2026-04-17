import type {AppReducer} from "app/store/reducers/appReducer";

type CibSecretsEntry =
  | {loadStatus: "LOADED"; secrets: Record<string, string>; when: number}
  | {loadStatus: "FAILED" | "LOADING"};

type CibSecretsState = Record<string, CibSecretsEntry>;

export const cibSecrets: AppReducer<CibSecretsState> = (state = {}, action) => {
  switch (action.type) {
    case "RESOURCE.CIB_SECRETS.LOAD": {
      const {resourceId} = action.payload;
      return {
        ...state,
        [resourceId]: {loadStatus: "LOADING"},
      };
    }

    case "RESOURCE.CIB_SECRETS.LOAD.SUCCESS": {
      const secrets: Record<string, Record<string, string>> = {};
      for (const s of action.payload.resource_secrets) {
        if (!(s.resource_id in secrets)) {
          secrets[s.resource_id] = {};
        }
        secrets[s.resource_id][s.name] = s.value;
      }
      const newState = {...state};
      for (const [resourceId, secretMap] of Object.entries(secrets)) {
        if (state[resourceId]?.loadStatus !== "LOADING") continue;
        newState[resourceId] = {
          loadStatus: "LOADED",
          secrets: secretMap,
          when: Date.now(),
        };
      }
      return newState;
    }

    case "RESOURCE.CIB_SECRETS.LOAD.FAILED": {
      const {resourceId} = action.payload;
      if (!(resourceId in state)) return state;
      return {
        ...state,
        [resourceId]: {loadStatus: "FAILED"},
      };
    }

    case "RESOURCE.CIB_SECRETS.CLEAR": {
      const {resourceId} = action.payload;
      if (!(resourceId in state)) return state;
      const {[resourceId]: _, ...rest} = state;
      return rest;
    }

    default:
      return state;
  }
};
