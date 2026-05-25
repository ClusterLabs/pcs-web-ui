import type {ActionPayload} from "app/store";
import type {AppReducer} from "app/store/reducers/appReducer";

type OpenPayload = ActionPayload["RESOURCE.EDIT_ATTRS.OPEN"];
type ResourceAttrs = OpenPayload["resourceAttrs"];

const initialState: OpenPayload & {
  originalResourceAttrs: ResourceAttrs;
  call: {
    response: "" | "sending" | "ok" | "fail";
    resultMessage: string;
  };
} = {
  clusterName: "",
  resourceId: "",
  agentParameters: [],
  originalResourceAttrs: {},
  resourceAttrs: {},
  call: {
    response: "",
    resultMessage: "",
  },
};

export const primitiveAttrsEdit: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "RESOURCE.EDIT_ATTRS.OPEN":
      return {
        ...initialState,
        ...action.payload,
        originalResourceAttrs: action.payload.resourceAttrs,
      };

    case "RESOURCE.EDIT_ATTRS.UPDATE":
      return {
        ...state,
        resourceAttrs:
          action.payload.value !== ""
            ? {
                ...state.resourceAttrs,
                [action.payload.name]: action.payload.value,
              }
            : Object.keys(state.resourceAttrs)
                .filter(key => key !== action.payload.name)
                .reduce<ResourceAttrs>(
                  (attrList, name) => ({
                    ...attrList,
                    [name]: state.resourceAttrs[name],
                  }),
                  {},
                ),
      };
    case "RESOURCE.EDIT_ATTRS.RUN":
      return {
        ...state,
        call: {
          response: "sending",
          resultMessage: "",
        },
      };

    case "RESOURCE.EDIT_ATTRS.RUN.OK":
      return {
        ...state,
        call: {
          response: "ok",
          resultMessage: "",
        },
      };

    case "RESOURCE.EDIT_ATTRS.RUN.ERROR":
      return {
        ...state,
        call: {
          response: "fail",
          resultMessage: action.payload.message,
        },
      };

    case "RESOURCE.EDIT_ATTRS.RUN.ERROR.RECOVER":
      return {
        ...state,
        call: {
          response: "",
          resultMessage: "",
        },
      };

    default:
      return state;
  }
};
