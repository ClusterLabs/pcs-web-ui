import React from "react";

type State = {
  agentName: string;
  resourceName: string;
};
type Actions =
  | {
      type: "SET_AGENT_NAME";
      payload: { agentName: State["agentName"] };
    }
  | {
      type: "SET_RESOURCE_NAME";
      payload: { resourceName: State["resourceName"] };
    };

type ContextValue = {
  state: State;
  dispatch: React.Dispatch<Actions>;
};

const initialState = {
  agentName: "",
  resourceName: "",
};

const Context = React.createContext<ContextValue>({
  state: initialState,
  /* eslint-disable @typescript-eslint/no-empty-function */
  dispatch: () => {},
});

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "SET_RESOURCE_NAME":
      return { ...state, resourceName: action.payload.resourceName };
    case "SET_AGENT_NAME":
      return { ...state, agentName: action.payload.agentName };
    default:
      return state;
  }
};

export const ResourceCreateContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export const useResourceCreateContext = () => React.useContext(Context);
