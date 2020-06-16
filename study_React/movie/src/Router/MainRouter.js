import React from "react";
import { Route, Switch } from "react-router-dom";
import getNowPlaying from '../Page/getNowPlaying';
import getPopular from '../Page/getPopular';
import getUpcoming from '../Page/getUpcoming';


const MainRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={getNowPlaying} />
      <Route exact path="/getUpcoming" component={getUpcoming} />
      <Route exact path="/getNowPlaying" component={getPopular} />
      <Route exact path="Seearch" component={Search} />
    </Switch>
  );
};

export default MainRouter;