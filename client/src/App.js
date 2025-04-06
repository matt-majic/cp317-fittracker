import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Customers from "./components/customers";
import StartPage from "./components/startPage";
import SignIn from "./components/signInPage";
import CreateAccount from "./components/createAccount";
import ChangePassword from "./components/changePassword";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Express Starter</h1>
        </header>
        <Customers />
        <ChangePassword />
        <SignIn />
      </div>
    );
  }
}

export default App;
