import React from "react";

function Hello({ color, name }) {
  return <div style={{
    color
  }}>안녕하세요 {name}</div>;
}
Hello.defaultProps = {
  name: 'NO! name'
}
export default Hello;