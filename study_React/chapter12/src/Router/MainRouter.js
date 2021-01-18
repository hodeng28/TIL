import React from "react";
import { Route, Switch } from "react-router-dom";
import About from '../Page/About'
import Main from "../Page/Home";
import Skill from "../Page/Skill";
import HistoryTab from "../Page/HistoryTab";

const MainRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/About" component={About} />
      <Route path="/Skill" component={Skill} />
      <Route path="/History" component={HistoryTab} />
      <Route
        render={({ location }) => (
          <div>
            <h2>존재하지 않는 페이지:</h2>
            <p>{location.pathname}</p>
          </div>
        )}
      />
    </Switch>
  );
};

export default MainRouter;