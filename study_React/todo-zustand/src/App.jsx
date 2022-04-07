import { useState } from 'react'
import './App.css'

const App = () => {
  const [count, setCount] = useState(0)

  const onClick = () => {
    setCount(count => count + 1);
  }
  return (
    <div>
      <button type="button" onClick={onClick}>
        count is: {count}
      </button>
    </div>
  )
}

export default App;
