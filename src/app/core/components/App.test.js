import React from 'react';
import ReactDOM from 'react-dom';

import setupStore from "app/core/store.js";

import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App storeInfo={setupStore("/")}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
