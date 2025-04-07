import { Button, FormControl, ListGroup, FormLabel} from "react-bootstrap";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiPencil } from "react-icons/ti";

export default function FillInAnswerItem({ fillinanswer, deleteFillInAnswer, setFillInAnswer }: {
    fillinanswer: { id: string; title: string };
    deleteFillInAnswer: (id: string) => void;
    setFillInAnswer: (fillInanswer: { id: string; title: string }) => void;
  }) {
    return (
        <ListGroup.Item
        key={fillinanswer.id}
        className="d-flex justify-content-between align-items-center border-0 rounded-0 mb-2"
        >
                <FormLabel className="mb-0 me-3">
                    Possible Answer:
                </FormLabel>
                <FormControl
                value={fillinanswer.title}
                onChange={(e) =>
                setFillInAnswer({ ...fillinanswer, title: e.target.value })
                }
                className="me-3"
                style={{ flex: 1 }}
            />
            <div className="d-flex gap-2">
                <Button
                variant="link"
                className="p-0 text-primary"
                onClick={() => setFillInAnswer(fillinanswer)}
                id="wd-set-todo-click"
                >
                <TiPencil size={18} />
                </Button>
                <Button
                variant="link"
                className="p-0 text-danger"
                onClick={() => deleteFillInAnswer(fillinanswer.id)}
                id="wd-delete-todo-click"
                >
                <FaRegTrashCan size={18} />
                </Button>
            </div>
        </ListGroup.Item>
);}