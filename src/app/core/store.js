import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import createRootReducer from "./reducers";
import rootSaga from "./sagas";

const setupStore = (basename) => {
  /* eslint-disable dot-notation */
  const composeEnhancers = (
    window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose
  );

  const sagaMiddleware = createSagaMiddleware({
    sagaMonitor: window["__SAGA_MONITOR_EXTENSION__"],
  });

  const history = createBrowserHistory({ basename });

  const store = createStore(
    createRootReducer(history),
    composeEnhancers(applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
    )),
  );

  sagaMiddleware.run(rootSaga);

  return { store, history };
};
export default setupStore;
