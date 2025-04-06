import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Customers from "./components/customers";
import StartPage from "./startPage.js";

class App extends Component {
  render() {
    console.log("Rendering App component");
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Express Starter</h1>
        </header>
        <Customers />
        <StartPage />
      </div>
    );
  }
}

export default App;
