import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from 'redux-saga'
import reducer from "./reducers"
import rootSaga from "./sagas.js"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  ),
)

sagaMiddleware.run(rootSaga);
export default store;
