import Nav from "react-bootstrap/Nav";
import { Link} from "react-router-dom";
import { Route, Routes } from "react-router";
import QuestionEditor from "./questionsEdtior";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router";
export default function QuizEditor() {
    const { pathname } = useLocation();
    const { cid, qid } = useParams();
 return (
    <div>
        <Nav variant="tabs">
                <Nav.Item>
                <Nav.Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Editor/Details`}
                    active={pathname.includes(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Editor/Details`)} 
                    as={Link}>Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Editor/Questions` }
                    active={pathname.includes(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Editor/Questions`)}
                    as={Link}>Questions</Nav.Link>
                </Nav.Item>
            </Nav>

        <h1>quiz 1 editor</h1>
        <div className="flex-fill">
                <Routes>
                    <Route path ="Quizzes/:qid/Editor/Details" element={<QuizEditor/>} />
                    <Route path ="Quizzes/:qid/Editor/Questions" element={<QuestionEditor/>} />
                </Routes>
            </div>
    </div>


   
);}