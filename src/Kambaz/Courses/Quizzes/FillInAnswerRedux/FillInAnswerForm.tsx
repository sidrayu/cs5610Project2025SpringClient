import { Button, FormControl } from "react-bootstrap";

export default function FillInAnswerForm({ fillinanswer, setFillInAnswer, addFillInAnswer, updateFillInAnswer }: {
    fillinanswer: { id: string; title: string };
    setFillInAnswer: (FillInanswer: { id: string; title: string }) => void;
    addFillInAnswer: (FillInanswer: { id: string; title: string }) => void;
    updateFillInAnswer: (FillInanswer: { id: string; title: string }) => void;
  }) {
    return (
        <div className="d-flex align-items-center">
           
            <FormControl
            value={fillinanswer.title}
            onChange={(e) => setFillInAnswer({ ...fillinanswer, title: e.target.value })}
            className="me-2"
            />
            <Button
                variant="danger"
                onClick={() => addFillInAnswer(fillinanswer)}
                id="wd-add-todo-click"
            >
                Add
            </Button>
            <Button
                variant="primary"
                onClick={() => updateFillInAnswer(fillinanswer)}
                id="wd-update-todo-click"
            >
                Update
            </Button>
        </div>

  );}
  