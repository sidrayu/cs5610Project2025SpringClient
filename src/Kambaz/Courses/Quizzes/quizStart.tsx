import React, { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import '../../styles.css'; // optional: external styling
import { Button, ListGroup, Container, FormCheck} from 'react-bootstrap';
import { FaPencilAlt, FaQuestionCircle } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
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


// Components
const QuizStart: React.FC = () => {
    const { cid, qid } = useParams();
    const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
    const quiz = quizzes.find((q: any) => q._id === qid);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [submitted, setSubmitted] = useState(false);
    // Get current date
    const now = new Date();

    // Format to: "Nov 29 at 8:19am"
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }).toLowerCase();

    const navigate = useNavigate();

    const dateStr = `${now.toLocaleDateString('en-US', options)} at ${timeString}`;

    const currentQuestion = quiz.questions[currentIndex];

    const handleAnswer = (value: string) => {
        setAnswers({ ...answers, [currentQuestion._id]: value });
    };

    const isIncorrect = (question: any) => {
        const answer: any = answers[question._id];
        if (!answer) {
            return false; // No answer provided
        }
        if (question.type === 'trueFalse') {
            return answer.toLowerCase() === question.answer.toLowerCase();
        } else if (question.type === 'multipleChoice') {
            return answer === question.answer;
        } else if (question.type === 'fillInTheBlank') {
            for (const expectedAnswer of question.answers) {
                if (answer.toLowerCase() === expectedAnswer.toLowerCase()) {
                    return true; // Correct answer
                }
            }
            return false; // No correct answer found
        }
        return false;
    };

    const score = quiz.questions.reduce((total: any, q: any) => {
        if (submitted && isIncorrect(q)) {
            return total + q.points;
        }
        return total;
    }, 0);
    const questionCount = getQuestionCount(quiz);

    function getQuestionCount(quiz: any): number {
        return quiz.questions.length;
    }
    return (
        <Container className="mt-3">
        <div className="max-w-3xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>  
            <Container className="border-top pt-3 mt-3">
                <Row >
                    <Col xs="auto" className="fw-bold">Due:</Col>{quiz.untilDate}
                    <Col xs="auto" className="fw-bold">Points:</Col>{quiz.points}
                    <Col xs="auto" className="fw-bold">Questions:</Col>{questionCount}
                </Row>
                <Row>
                    <Col xs="auto" className="fw-bold">Available:</Col>{quiz.availableDate}
                    <Col xs="auto" className="fw-bold">Time Limit:</Col>{quiz.timeLimit} Minutes
                </Row>
            </Container>

            <hr/>
            <p className="text-sm text-gray-600 mb-4">
                Started: {dateStr}
            </p>
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">Quiz Instructions</h2>

            <ListGroup className="rounded-0" id="wd-modules">

                {currentQuestion.type === "trueFalse" && (
                    <>
                        {/* trueFalse */}
                        <ListGroup.Item className="wd-quiz p-0 mb-0 fs-5 border-secondary">
                            <div className="wd-title d-flex align-items-center justify-content-between p-2 ps-3 bg-secondary text-dark">
                                <div className="d-flex align-items-center">
                                    <span className="me-2 mb-0 fw-bold fs-5"> {currentQuestion.title}</span>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <p className="me-2 mb-0 fw-bold fs-5">Pts: {currentQuestion.points}</p>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-quiz ps-3 p-10 mb-0 fs-5 border-secondary">
                            <div className="d-flex align-items-center gap-2">
                                <p className="me-2 mb-0 fs-5">{currentQuestion.question}</p>
                            </div>
                            <hr />
                            {['True', 'False'].map((option) => (
                                <FormCheck
                                    className="align-items-center mb-3"
                                    type="radio"
                                    label={option}
                                    name="formHorizontalRadios"
                                    checked={answers[currentQuestion._id]?.toLowerCase() === option.toLowerCase()}
                                    onChange={() => handleAnswer(option)}
                                    disabled={submitted}
                                    key={option}
                                    id={`wd-quiz-${option}`}
                                    value={option}
                                />
                            ))}
                        </ListGroup.Item>
                    </>)}

                {currentQuestion.type === "multipleChoice" && (
                    <>
                        {/* multipleChoice */}
                        <ListGroup.Item className="wd-quiz p-0 mb-0 fs-5 border-secondary">
                            <div className="wd-title d-flex align-items-center justify-content-between p-2 ps-3 bg-secondary text-dark">
                                <div className="d-flex align-items-center">
                                    <span className="me-2 mb-0 fw-bold fs-5"> {currentQuestion.title} </span>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <p className="me-2 mb-0 fw-bold fs-5">Pts: {currentQuestion.points} </p>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-quiz ps-3 p-10 mb-0 fs-5 border-secondary">
                            <div className="d-flex align-items-center gap-2">
                                <p className="me-2 mb-0 fs-5">{currentQuestion.question} </p>
                            </div>
                            <hr />

                            {currentQuestion.choices.map((option: any) => (
                                <FormCheck
                                    className="align-items-center mb-3"
                                    type="radio"
                                    label={option.title}
                                    name="formHorizontalRadios"
                                    checked={answers[currentQuestion._id] === option._id}
                                    onChange={() => handleAnswer(option._id)}
                                    disabled={submitted}
                                    key={option._id}
                                    id={`wd-quiz-${option._id}`}
                                    value={option.title}
                                />
                            ))}
                        </ListGroup.Item>
                    </>)}

                {currentQuestion.type === "fillInTheBlank" && (
                    <>
                        {/* fillInTheBlank */}
                        <ListGroup.Item className="wd-quiz p-0 mb-0 fs-5 border-secondary">
                            <div className="wd-title d-flex align-items-center justify-content-between p-2 ps-3 bg-secondary text-dark">
                                <div className="d-flex align-items-center">
                                    <span className="me-2 mb-0 fw-bold fs-5"> {currentQuestion.title}</span>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <p className="me-2 mb-0 fw-bold fs-5">Pts: {currentQuestion.points}</p>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-quiz ps-3 p-10 mb-0 fs-5 border-secondary">
                            <div className="d-flex align-items-center gap-2">
                                <p className="me-2 mb-0 fs-5">{currentQuestion.question}</p>
                            </div>
                            <input
                                type="text"
                                className="mt-2 border px-2 py-1 rounded"
                                value={answers[currentQuestion._id] || ''}
                                onChange={(e) => handleAnswer(e.target.value)}
                                disabled={submitted}
                            />
                        </ListGroup.Item>
                    </>)}

                <br /><br />
                <ListGroup.Item className="wd-quiz ps-3 p-10 mb-0 fs-5 border-0">
                    {submitted && !isIncorrect(currentQuestion) && (
                        <div className="d-flex align-items-center gap-2">
                            <p className="me-2 mb-0 fs-5 text-danger">Incorrect</p>
                        </div>
                    )}
                    {submitted && isIncorrect(currentQuestion) && (
                        <div className="d-flex align-items-center gap-2">
                            <p className="me-2 mb-0 fs-5 text-success">Correct</p>
                        </div>
                    )}
                </ListGroup.Item>
            </ListGroup>

            <div className="flex justify-between">
                <button
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    onClick={() => setCurrentIndex((i) => i - 1)}
                    disabled={currentIndex === 0}
                >
                    Previous
                </button>
                <button
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    onClick={() => setCurrentIndex((i) => i + 1)}
                    disabled={currentIndex === quiz.questions.length - 1}
                >
                    Next
                </button>
                <br/>
        
            </div>
        </div>
        <div className="d-flex justify-content-between align-items-center border p-3 mb-3">
                     <div className="text-muted">Quiz saved at 8:19am</div>
                     <Button variant="outline-dark" onClick={() => {
                        navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
                    }}>Submit Quiz
                     </Button>
                 </div>
                 

                 <h4>Questions</h4>
                 {/* <ListGroup variant="flush">
                 {Array.from({ length: questionCount}, (_, index) => (
                    <ListGroup.Item key={index} className="ps-0 border-0 d-flex align-items-center">
                    <FaQuestionCircle className="me-2 text-muted" />
                    <span className="text-danger fw-bold">Question {index + 1}</span>
                    </ListGroup.Item>
                ))}
                </ListGroup> */}
                <ListGroup variant="flush">
                    {quiz.questions.map((question: any, index: number) => {
                    const answered = !!answers[question._id];

                        return (
                        <ListGroup.Item
                            key={question._id}
                            className="ps-0 border-0 d-flex align-items-center"
                        >
                            {answered ? (
                            <FaCheckCircle className="me-2 text-success" />
                            ) : (
                            <FaQuestionCircle className="me-2 text-muted" />
                            )}
                            <span className="text-danger fw-bold">Question {index + 1}</span>
                        </ListGroup.Item>
                        );
                })}
                </ListGroup>
                
        </Container>
    );
};

export default QuizStart;
