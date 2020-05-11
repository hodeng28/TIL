import React from 'react';

function Hello({ color, name, isSpecial }) {
  return (
    <div style={{
      color
    }}>
      {isSpecial && <b>*</b>}
      안녕하세요 {name}
    </div>
  );
}
Hello.defaultProps = {
  name: 'NO! name'
}
export default Hello;