import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import 'semantic-ui-css/semantic.min.css';

import App from './App';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';
import store from "./services/store"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();
unregister();
