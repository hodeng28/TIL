import React from "react";
import { NavLink } from "react-router-dom";

const Skill = () => {
  const contents = [
    { id: 1, title: "HTML", description: "HTML is ..." },
    { id: 2, title: "JS", description: "JS is ..." },
    { id: 3, title: "React", description: "React is ..." },
  ];
  let skillList = [];
  for (var i = 0; i < contents.length; i++) {
    skillList.push(
      <li key={contents[i].id}>
        <NavLink to={"/eachSkill/" + contents[i].id}>{contents[i].title}</NavLink>
      </li>
    );
  }
  return (
    <>
      <h2>Skill Page</h2>
      <hr />
      <ul>{skillList}</ul>
    </>
  );
};

export default Skill;