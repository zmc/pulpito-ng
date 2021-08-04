import { useState } from "react";

import { Switch, Route } from "react-router-dom";

import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";
import Runs from "./pages/Runs";
import Run from "./pages/Run";
import Queue from "./pages/Queue";

import "./App.css";

function App(props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <AppBar
          setDrawerOpen={setDrawerOpen}
          darkMode={props.darkMode}
          toggleDarkMode={props.toggleDarkMode}
        />
      </header>
      <Drawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <Switch>
        <Route path="/" exact>
          <Runs />
        </Route>
        <Route path="/runs" exact>
          <Runs />
        </Route>
        <Route path="/runs/:name">
          <Run />
        </Route>
        <Route path="/queue" exact>
          <Queue />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
