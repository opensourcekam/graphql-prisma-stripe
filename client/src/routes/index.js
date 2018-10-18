import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "./Profile";
import Signin from "./Signin";
import Account from "./Account";
import Register from "./Register";

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <div>Hello world</div>} />
      <Route exact path="/me" component={Profile} />
      <Route exact path="/login" render={Signin} />
      <Route exact path="/register" render={Register} />
      <Route exact path="/account" component={Account} />
    </Switch>
  </Router>
);
