import './Style/TodoTemplate.scss'

const TodoTemplate = ({ children }) => {

  return (
    <>
      <section className="todo-template">
        <h3>일정관리</h3>  
        <div>{children}</div>
      </section>
    </>
  );
};

export default TodoTemplate;