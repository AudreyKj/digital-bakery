import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import Bakery from "./Bakery.js";
import "./App.scss";

function App() {
  const [night, setNight] = useState(false);
  const [sun, setSun] = useState(true);

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
      <Helmet>
        <title>DIGITAL BAKERY </title>
        <meta name="description" content="digital bakery house" />
        <meta
          name="keywords"
          content="colors, design, drawing, interactive, fun"
        />
        <meta name="application-name" content="digital bakery" />
        <meta name="theme-color" content="black" />

        <meta
          property="og:url"
          content="https://digital-bakery.herokuapp.com/"
        />
        <meta
          property="og:description"
          content="digital bakery - drawing with interactions"
        />
      </Helmet>

      <Bakery nightMode={nightModeOn} sunToggle={sun}></Bakery>
    </div>
  );
}

export default App;
