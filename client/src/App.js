import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <h1>Henry Pokemon</h1>
      <NavBar />
      <Switch>
        {/* <h1>Henry Pokemon</h1> */}
        <Route exact path="/">
          <Home />
          {/* {<h1>Home</h1>} */}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
