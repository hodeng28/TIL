import React from "react";
import WithRouterView from "../Router/withRouterView";
import { useLocation, useRouteMatch } from "react-router-dom";

const About = () => {
  const location = useLocation();
  const match = useRouteMatch();
  console.log(location);
  console.log(match);
  return (
    <>
      <h2>About Page</h2>
      {/* <WithRouterView /> */}
    </>
  );
};

export default About;