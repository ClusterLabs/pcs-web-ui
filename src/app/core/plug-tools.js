export const registerPlugins = plugins => Object.keys(plugins).reduce(
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

export const appPlugger = (reducer, sagas, localSelectors) => {
  let stateKey;

  const selectors = Object.keys(localSelectors).reduce(
    (plugged, name) => ({
      ...plugged,
      [name]: state => localSelectors[name](state[stateKey]),
    }),
    {},
  );

  const plug = (appStateKey) => {
    stateKey = appStateKey;
    return { reducer, sagas };
  };

  return { selectors, plug };
};
