
import { Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MultipleChoiceQuestionEditor from "./MultipleChoiceQuestionEditor";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import ShowQuestionsPage from "./ShowQuestionsPage";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router";

export default function QuestionEditor() {
    const { cid, qid } = useParams();
    console.log(cid, qid);
    const { pathname } = useLocation();
    const [curQuestionIndex, setCurQuestionIndex] = useState<number | -1>(-1);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [questions, setQuestions] = useState<any[]>([]);
    const handleShow = (index: any) => {

        setCurQuestionIndex(index);

        setShow(true);
    };

    
    

    const calculateTotalPoints = (questions: any[]) => {
        return questions.reduce((sum, question) => sum + (parseInt(question.points) || 0), 0);
    };

    const [totalPoints, setTotalPoints] = useState(0);

    useEffect(() => {
        setTotalPoints(calculateTotalPoints(questions));
    }, [questions]);

    const totalPointsDisplay = useMemo(() => `Points: ${totalPoints}`, [totalPoints]);

    return (
        <div>
            <div className="text-end mt-0 mb-2">
                <p className="fs-6 rounded px-3 py-2 shadow-sm d-inline-block transition-hover">{totalPointsDisplay}</p>
            </div>
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
           
            
            <br /><br /><br />
            


            <ShowQuestionsPage questions={questions} setShow={setShow} setCurQuestionIndex={setCurQuestionIndex} curQuestionIndex={curQuestionIndex} />   


            <div className="d-flex justify-content-center mt-3 mb-3">
            <Button variant="danger" onClick={() => handleShow(-1)} >
            <FaPlus className="position-relative me-2 " style={{ bottom: "1px" }} />
                New Question
             </Button>

            </div>
            
            <hr />

    
            <div className="d-flex justify-content-center">
                <Button variant="light" className="me-2">Cancel</Button>
                <Button variant="danger">Save</Button>
            </div>
            
            <MultipleChoiceQuestionEditor questions={questions} setQuestions={setQuestions} show={show} handleClose={handleClose} curQuestionIndex={curQuestionIndex} />

        </div>
    );
}