import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
