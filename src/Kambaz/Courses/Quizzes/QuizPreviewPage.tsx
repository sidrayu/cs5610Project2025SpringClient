import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { useParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";

import { AlertCircle } from 'lucide-react'; // or use any alert icon
import '../../styles.css'; // optional: external styling
import { GrEdit } from "react-icons/gr";
import { ListGroup, FormCheck } from "react-bootstrap";

export type Question = {
    id: number;
    type: 'truefalse' | 'multiple' | 'fillblank';
    questionText: string;
    options?: string[];
    correctAnswer: string;
    points: number;
};

export type Quiz = {
    title: string;
    questions: Question[];
    startTime: Date;
};

// Components
const QuizPreviewPage: React.FC = () => {
    const { pathname } = useLocation();
    const { cid, qid } = useParams();
    const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
    const quiz = quizzes.find((q: any) => q._id === qid);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [submitted, setSubmitted] = useState(false);

    if (!quiz) {
        return <div>Loading quiz or quiz not found...</div>;
    }

    // Get current date
    const now = new Date();

    // Format to: "Nov 29 at 8:19am"
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }).toLowerCase();

    const dateStr = `${now.toLocaleDateString('en-US', options)} at ${timeString}`;

    const currentQuestion = quiz.questions[currentIndex];
    console.log("Current Question: ", currentQuestion);
    // console.log("Current Index: ", currentIndex);
    // console.log("Answers: ", answers);
    // console.log("Submitted: ", submitted);
    // console.log("Quiz: ", quiz);

    const handleAnswer = (value: string) => {
        console.log("handleAnswer.value", value);
        console.log("handleAnswer.currentQuestion", currentQuestion);
        console.log("handleAnswer.Answers1: ", answers);
        setAnswers({ ...answers, [currentQuestion._id]: value });
        console.log("handleAnswer.Answers2: ", answers);
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const score = quiz.questions.reduce((total: any, q: any) => {
        const answer = answers[q.id];
        if (submitted && answer === q.correctAnswer) {
            return total + q.points;
        }
        return total;
    }, 0);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
            <div className="preview-banner">
                <AlertCircle className="icon" />
                <span>This is a preview of the published version of the quiz</span>
            </div>
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
                                    checked={answers[currentQuestion._id] === option}
                                    onChange={() => handleAnswer(option)}
                                    disabled={submitted}
                                    key={option}
                                    id={`wd-quiz-${option}`}
                                    value={option}
                                />
                            ))}
                            {/* {question.choices.map((choice: any) => (
                                <FormCheck className="align-items-center mb-3" type="radio" label={choice.title} name="formHorizontalRadios" />
                            ))} */}
                            {/* 
                            <div className="space-y-2">
                                {['True', 'False'].map((option) => (
                                    <label
                                        key={option}
                                        className={`block p-2 rounded cursor-pointer hover:bg-gray-100 ${answers[currentQuestion._id] === option ? 'bg-gray-100' : ''}`}
                                        onClick={() => !submitted && handleAnswer(option)}
                                    >
                                        <input
                                            type="radio"
                                            name={`q${currentQuestion._id}`}
                                            value={option}
                                            checked={answers[currentQuestion._id] === option}
                                            onChange={() => handleAnswer(option)}
                                            disabled={submitted}
                                        />{' '}
                                        {option}
                                    </label>
                                ))}
                            </div> */}
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

                            {/* <div className="space-y-2">
                                {currentQuestion.choices?.map((opt: any) => (
                                    <label key={opt._id} className="block">
                                        <input
                                            type="radio"
                                            name={`q${opt._id}`}
                                            value={opt.title}
                                            // checked={answers[currentQuestion._id][opt._id] === opt._id}
                                            onChange={() => handleAnswer(opt)}
                                            disabled={submitted}
                                        />{' '}
                                        {opt}
                                    </label>
                                ))}
                            </div> */}
                            {/* {question.choices.map((choice: any) => (
                                <FormCheck className="align-items-center mb-3" type="radio" label={choice.title} name="formHorizontalRadios" />
                            ))} */}

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
                                    <button
                                        className="btn btn-link p-0 text-danger fs-3"
                                        id="wd-edit-question"
                                        // onClick={() => { console.log("question index", questions.indexOf(question)); handleShow(questions.indexOf(question)); }}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <GrEdit />
                                    </button>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-quiz ps-3 p-10 mb-0 fs-5 border-secondary">
                            <div className="d-flex align-items-center gap-2">
                                <p className="me-2 mb-0 fs-5">{currentQuestion.question}</p>
                            </div>
                        </ListGroup.Item>
                    </>)}

                <br /><br />
            </ListGroup>



            <div className="border rounded p-4 mb-6">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <span className="font-semibold text-lg">{currentQuestion.title}</span>
                    <span className="text-gray-600 text-sm">{currentQuestion.points} ptsDD</span>
                </div>

                <p className="mb-4 whitespace-pre-line">{currentQuestion.question}</p>

                {/* {currentQuestion.type === 'trueFalse' && (
                    <div className="space-y-2">
                        {['True', 'False'].map((option) => (
                            <label
                                key={option}
                                className={`block p-2 rounded cursor-pointer hover:bg-gray-100 ${answers[currentQuestion._id] === option ? 'bg-gray-100' : ''}`}
                                onClick={() => !submitted && handleAnswer(option)}
                            >
                                <input
                                    type="radio"
                                    name={`q${currentQuestion._id}`}
                                    value={option}
                                    checked={answers[currentQuestion._id] === option}
                                    onChange={() => handleAnswer(option)}
                                    disabled={submitted}
                                />{' '}
                                {option}
                            </label>
                        ))}
                    </div>
                )} */}

                {/* {currentQuestion.type === 'multipleChoice' && (
                    <div className="space-y-2">
                        {currentQuestion.options?.map((opt) => (
                            <label key={opt} className="block">
                                <input
                                    type="radio"
                                    name={`q${currentQuestion._id}`}
                                    value={opt}
                                    checked={answers[currentQuestion._id] === opt}
                                    onChange={() => handleAnswer(opt)}
                                    disabled={submitted}
                                />{' '}
                                {opt}
                            </label>
                        ))}
                    </div>
                )} */}

                {/* {currentQuestion.type === 'fillInTheBlank' && (
                    <input
                        type="text"
                        className="mt-2 border px-2 py-1 rounded"
                        value={answers[currentQuestion._id] || ''}
                        onChange={(e) => handleAnswer(e.target.value)}
                        disabled={submitted}
                    />
                )} */}

                {submitted && answers[currentQuestion._id] !== currentQuestion.correctAnswer && (
                    <p className="text-red-600 mt-2">Incorrect</p>
                )}
                {submitted && answers[currentQuestion._id] === currentQuestion.correctAnswer && (
                    <p className="text-green-600 mt-2">Correct</p>
                )}
            </div>

            <div className="flex justify-between">
                <button
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    onClick={() => setCurrentIndex((i) => i - 1)}
                    disabled={currentIndex === 0}
                >
                    Previous
                </button>

                {currentIndex < quiz.questions.length - 1 ? (
                    <button
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        onClick={() => setCurrentIndex((i) => i + 1)}
                        disabled={currentIndex === quiz.questions.length - 1}
                    >
                        Next
                    </button>
                ) : (
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded"
                        onClick={handleSubmit}
                    >
                        Submit Quiz
                    </button>
                )}
            </div>

            {submitted && (
                <div className="mt-6 border-t pt-4">
                    <p className="text-lg font-semibold">Quiz completed. You scored {score} out of {quiz.questions.reduce((a, q) => a + q.points, 0)}.</p>
                    <button
                        className="mt-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={() => alert('Navigate to Quiz Editor')}
                    >
                        Keep Editing This Quiz
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizPreviewPage;
