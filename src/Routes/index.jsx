import { Route, Switch } from "react-router-dom";
import { Register } from "../Pages/Register";
import { Signin } from "../Pages/Signin";
import { Dashboard } from "../Pages/Dashboard";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Register />
      </Route>
      <Route exact path="/signin">
        <Signin />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
    </Switch>
  );
};
