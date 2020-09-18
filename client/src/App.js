import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./components/Home/index";
import Header from "./components/Header/index";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Route path="/" component={Home} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
