import React from 'react';
import {Provider} from "react-redux";

import setupStore from "../store.js";
import AppPage from "../containers/AppPage.js";

const App = ({storeInfo}) => {
  storeInfo = storeInfo || setupStore("/ui/");
  return (
    <Provider store={storeInfo.store}>
      <AppPage history={storeInfo.history}/>
    </Provider>
  );
};

export default App;
