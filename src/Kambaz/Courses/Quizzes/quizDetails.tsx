import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { findQuizById } from "./client";
import { FormCheck, ListGroup, Container, Row, Col, Table } from "react-bootstrap";

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const [quiz, setQuiz] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const isFaculty = currentUser?.role === "FACULTY";
    const questions = quiz?.questions || [];
    useEffect(() => {
        const fetchQuizDetails = async () => {
            if (!cid || !qid) return;
            
            try {
                setLoading(true);
                // First try to fetch from the database
                const fetchedQuiz = await findQuizById(cid, qid);
                setQuiz(fetchedQuiz);
            } catch (error) {
                console.error("Error fetching quiz details from database:", error);
                
                // If not found in database, try to find in Redux store
                const quizFromStore = quizzes.find((q: any) => q._id === qid);
                if (quizFromStore) {
                    console.log("Found quiz in Redux store:", quizFromStore);
                    setQuiz(quizFromStore);
                }
            } finally {
                setLoading(false);
            }
        };
        
        fetchQuizDetails();
    }, [cid, qid, quizzes]);
    
    if (loading) {
        return <div>Loading quiz details...</div>;
    }
    
    if (!quiz) {
        return <div>Quiz not found</div>;
    }

    const formatDate = (dateString: string) => {
        if (!dateString) return "Not set";
        
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: 'UTC'
        }).replace(',', ' at');
    };

    const buttonStyle = {
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        color: '#6c757d',
        padding: '6px 12px',
        borderRadius: '4px',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px'
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-center gap-2 mb-3">
                {isFaculty && (
                    <>
                        <Link 
                            to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Preview`} 
                            style={buttonStyle}
                        >
                            Preview
                        </Link>
                        <Link 
                            to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Editor`} 
                            style={buttonStyle}
                            id="wd-quiz-edit-button"
                        >
                            <FaPencilAlt size={14} />
                            Edit
                        </Link>

                        <div>
                        <br />
                        </div>
                    </>
                )}
            </div>


            <div className="mb-4">
                {isFaculty && (
                    <hr className="mb-4" />
             )}
                <h2>{quiz.title}</h2>
                {!isFaculty && (
                    <hr className="mb-4" />
             )}
                
                <br /><br />
                {!isFaculty && (
                    <><div className="text-center mt-3">
                        <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Start`}>
                            <Button variant="danger" size="lg">Start Quiz</Button>
                        </Link>
                    </div>

                    {/* Quiz Review */}
                    <div className=" mt-3">
                    <Container className="border-top pt-3 mt-3">
                            <Row >
                                <Col xs="auto" className="fw-bold">Due:</Col>{quiz.untilDate}
                                <Col xs="auto" className="fw-bold">Points:</Col>{quiz.points}
                                <Col xs="auto" className="fw-bold">Questions:</Col>{questions.length}
                            </Row>
                            <Row>
                                <Col xs="auto" className="fw-bold">Available:</Col>{quiz.availableDate}
                                <Col xs="auto" className="fw-bold">Time Limit:</Col>{quiz.timeLimit} Minutes
                            </Row>
                        
                            <hr />
                            <br />
                            <p className="text-sm text-gray-600 mb-4">
                            {new Date() > new Date(quiz.untilDate)
                                ? `This quiz was locked: ${quiz.untilDate}`
                                : `This quiz will be locked: ${quiz.untilDate}`}
                            </p>
                            <h4 className="mb-4">Attempt History</h4>

                            <Table className="mb-4">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Attempt</th>
                                    <th>Time</th>
                                    <th>Score</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="fw-bold">LATEST</td>
                                    <td className="text-danger">Attempt 1</td>
                                    <td>8 minutes</td>
                                    <td>29 out of 29</td>
                                </tr>
                                </tbody>
                            </Table>
                            <hr/>

                            <div>
                                <p><strong>Score for this quiz:</strong> <strong>29</strong> out of 29</p>
                                <p>Submitted Jan 27 at 8:57pm</p>
                                <p>This attempt took 8 minutes.</p>
                            </div>
                        
                            {questions.map((question: any) => (
                                <ListGroup className="rounded-0" id="wd-modules">
                                    {question.type === "multipleChoice" && (
                                    <>
                                        {/* multipleChoice */}
                                        <ListGroup.Item className="wd-quiz p-0 mb-0 fs-5 border-secondary">
                                            <div className="wd-title d-flex align-items-center justify-content-between p-2 ps-3 bg-secondary text-dark">
                                                <div className="d-flex align-items-center">
                                                    <span className="me-2 mb-0 fw-bold fs-5"> {question.title} </span>
                                                </div>
                                                <div className="d-flex align-items-center gap-2">
                                                    <p className="me-2 mb-0 fw-bold fs-5">Pts: {question.points} </p>
                                                </div>
                                            </div> 
                                        </ListGroup.Item>
                                        <ListGroup.Item className="wd-quiz ps-3 p-10 mb-0 fs-5 border-secondary">
                                            <div className="d-flex align-items-center gap-2">
                                                <p className="me-2 mb-0 fs-5">{question.question} </p>
                                                
                                            </div>
                                            <hr />
                                            {question.choices.map((choice: any) => (
                                                
                                                <FormCheck className="align-items-center mb-3" type="radio" label={choice.title} name="formHorizontalRadios"/>
                                                
                                            ))}
                                            
                                        </ListGroup.Item>
                                    </>)}

                                    {question.type === "trueFalse" && (
                                    <>
                                    {/* trueFalse */}
                                        <ListGroup.Item className="wd-quiz p-0 mb-0 fs-5 border-secondary">
                                        <div className="wd-title d-flex align-items-center justify-content-between p-2 ps-3 bg-secondary text-dark">
                                            <div className="d-flex align-items-center">
                                                <span className="me-2 mb-0 fw-bold fs-5"> {question.title}</span>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <p className="me-2 mb-0 fw-bold fs-5">Pts: {question.points}</p>
                                            </div>
                                        </div> 
                                        </ListGroup.Item>
                                        <ListGroup.Item className="wd-quiz ps-3 p-10 mb-0 fs-5 border-secondary">
                                            <div className="d-flex align-items-center gap-2">
                                                <p className="me-2 mb-0 fs-5">{question.question}</p>
                                            </div>
                                            <hr />
                                            <FormCheck className="align-items-center mb-3" type="radio" label="True" name="formHorizontalRadios"/>
                                            <hr />
                                            <FormCheck className="align-items-center mb-3" type="radio" label="False" name="formHorizontalRadios"/>
                                        </ListGroup.Item>
                                    </>)}

                                    {question.type === "fillInTheBlank" && (
                                    <>
                                    {/* fillInTheBlank */}
                                    <ListGroup.Item className="wd-quiz p-0 mb-0 fs-5 border-secondary">
                                        <div className="wd-title d-flex align-items-center justify-content-between p-2 ps-3 bg-secondary text-dark">
                                            <div className="d-flex align-items-center">
                                                <span className="me-2 mb-0 fw-bold fs-5"> {question.title}</span>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <p className="me-2 mb-0 fw-bold fs-5">Pts: {question.points}</p>
                                            </div>
                                        </div> 
                                    </ListGroup.Item>
                                    <ListGroup.Item className="wd-quiz ps-3 p-10 mb-0 fs-5 border-secondary">
                                        <div className="d-flex align-items-center gap-2">
                                            <p className="me-2 mb-0 fs-5">{question.question}</p>
                                        </div>
                                    </ListGroup.Item>
                                    </>)}

                                <br /><br />
                                </ListGroup>
                                ))}
                        </Container>

                        
                    </div></>
                )}
            </div>


            <div className="row justify-content-center">
            {isFaculty && (
                <div className="col-12 col-lg-8">
                    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                        <table className="w-100">
                            <tbody>
                                <tr>
                                    <td className="text-end pe-3 " style={{ width: "50%", fontWeight: "bold" }}>Quiz Type</td>
                                    <td className="text-start ps-3" style={{ width: "50%" }}>
                                        {quiz.type || "Graded Quiz"}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-end pe-3" style={{ width: "50%", fontWeight: "bold" }}>Points</td>
                                    <td className="text-start ps-3">
                                        {quiz.points || "0"} points
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-end pe-3" style={{ width: "50%", fontWeight: "bold" }}>Assignment Group</td>
                                    <td className="text-start ps-3">
                                        {quiz.group || "Quizzes"}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-end pe-3" style={{ width: "50%", fontWeight: "bold" }}>Shuffle Answers</td>
                                    <td className="text-start ps-3">
                                        {quiz.shuffle === false ? "No" : "Yes"}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-end pe-3" style={{ width: "50%", fontWeight: "bold" }}>Time Limit</td>
                                    <td className="text-start ps-3">
                                        {quiz.timeLimit || "20"} Minutes
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-end pe-3" style={{ width: "50%", fontWeight: "bold" }}>Multiple Attempts</td>
                                    <td className="text-start ps-3">
                                        {quiz.multipleAttempts ? "Yes" : "No"}
                                    </td>
                                </tr>
                                {quiz.multipleAttempts && (
                                    <tr>
                                        <td className="text-end pe-3" style={{ width: "50%", fontWeight: "bold" }}>How Many Attempts</td>
                                        <td className="text-start ps-3">
                                            {quiz.numberAttempts || "1"}
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <td className="text-end pe-3" style={{ width: "50%", fontWeight: "bold" }}>Show Correct Answers</td>
                                    <td className="text-start ps-3">
                                        {quiz.showAnswersImmediately ? "Immediately" : 
                                         quiz.showAnswersAfter ? `After ${formatDate(quiz.showAnswersAfter)}` : 
                                         "Never"}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-end pe-3" style={{ width: "50%", fontWeight: "bold" }}>Access Code</td>
                                    <td className="text-start ps-3">
                                        {quiz.accessCode || "None"}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-end pe-3" style={{ width: "50%", fontWeight: "bold" }}>One Question at a Time</td>
                                    <td className="text-start ps-3">
                                        {quiz.oneQuestionAtATime === false ? "No" : "Yes"}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-end pe-3" style={{ width: "50%", fontWeight: "bold" }}>Webcam Required</td>
                                    <td className="text-start ps-3">
                                        {quiz.webcam ? "Yes" : "No"}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-end pe-3" style={{ width: "50%", fontWeight: "bold" }}>Lock Questions After Answering</td>
                                    <td className="text-start ps-3">
                                        {quiz.lock ? "Yes" : "No"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>



                    <div className="mt-5">
                        <table className="w-100" style={{ borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                                    <th style={{ width: "25%", padding: "8px 0" }}>Due</th>
                                    <th style={{ width: "25%", padding: "8px 0" }}>For</th>
                                    <th style={{ width: "25%", padding: "8px 0" }}>Available from</th>
                                    <th style={{ width: "25%", padding: "8px 0" }}>Until</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                                    <td style={{ padding: "8px 0" }}>{formatDate(quiz.dueDate)}</td>
                                    <td style={{ padding: "8px 0" }}>Everyone</td>
                                    <td style={{ padding: "8px 0" }}>{formatDate(quiz.availableDate)}</td>
                                    <td style={{ padding: "8px 0" }}>{formatDate(quiz.untilDate)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}
