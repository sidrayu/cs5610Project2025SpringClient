import { Button, FormControl, ListGroup, FormLabel} from "react-bootstrap";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiPencil } from "react-icons/ti";

export default function FillInAnswerItem({ fillinanswer, deleteFillInAnswer, setFillInAnswer, index }: {
    fillinanswer: string;
    deleteFillInAnswer: (index: number) => void;
    setFillInAnswer: (fillInanswer: string ) => void;
    index: number;
  }) {
    return (
        <ListGroup.Item
        key={index}
        className="d-flex justify-content-between align-items-center border-0 rounded-0 mb-2"
        >
                <FormLabel className="mb-0 me-3" style={{ color: "green" }}>
                    Possible Answer:
                </FormLabel>
                <FormControl
                value={fillinanswer}
                onChange={(e) =>
                setFillInAnswer(e.target.value )
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
                onClick={() => deleteFillInAnswer(index)}
                id="wd-delete-todo-click"
                >
                <FaRegTrashCan size={18} />
                </Button>
            </div>
        </ListGroup.Item>
);}