import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import 'semantic-ui-css/semantic.min.css';

import App from 'app/App';
import setupStore from "app/services/store"

import './index.css';

const storeInfo = setupStore("/ui/");

ReactDOM.render(
  <Provider store={storeInfo.store}>
    <App history={storeInfo.history}/>
  </Provider>,
  document.getElementById('root')
);
