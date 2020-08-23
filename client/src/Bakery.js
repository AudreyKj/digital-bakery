import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Alert, Button } from "reactstrap";
import axios from "axios";

function Bakery(props) {
  const [w1hovered, setW1Hovered] = useState(false);
  const [w2hovered, setW2Hovered] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [orderError, setOrderError] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [nightMode, setNightMode] = useState(false);
  const [mailboxFall, setMailboxFall] = useState(false);

  console.log("props", props);

  const w1transformToCookie = () => {
    setW1Hovered(true);
  };

  const w1transformBacktoWindow = () => {
    setW1Hovered(false);
  };

  const w2transformToCookie = () => {
    setW2Hovered(true);
  };

  const w2transformBacktoWindow = () => {
    setW2Hovered(false);
  };

  const makeOrder = () => {
    axios
      .post("/order")
      .then(res => {
        console.log(res.data);
        console.log(res.data[0].order_id);
        setOrderId(res.data[0].order_id);
        setOrderConfirmation(true);
      })
      .catch(error => {
        console.log(error);
        setOrderError(true);
      });
  };

  const nightModeToggle = () => {
    props.nightMode();
  };

  return (
    <Container fluid>
      {orderConfirmation && (
        <Alert color="success">
          SUCCESS: Your order has been placed! <br />
          Your order id is: {orderId}
          <div className="d-flex justify-content-end">
            <span
              className="success-close"
              onClick={() => setOrderConfirmation(false)}
            >
              X
            </span>
          </div>
        </Alert>
      )}

      {orderError && (
        <Alert color="danger">
          FAILURE: Your order has NOT been placed! <br />
          please try again later
          <div className="d-flex justify-content-end">
            <span className="close" onClick={() => setOrderError(false)}>
              X
            </span>
          </div>
        </Alert>
      )}

      <Row className="bakery-drawing d-flex flex-column align-items-center">
        <div
          className={props.sunToggle ? "planet sun" : "planet moon"}
          onClick={nightModeToggle}
        ></div>
        <div className="roof"></div>

        <div className="body d-flex flex-column align-items-center">
          <div className="sign d-flex justify-content-center align-items-center">
            <span className="sign-writing"> COOKIE BAKERY </span>
          </div>
          <div className="windows d-flex justify-content-between">
            <div
              className={w1hovered ? "cookie" : "window window1"}
              onMouseEnter={w1transformToCookie}
              onMouseLeave={w1transformBacktoWindow}
            ></div>
            <div
              className={w2hovered ? "cookie cookie2" : "window window2"}
              onMouseEnter={w2transformToCookie}
              onMouseLeave={w2transformBacktoWindow}
            ></div>
          </div>
          <div className="door d-flex align-items-center" onClick={makeOrder}>
            <div className="door-handle"></div>
          </div>

          <div
            className={
              mailboxFall
                ? "mailboxFall d-flex flex-column align-items-center"
                : "mailbox d-flex flex-column align-items-center"
            }
            onClick={() => setMailboxFall(true)}
          >
            <div className="mailbox-opening"> </div>
            <span className="mailbox-title"> Mailbox </span>
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default Bakery;
