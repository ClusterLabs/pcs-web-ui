import { connectRouter } from "connected-react-router";

import { appPlugger } from "app/core/plug-tools";

const { plug } = appPlugger(null, [], {});

export default history => (appStateKey) => {
  const { sagas } = plug(appStateKey);
  return {
    reducer: connectRouter(history),
    sagas,
  };
};
