import { Button, FormControl, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
    return (
      <ListGroup.Item>
      <Button className="btn btn-success" onClick={() => dispatch(addTodo(todo))}
              id="wd-add-todo-click"> Add </Button>
              &nbsp;
      <Button className="btn btn-warning" onClick={() => dispatch(updateTodo(todo))}
              id="wd-update-todo-click"> Update </Button>      
      <FormControl
        defaultValue={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}/>
    </ListGroup.Item>

  );}
  