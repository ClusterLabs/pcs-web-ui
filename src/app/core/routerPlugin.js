import { appPlugger } from "app/core/plug-tools";

import createReducer, * as localSelectors from "./routerReducer";

const { selectors, plug } = appPlugger(null, [], localSelectors);

export { selectors };
export default history => (appStateKey) => {
  const { sagas } = plug(appStateKey);
  return {
    reducer: createReducer(history),
    sagas,
  };
};
