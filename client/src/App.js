import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// Components (ensure these paths are correct and components are properly exported)
import StartPage from "./components/startPage";
import SignIn from "./components/signInPage";
import CreateAccount from "./components/createAccount";
import ChangePassword from "./components/changePassword";
import HomeBar from "./components/homeBar";
import CaloriePage from "./components/caloriePage";
import browseSessionsPage from "./components/browseSessionsPage";
import FitnessMenuPage from "./components/fitnessMenuPage";
import traineeProfilePage from "./components/traineeProfilePage";
import traineeManageProfile from "./components/traineeManageProfile";
import trainerProfilePage from "./components/trainerProfilePage";
import TrainerManageProfile from "./components/trainerManageProfile";

console.log(StartPage, SignIn, CreateAccount, ChangePassword);

function App() {
  return (
    <Router
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Switch>
        <Route exact path="/" component={StartPage} />
        <Route path="/signin" component={SignIn} />
        <Route path="/create-account" component={CreateAccount} />
        <Route path="/change-password" component={ChangePassword} />
        <Route path="/calorie-page" component={CaloriePage} />
        <Route path="/browse-sessions" component={browseSessionsPage} />
        <Route path="/fitness-menu" component={FitnessMenuPage} />
        <Route path="/trainee-profile" component={traineeProfilePage} />
        <Route path="/trainer-profile" component={trainerProfilePage} />
        <Route
          path="/manage-trainer-profile"
          component={TrainerManageProfile}
        />
        <Route
          path="/manage-trainee-profile"
          component={traineeManageProfile}
        />
      </Switch>
      <HomeBar />
    </Router>
  );
}

export default App;
