import { Reducer } from "redux";
import { ForkEffect } from "redux-saga/effects";

import {
  Plugin,
  RegisteredPlugins,
  RootSelector,
  RootStateKeys,
  RootState,
  Selector,
} from "./types";

export const registerPlugins = (
  plugins: Record<RootStateKeys, Plugin>,
) => (
  Object.keys(plugins) as Array<keyof typeof plugins>
).reduce<RegisteredPlugins>(
  (plugs, pluginName) => {
    const { reducer, sagas } = plugins[pluginName](pluginName);
    return {
      reducers: typeof reducer !== "function" ? plugs.reducers : {
        ...plugs.reducers,
        [pluginName]: reducer,
      },
      sagas: [...plugs.sagas, ...sagas],
    };
  },
  { reducers: {}, sagas: [] },
);

export const appPlugger = (
  reducer: Reducer,
  sagas: ForkEffect[],
  localSelectors: Record<string, Selector>,
) => {
  let stateKey: RootStateKeys;

  const selectors = (
    Object.keys(localSelectors)
  ).reduce<Record<string, RootSelector>>(
    (plugged, name) => ({
      ...plugged,
      [name]: (state: RootState) => localSelectors[name](state[stateKey]),
    }),
    {},
  );

  const plug = (rootStateKey: RootStateKeys) => {
    stateKey = rootStateKey;
    return { reducer, sagas };
  };

  return { selectors, plug };
};
