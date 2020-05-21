import React from "react";
import { Route, Switch } from "react-router-dom";
import getNowPlaying from '../Page/getNowPlaying';
import getPopular from '../Page/getPopular';
import getUpcoming from '../Page/getUpcoming';


const MainRouter = () => {
  return (
    <Switch>
      <Route path="/" component={getPopular} />
      <Route path="/getUpcoming" component={getUpcoming} />
      <Route path="/getNowPlaying" component={getNowPlaying} />
      <Route
        render={({ location }) => (
          <div>

          </div>
        )}
      />
    </Switch>
  );
};

export default MainRouter;