import React from 'react';
import WithRouterView from '../Router/WithRouterView';
import { useLocation, useRouteMatch } from 'react-router-dom';

const About = () => {
  const location = useLocation();
  const match = useRouteMatch();
  console.log(location);
  console.log(match);
  return (
    <div>
      <h1>소개</h1>
      {/* <WithRouterView /> */}
    </div>
  );
};

export default About;