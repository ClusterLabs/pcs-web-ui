import { createBrowserHistory } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";

import { rootReducer, rootSaga } from "./plug";

/* global window */
/* eslint-disable no-underscore-dangle */
const composeMiddleware = (
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
);

const sagaMiddleware = createSagaMiddleware();

const setupStore = (basename: string) => {
  const history = createBrowserHistory({ basename });
  const store = createStore(
    rootReducer(history),
    composeMiddleware(applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
    )),
  );
  sagaMiddleware.run(rootSaga);

  return { store, history };
};
export default setupStore;
