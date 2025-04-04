import { FaPlus } from "react-icons/fa6";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useSelector} from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function AssignmentControls() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();
  const { cid } = useParams();
  const handleAddAssignment = () => {
    const newId = uuidv4();
    // dispatch(
    //   addAssignment({
    //     _id: newId,
    //     course: cid,
    //   })
    // );
    navigate(`/Kambaz/Courses/${cid}/Assignments/${newId}`);
  };

  return (
    <div
      id="wd-assignment-controls"
      className="d-flex align-items-center justify-content-between mb-4"
    >
      <InputGroup className="w-50">
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <FormControl placeholder="Search..." aria-label="Search" />
      </InputGroup>

      {currentUser?.role === "FACULTY" && (
        <>
          <Button
            variant="outline-secondary"
            size="lg"
            className="ms-auto float-end me-1"
            id="wd-add-group-btn"
          >
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group
          </Button>

          <Button
            variant="danger"
            size="lg"
            className="me-1 float-end"
            id="wd-add-assignment-btn"
            onClick={handleAddAssignment}
          >
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment
          </Button>

          
        </>
      )}
    </div>
  );
}

