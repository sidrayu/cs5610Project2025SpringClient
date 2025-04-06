import { Button, ListGroup } from "react-bootstrap";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiPencil } from "react-icons/ti";
import { FormCheck } from "react-bootstrap";
export default function AnswerReduxItem({ answer, deleteAnswer, setAnswer }: {
    answer: { id: string; title: string };
    deleteAnswer: (id: string) => void;
    setAnswer: (answer: { id: string; title: string }) => void;
  }) {
    return (
      <ListGroup.Item key={answer.id} className="d-flex justify-content-between align-items-center border-0 rounded-0 mb-2">
        <FormCheck className="align-items-center mb-3" type="radio" label={answer.title} checked name="formHorizontalRadios"/>
        <div className="d-flex gap-2">
          <Button
            variant="link"
            className="p-0 text-primary"
            onClick={() => setAnswer(answer)}
            id="wd-set-todo-click"
          >
            <TiPencil size={18} />
          </Button>
          <Button
            variant="link"
            className="p-0 text-danger"
            onClick={() => deleteAnswer(answer.id)}
            id="wd-delete-todo-click"
          >
            <FaRegTrashCan size={18} />
          </Button>
        </div>
      </ListGroup.Item>

  );}