import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { useParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";

import { AlertCircle } from 'lucide-react'; // or use any alert icon
import '../../styles.css'; // optional: external styling

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
    const options = { month: 'short', day: 'numeric' };
    const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }).toLowerCase();

    const dateStr = `${now.toLocaleDateString('en-US', options)} at ${timeString}`;

    const currentQuestion = quiz.questions[currentIndex];
    console.log("Current Question: ", currentQuestion);
    console.log("Current Index: ", currentIndex);
    console.log("Answers: ", answers);
    console.log("Submitted: ", submitted);
    console.log("Quiz: ", quiz);

    const handleAnswer = (value: string) => {
        setAnswers({ ...answers, [currentQuestion.id]: value });
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const score = quiz.questions.reduce((total, q) => {
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




            <div className="border border-gray-300 rounded-md">
                {/* Header Row */}
                <div className="flex justify-between items-center bg-gray-100 px-4 py-2 border-b border-gray-300">
                    <div className="text-lg font-semibold">{currentQuestion.title}</div>
                    <div className="text-sm font-semibold text-gray-700">{currentQuestion.points} pts</div>
                </div>

                {/* Question Content */}
                <div className="px-4 py-4">
                    <p className="text-gray-800 whitespace-pre-line leading-relaxed mb-4">
                        {currentQuestion.question}
                    </p>

                    {/* Answer Options */}
                    {currentQuestion.type === 'trueFalse' && (
                        <div className="border-t border-b divide-y divide-gray-200">
                            {['True', 'False'].map((option) => (
                                <label
                                    key={option}
                                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name={`q${currentQuestion.id}`}
                                        value={option}
                                        checked={answers[currentQuestion.id] === option}
                                        onChange={() => handleAnswer(option)}
                                        disabled={submitted}
                                        className="form-radio"
                                    />
                                    <span className="text-gray-800">{option}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>







            {/* <div className="border rounded p-4 mb-6">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <span className="font-semibold text-lg">{currentQuestion.title}</span>
                    <span className="text-gray-600 text-sm">{currentQuestion.points} pts</span>
                </div>

                <p className="mb-4 whitespace-pre-line">{currentQuestion.question}</p>

                {currentQuestion.type === 'trueFalse' && (
                    <div className="space-y-2">
                        {['True', 'False'].map((option) => (
                            <label key={option} className="block">
                                <input
                                    type="radio"
                                    name={`q${currentQuestion.id}`}
                                    value={option}
                                    checked={answers[currentQuestion.id] === option}
                                    onChange={() => handleAnswer(option)}
                                    disabled={submitted}
                                />{' '}
                                {option}
                            </label>
                        ))}
                    </div>
                )}

                {currentQuestion.type === 'multipleChoice' && (
                    <div className="space-y-2">
                        {currentQuestion.options?.map((opt) => (
                            <label key={opt} className="block">
                                <input
                                    type="radio"
                                    name={`q${currentQuestion.id}`}
                                    value={opt}
                                    checked={answers[currentQuestion.id] === opt}
                                    onChange={() => handleAnswer(opt)}
                                    disabled={submitted}
                                />{' '}
                                {opt}
                            </label>
                        ))}
                    </div>
                )}

                {currentQuestion.type === 'fillInTheBlank' && (
                    <input
                        type="text"
                        className="mt-2 border px-2 py-1 rounded"
                        value={answers[currentQuestion.id] || ''}
                        onChange={(e) => handleAnswer(e.target.value)}
                        disabled={submitted}
                    />
                )}

                {submitted && answers[currentQuestion.id] !== currentQuestion.correctAnswer && (
                    <p className="text-red-600 mt-2">Incorrect</p>
                )}
                {submitted && answers[currentQuestion.id] === currentQuestion.correctAnswer && (
                    <p className="text-green-600 mt-2">Correct</p>
                )}
            </div> */}

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
