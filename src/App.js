import { Switch, Route, Link as RouterLink } from "react-router-dom";

import Runs from "./pages/Runs";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Switch>
        <Route path="/" exact>
          <Runs />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
