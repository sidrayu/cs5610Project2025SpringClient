import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { Button, ListGroup } from "react-bootstrap";
type Todo = {
  id: string;
  title: string;
};

interface TodoProps {
  todo: Todo;
}
export default function TodoItem({ todo }: TodoProps) {
  const dispatch = useDispatch();
  return (
    <ListGroup.Item key={todo.id}>   
      <Button onClick={() => dispatch(setTodo(todo))}
              id="wd-set-todo-click"> Edit </Button>
      &nbsp;
      <Button className="btn btn-danger" onClick={() => dispatch(deleteTodo(todo.id))}
              id="wd-delete-todo-click"> Delete </Button>
      &nbsp;
      {todo.title}
    </ListGroup.Item>
);}

