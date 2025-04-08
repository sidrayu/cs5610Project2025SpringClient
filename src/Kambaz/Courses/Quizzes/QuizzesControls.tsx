import { FaPlus } from "react-icons/fa6";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addQuiz } from "./reducer";
export default function QuizzesControls() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
    const navigate = useNavigate();
    const { cid } = useParams();
    const dispatch = useDispatch();

    const handleAddQuiz = () => {
        const newId = uuidv4();
        dispatch(addQuiz({
            _id: newId,
            course: cid,
            title: "New Quiz",
            description: "New Quiz Description",
            points: 100,
            startdate: "",
            duedate: "",
            untildate: "",
            modules: ""
        }));
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${newId}`);
    };
 return (
  <div id="wd-assignment-controls" className="d-flex align-items-center justify-content-between mb-4">
  <InputGroup className="w-50">
    <InputGroup.Text>
      <FaSearch />
    </InputGroup.Text>
    <FormControl
      placeholder="Search..."
      aria-label="Search"
    />
    
  </InputGroup>
    <div className="d-flex justify-content-end">
    {currentUser?.role === "FACULTY" && (
      <>
     <Button variant="danger" size="lg" className="me-1 float-end ms-5" id="wd-add-assignment-btn" onClick={handleAddQuiz}>
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Quiz
     </Button>
     <Button variant="outline-secondary" size="lg" className="me-1 float-end" id="wd-add-group-btn">
     <IoEllipsisVertical className="fs-4" />
     </Button>
     </>
            )}
     </div>

     
</div>
);}