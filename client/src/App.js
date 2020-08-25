import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Bakery from "./Bakery.js";
import "./App.scss";

function App() {
  const [night, setNight] = useState(false);
  const [sun, setSun] = useState(true);

  console.log("night", night);

  const nightModeOn = () => {
    night ? setSun(true) : setSun(false);

    night ? setNight(false) : setNight(true);
  };

  return (
    <div
      className={
        night
          ? "App night d-flex align-items-center justify-content-center"
          : "App day d-flex align-items-center justify-content-center"
      }
    >
      <Bakery nightMode={nightModeOn} sunToggle={sun}></Bakery>
    </div>
  );
}

export default App;
