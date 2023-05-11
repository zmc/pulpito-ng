import { useState } from "react";

import { Routes, Route } from "react-router-dom";

import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";
import Runs from "./pages/Runs";
import Run from "./pages/Run";
import Job from "./pages/Job";
import Queue from "./pages/Queue";

import "./App.css";

type AppProps = {
  darkMode: boolean;
  toggleDarkMode: Function;
}

function App(props: AppProps) {
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
      <div className="App-body">
        <Routes>
          <Route path="/" element={<Runs />} />
          <Route path="/runs" element={<Runs />} />
          <Route path="/runs/:name" element={<Run />} />
          <Route path="/runs/:name/jobs/:job_id" element={<Job />} />
          <Route path="/queue" element={<Queue />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
