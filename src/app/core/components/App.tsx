import React from "react";
import { Provider } from "react-redux";

import setupStore from "../store";
import AppPage from "./AppPage";
import "../css/App.css";

const App = ({ storeInfo = setupStore("/ui/") }) => (
  <Provider store={storeInfo.store}>
    <AppPage history={storeInfo.history} />
  </Provider>
);

export default App;
