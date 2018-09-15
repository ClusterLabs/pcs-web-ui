import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {MemoryRouter} from "react-router";

import setupStore from "app/services/store"

import App from './App';

const storeInfo = setupStore("/");

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Provider store={storeInfo.store}>
      <App history={storeInfo.history}/>
    </Provider>,

    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
