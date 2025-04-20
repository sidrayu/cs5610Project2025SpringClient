import React, { useState } from 'react';
import { useParams } from "react-router";

import { useSelector } from "react-redux";

import { AlertCircle } from 'lucide-react'; // or use any alert icon
import '../../styles.css'; // optional: external styling
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
    const { qid } = useParams();
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
    // console.log("Current Question: ", currentQuestion);
    // console.log("Current Index: ", currentIndex);
    console.log("Answers: ", answers);
    // console.log("Submitted: ", submitted);
    // console.log("Quiz: ", quiz);

    const handleAnswer = (value: string) => {
        // console.log("handleAnswer.value", value);
        // console.log("handleAnswer.currentQuestion", currentQuestion);
        // console.log("handleAnswer.Answers1: ", answers);
        setAnswers({ ...answers, [currentQuestion._id]: value });
        // console.log("handleAnswer.Answers2: ", answers);
    };

    const isIncorrect = (question: any) => {
        const answer: any = answers[question._id];
        if (!answer) {
            console.log("Answer not provided");
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

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const score = quiz.questions.reduce((total: any, q: any) => {
        if (submitted && isIncorrect(q)) {
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
                <ListGroup.Item className="wd-quiz ps-3 p-10 mb-0 fs-5 border-secondary">
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
                    <p className="text-lg font-semibold">Quiz completed. You scored {score} out of {quiz.questions.reduce((a: any, q: any) => a + q.points, 0)}.</p>
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
