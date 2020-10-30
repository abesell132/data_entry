import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import AppPage from "./components/App/index";
import Home from "./components/Home/Home";
import Header from "./layouts/Header/Header";
import Register from "./pages/Authentication/Register/Register";
import Login from "./pages/Authentication/Login/Login";
import Popup from "./components/Popup/Popup";
import PrivateRoute from "./pages/Authentication/PrivateRoute";

import { setCurrentUser } from "./redux/actions/authActions";
import { logUserOut } from "./redux/actions/authActions";

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set User and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logUserOut());
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Popup />
          <Header />
          <Switch>
            <PrivateRoute path="/app/:id" component={AppPage} />
            <PrivateRoute path="/" component={Home} exact />
          </Switch>

          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
