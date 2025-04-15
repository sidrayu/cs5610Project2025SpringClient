import { Button, FormControl } from "react-bootstrap";

export default function AnswerReduxForm({ answer, setAnswer, addAnswer, updateAnswer }: {
    answer: { _id: string; title: string };
    setAnswer: (answer: { _id: string; title: string }) => void;
    addAnswer: (answer: { _id: string; title: string }) => void;
    updateAnswer: (answer: { _id: string; title: string }) => void;
  }) {
    return (
        <div className="d-flex align-items-center">
            
            <FormControl
            value={answer.title}
            onChange={(e) => setAnswer({ ...answer, title: e.target.value })}
            className="me-2"
            />
            <Button
                variant="danger"
                onClick={() => addAnswer(answer)}
                id="wd-add-todo-click"
            >
                Add
            </Button>
            <Button
                variant="primary"
                onClick={() => updateAnswer(answer)}
                id="wd-update-todo-click"
            >
                Update
            </Button>
        </div>

  );}
  
  