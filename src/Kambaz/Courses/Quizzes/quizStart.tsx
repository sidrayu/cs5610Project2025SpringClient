import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import '../../styles.css'; // optional: external styling
import { Button, ListGroup, Container, FormCheck} from 'react-bootstrap';
import { FaQuestionCircle } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as quizClient from './client';


// Components
const QuizStart: React.FC = () => {
    const { cid, qid } = useParams();
    const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
    const quiz = quizzes.find((q: any) => q._id === qid);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    // Get current date
    const now = new Date();

    // Format to: "Nov 29 at 8:19am"
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }).toLowerCase();

    const startTime = new Date().toISOString();
    const navigate = useNavigate();

    const dateStr = `${now.toLocaleDateString('en-US', options)} at ${timeString}`;

    const currentQuestion = quiz.questions[currentIndex];

    const handleAnswer = (value: string) => {
        console.log("Answering question...",currentIndex, value);
        setAnswers({ ...answers, [currentIndex]: value });
    };

    const questionCount = getQuestionCount(quiz);

    function getQuestionCount(quiz: any): number {
        return quiz.questions.length;
    }

    const handleSubmit = async () => {
        console.log("Submitting quiz...", answers);
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`)
        const endTime = new Date().toISOString();
        
        const quizAnswer = {
            quizId: qid,
            courseId: cid,
            answers: answers,
            startTime: startTime,
            endTime: endTime,
            userId: "userId", // Replace with actual user ID
            points: quiz.points,
        };
        const res = await quizClient.createQuizAnswers(quizAnswer);
        console.log("Quiz submitted successfully", res);
    };
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
                                    checked={answers[currentIndex]?.toLowerCase() === option.toLowerCase()}
                                    onChange={() => handleAnswer(option.toLowerCase())}
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
                                    checked={answers[currentIndex] === option._id}
                                    onChange={() => handleAnswer(option._id)}
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
                                value={answers[currentIndex] || ''}
                                onChange={(e) => handleAnswer(e.target.value)}
                            />
                        </ListGroup.Item>
                    </>)}

                <br /><br />
            </ListGroup>

            <div className="flex justify-between">
                <button
                    className="px-4 py-2 me-2 bg-gray-200 rounded disabled:opacity-50"
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
            </div>
            <br/>
        </div>
        <div className="d-flex justify-content-between align-items-center border p-3 mb-3">
                     <div className="text-muted">Quiz saved at 8:19am</div>
                     <Button variant="danger" onClick={() => {
                        handleSubmit();
                    }}>Submit Quiz
                     </Button>
                 </div>
                 

                 <h4>Questions</h4>
                <ListGroup variant="flush">
                    {quiz.questions.map((_question: any, index: number) => {
                    const answered = !!answers[index];

                        return (
                        <ListGroup.Item
                            key={index}
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
