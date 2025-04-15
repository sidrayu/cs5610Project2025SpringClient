import { Button, FormControl } from "react-bootstrap";


export default function FillInAnswerForm({ index, fillinanswer, setFillInAnswer, addFillInAnswer, updateFillInAnswer }: {
    fillinanswer: string;
    setFillInAnswer: (FillInanswer: string ) => void;
    addFillInAnswer: (FillInanswer: string) => void;
    updateFillInAnswer: (index: number, FillInanswer: string ) => void;
    index: number;
  }) {

    return (
        <div className="d-flex align-items-center">
           
            <FormControl
            value={fillinanswer}
            onChange={(e) => setFillInAnswer(e.target.value )}
            className="me-2"
            />
            <Button
                variant="danger"
                onClick={() => {addFillInAnswer(fillinanswer);}}
                id="wd-add-todo-click"
            >
                Add
            </Button>
            <Button
                variant="primary"
                onClick={() => {updateFillInAnswer(index, fillinanswer);}}
                id="wd-update-todo-click"
            >
                Update
            </Button>
        </div>

  );}
  