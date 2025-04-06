
import { Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MultipleChoiceQuestionEditor from "./MultipleChoiceQuestionEditor";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function QuestionEditor({
    moduleName,
    setModuleName,
    addModule,
}: {
    moduleName: string;
    setModuleName: (title: string) => void;
    addModule: () => void;
}) {
    const { pathname } = useLocation();
     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);


    return (
        <div>
            <Nav variant="tabs">
                <Nav.Item>
                <Nav.Link to="/Kambaz/Courses/RS101/Quizzes/A1/Editor/Details" 
                    active={pathname.includes("/Kambaz/Courses/RS101/Quizzes/A1/Editor/Details")} 
                    as={Link}>Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link to="/Kambaz/Courses/RS101/Quizzes/A1/Editor/Questions" 
                    active={pathname.includes("/Kambaz/Courses/RS101/Quizzes/A1/Editor/Questions")}
                    as={Link}>Questions</Nav.Link>
                </Nav.Item>
            </Nav>

            <div className="d-flex justify-content-center mt-3 mb-3">
            <Button variant="danger" onClick={handleShow} >
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                New Question
             </Button>

            </div>
            
            <hr />

    
            <div className="d-flex justify-content-center">
                <Button variant="light" className="me-2">Cancel</Button>
                <Button variant="danger">Save</Button>
            </div>

            <MultipleChoiceQuestionEditor show={show} handleClose={handleClose} 
       moduleName={moduleName} setModuleName={setModuleName} addModule={addModule} />


        </div>
    );
}