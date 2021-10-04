import React from "react";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLaunchData } from "./features/launch/LaunchActions";
import { LaunchList } from "./features/launch/LaunchList";
import "./App.css";

function App() {

  // Populate the data stores with a dispatch call
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLaunchData());
  }, [dispatch]);

  return (
    <div class="App">
      <header class="App-header">
        <img src={"spacex.png"} class="App-logo" alt="logo" />
        <React.Fragment>
          <LaunchList />
        </React.Fragment>
      </header>
    </div>
  );
}

export default App;
