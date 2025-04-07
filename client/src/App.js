import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// Components (ensure these paths are correct and components are properly exported)
import StartPage from "./components/startPage";
import SignIn from "./components/signInPage";
import CreateAccount from "./components/createAccount";
import ChangePassword from "./components/changePassword";

console.log(StartPage, SignIn, CreateAccount, ChangePassword);

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={StartPage} />
        <Route path="/signin" component={SignIn} />
        <Route path="/create-account" component={CreateAccount} />
        <Route path="/change-password" component={ChangePassword} />
      </Switch>
    </Router>
  );
}

export default App;
