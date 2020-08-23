import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Bakery from "./Bakery.js";
import "./App.scss";

function App() {
  return (
    <div className="App d-flex align-items-center justify-content-center">
      <Bakery> </Bakery>
    </div>
  );
}

export default App;
