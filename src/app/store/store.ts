import { History } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./sagas";
import { root as rootReducer } from "./reducers/root";

/* eslint-disable no-underscore-dangle, @typescript-eslint/no-explicit-any */
const composeMiddleware =
  (process.env.NODE_ENV !== "production"
    && window
    && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  || compose;

const sagaMiddleware = createSagaMiddleware();

export const setupStore = (
  history: History,
): ReturnType<typeof createStore> => {
  const store = createStore(
    rootReducer(history),
    composeMiddleware(
      applyMiddleware(routerMiddleware(history), sagaMiddleware),
    ),
  );
  sagaMiddleware.run(rootSaga);

  return store;
};
