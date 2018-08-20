import React, { Component } from 'react';
import DashboardPage from "./scenes/dashboard/containers/DashboardPage"
import Login from "./scenes/login/containers/Login"
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <DashboardPage/>
        <Login/>
      </div>
    );
  }
}

export default App;
