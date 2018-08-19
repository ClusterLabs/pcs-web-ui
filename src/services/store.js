import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from 'redux-saga'
import reducer from "./reducers"
import rootSaga from "./sagas.js"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware()

const history = createBrowserHistory({basename: "/ui/"})

const store = createStore(
  connectRouter(history)(reducer),
  composeEnhancers(applyMiddleware(
    routerMiddleware(history),
    sagaMiddleware,
  )),
)

sagaMiddleware.run(rootSaga);
export default store;
export {history};
