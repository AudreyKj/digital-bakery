import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Bakery() {
  return (
    <Container fluid>
      <Row className="bakery-drawing d-flex flex-column align-items-center">
        <div className="sun"> </div>
        <div className="roof"></div>

        <div className="body d-flex flex-column align-items-center">
          <div className="sign d-flex justify-content-center align-items-center">
            <span className="sign-writing"> COOKIE BAKERY </span>
          </div>
          <div className="windows d-flex justify-content-between">
            <div className="window window1"></div>
            <div className="window window2"></div>
          </div>
          <div className="door d-flex align-items-center">
            <div className="door-handle"></div>
          </div>

          <div className="mailbox d-flex flex-column align-items-center">
            <div className="mailbox-opening"> </div>
            <span className="mailbox-title"> Mailbox </span>
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default Bakery;
