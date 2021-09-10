import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Homepage from "./Homepage";
import Profile from "./Profile";
import SignIn from "./SignIn";

const App = () => {
  // check sessionStorage to see if a user is already signed in
  let user = sessionStorage.getItem("user");

  return (
    <BrowserRouter>
      <GlobalStyles />
      <div>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/users/:id">
            <Profile />
          </Route>
          <Route path="/signin">
            {/* if a user is already signed in, this redirects from sign-in to homepage */}
            {user ? <Redirect to="/" /> : <SignIn />}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
