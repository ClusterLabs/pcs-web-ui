import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducers";
import rootSaga from "./sagas";

const setupStore = (basename) => {
  /* eslint no-underscore-dangle: [
       "error", { "allow": [
         "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__",
         "__SAGA_MONITOR_EXTENSION__"
       ] }
     ]
  */
  const composeEnhancers = (
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  );

  const sagaMiddleware = createSagaMiddleware({
    sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
  });

  const history = createBrowserHistory({ basename });

  const store = createStore(
    connectRouter(history)(reducer),
    composeEnhancers(applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
    )),
  );

  sagaMiddleware.run(rootSaga);

  return { store, history };
};
export default setupStore;
