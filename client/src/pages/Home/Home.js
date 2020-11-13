import React from "react";
// import { Row, Col, Card, Icon } from "react-materialize";
// import "materialize-css";
import Headline from '../../components/Headline/Headline';
import VisualContent from '../../components/VisualContent/VisualContent';
import FiveSteps from '../../components/FiveSteps/FiveSteps';

const Home = () => {
  return (
    <React.Fragment>
      <Headline />
      <VisualContent />
      <FiveSteps />
    </React.Fragment>
  );
};

export default Home;
