import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./sagas";
import { root as rootReducer } from "./reducers/root";

/* eslint-disable no-underscore-dangle, @typescript-eslint/no-explicit-any */
const composeMiddleware =
  (process.env.NODE_ENV !== "production"
    && window
    && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    }))
  || compose;

const sagaMiddleware = createSagaMiddleware();

export const setupStore = (): ReturnType<typeof createStore> => {
  const store = createStore(
    rootReducer(),
    composeMiddleware(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(rootSaga);

  return store;
};
