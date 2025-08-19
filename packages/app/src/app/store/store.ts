import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";

import {rootSaga} from "./sagas";
import {root as rootReducer} from "./reducers";

const composeMiddleware =
  (process.env.NODE_ENV !== "production" &&
    window &&
    // biome-ignore lint/suspicious/noExplicitAny: No wort to improve any now.
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    // biome-ignore lint/suspicious/noExplicitAny: No wort to improve any now.
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })) ||
  compose;

const sagaMiddleware = createSagaMiddleware();

export const setupStore = (): ReturnType<typeof createStore> => {
  const store = createStore(
    rootReducer(),
    composeMiddleware(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(rootSaga);

  return store;
};
