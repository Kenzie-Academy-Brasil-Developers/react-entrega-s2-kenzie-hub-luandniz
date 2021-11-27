import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import { Register } from "../Pages/Register";
import { Signin } from "../Pages/Signin";
import { Dashboard } from "../Pages/Dashboard";

export const Routes = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@kenziehub:token"));

    if (token) {
      return setAuthenticated(true);
    }
  }, [authenticated]);

  return (
    <Switch>
      <Route exact path="/">
        <Register authenticated={authenticated} />
      </Route>
      <Route exact path="/signin">
        <Signin
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
    </Switch>
  );
};
