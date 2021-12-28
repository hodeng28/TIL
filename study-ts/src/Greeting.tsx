import React from 'react';

type GreetingProps = {
  name: string;
  address: string;
  optional?: string;
  onClick: (name: string) => void;
};

function Greetings({ name, address, optional, onClick }: GreetingProps) {
  const handleClick = () => onClick(name);
  
  return (
    <div>
      HI.{name} {address}
      {optional && <div>{optional}</div>}
      <div>
        <button onClick={handleClick}>click!</button>
      </div>
    </div>
  );
};
Greetings.defaultProps = {
  address: 'korea'
}

export default Greetings;