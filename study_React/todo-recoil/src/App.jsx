import { RecoilRoot } from "recoil"
import TodoList from "./Todo/TodoList"

const App = () => {
  return (
    <RecoilRoot>
        <TodoList />
    </RecoilRoot>
  )
}

export default App
