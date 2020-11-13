import React from "react";
import "./FiveSteps.css";
import "materialize-css";
import { Row, Col, CardPanel } from "react-materialize";

const FiveSteps = () => {
  return (
    <React.Fragment>
      <Row>
        <Col m={8} s={12}>
          <CardPanel className="card">
            <div className="card-text">
              <h4>Step 1</h4>
              <p>What are stocks? How does the stock market work?</p>
            </div>
          </CardPanel>
        </Col>
      </Row>
      <Row>
        <Col m={8} s={12}>
          <CardPanel className="card-two">
            <div className="card-text-two">
              <h4>Step 2</h4>
              <p>Start small. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </CardPanel>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FiveSteps;
