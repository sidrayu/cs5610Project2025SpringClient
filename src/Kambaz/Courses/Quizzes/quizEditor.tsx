import Nav from "react-bootstrap/Nav";
import { Link} from "react-router-dom";
import { Route, Routes } from "react-router";
import QuestionEditor from "./questionsEdtior";
import { useLocation } from "react-router-dom";
export default function QuizEditor() {
    const { pathname } = useLocation();
 return (
    <div>
        <Nav variant="tabs">
                <Nav.Item>
                <Nav.Link to="/Kambaz/Courses/RS101/Quizzes/A1/Editor/Details" 
                    active={pathname.includes("/Kambaz/Courses/1234/Quizzes/A1/Editor/Details")} 
                    as={Link}>Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link to="/Kambaz/Courses/RS101/Quizzes/A1/Editor/Questions" 
                    active={pathname.includes("/Kambaz/Courses/1234/Quizzes/A1/Editor/Questions")}
                    as={Link}>Questions</Nav.Link>
                </Nav.Item>
            </Nav>

        <h1>quiz 1 editor</h1>
        <div className="flex-fill">
                <Routes>
                    <Route path ="Quizzes/:qid/Editor/Details" element={<QuizEditor/>} />
                    <Route path ="Quizzes/:qid/Editor/Questions" element={<QuestionEditor moduleName={""} setModuleName={function (title: string): void {
                     throw new Error("Function not implemented.");
                 } } addModule={function (): void {
                     throw new Error("Function not implemented.");
                 } }/>} />
                </Routes>
            </div>
    </div>


   
);}