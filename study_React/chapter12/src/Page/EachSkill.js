import React from "react";
import { useParams } from 'react-router-dom';

const contents = [
  { id: 1, title: "HTML", description: "HTML is ..." },
  { id: 2, title: "JS", description: "JS is ..." },
  { id: 3, title: "React", description: "React is ..." },
];

const EachSkill = () => {
  let params = useParams();
  let content_id = params.content_id;
  let selected_topic = {
    title: "sorry",
    description: "can't find"
  };
  for (let i = 0; i < contents.length; i++) {
    if (contents[i].id === Number(content_id)) {
      selected_topic = contents[i];
      break;
    }
  }
  return (
    <div>
      <h2>공부한 스킬입니다.</h2>
      <h3>{selected_topic.title}</h3>
      {selected_topic.description}
    </div>
  )
};

export default EachSkill;