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
import * as quizClient from "./client.ts"


export default function QuestionEditor() {
    const { cid, qid } = useParams();
    if (!cid || !qid) {
        return <div>Course or Quiz not found</div>;
    }
    console.log(cid, qid);
    const { pathname } = useLocation();
    const [curQuestionIndex, setCurQuestionIndex] = useState<number | -1>(-1);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [questions, setQuestions] = useState<any[]>([]);
    const handleShow = (index: any) => {
        setCurQuestionIndex(index);
        setShow(true);
    };

    // 1. async function to get quiz data
    // 2. save questions from quiz data to queestions state
    // 3. update questions state upon change
    // 4. update quiz.points using the sum of point for all questions
    // 5. async function to update quiz data

    const [quiz, setQuiz] = useState<any>({
        title: "",
        description: "",
        questions: [],
        points: 0,
    });
    
    const fetchQuizData = async () => {
        try {
            const quizData = await quizClient.findQuizById(cid!, qid);
            setQuiz(quizData);
            setQuestions(quizData.questions);
        } catch (error) {
            console.error("Error fetching quiz data:", error);
        }
    };
    useEffect(() => {
        fetchQuizData();
    }, [cid, qid]);


    const calculateTotalPoints = (questions: any[]) => {
        return questions.reduce((sum, question) => sum + (parseInt(question.points) || 0), 0);
    };


    const updateQuiz = async () => {
        try {
            let quizData = {
                ...quiz,
                questions: questions,
                points: calculateTotalPoints(questions),
            }
            console.log("Updating quiz data:", quizData);
            const response = await quizClient.updateQuizById(cid!, qid!, quizData);
            console.log("Quiz updated successfully:", response);
            if (response.acknowledged ) {
                alert("Quiz updated successfully");
            } else {
                alert("Failed to update quiz. Please try again later.");
            }
            fetchQuizData();
        } catch (error) {
            console.error("Error updating quiz data:", error);
        }
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
                <Button variant="danger" onClick={updateQuiz}>
                    Save
                </Button>
            </div>
            
            <MultipleChoiceQuestionEditor questions={questions} setQuestions={setQuestions} show={show} handleClose={handleClose} curQuestionIndex={curQuestionIndex} />

        </div>
    );
}