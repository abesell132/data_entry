import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./components/Home/index";
import Header from "./components/Header/index";
import SearchResults from "./components/SearchResults/index";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Route path="/" component={Home} exact />
          <Route path="/searchResults" component={SearchResults} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
