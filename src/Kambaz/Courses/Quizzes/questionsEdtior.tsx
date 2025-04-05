
import { Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function QuestionEditor() {
  
    const { pathname } = useLocation();


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
                <Button variant="light">
                    + New Question
                </Button>
            </div>
            
            <hr />

    
            <div className="d-flex justify-content-center">
                <Button variant="light" className="me-2">Cancel</Button>
                <Button variant="danger">Save</Button>
            </div>


        </div>
    );

}