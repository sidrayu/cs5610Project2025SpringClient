import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, ListGroup, FormCheck, Row, Col, Button } from 'react-bootstrap';
import { findQuizById, findLastAnswers, submitQuizAnswers } from './client';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizAttemptHandlerProps {
    quizId: string;
    courseId: string;
}

const QuizAttemptHandler: React.FC<QuizAttemptHandlerProps> = ({ quizId, courseId }) => {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [quiz, setQuiz] = useState<any>(null);
    const [lastAttempt, setLastAttempt] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchQuizAndAttempt = async () => {
            try {
                const quizData = await findQuizById(courseId, quizId);
                setQuiz(quizData);
                
                if (currentUser) {
                    const attemptData = await findLastAnswers(currentUser._id, quizId);
                    setLastAttempt(attemptData);
                    if (attemptData && attemptData.answers) {
                        const answerMap = attemptData.answers.reduce((acc: any, answer: any) => {
                            acc[answer.questionId] = answer.answer;
                            return acc;
                        }, {});
                        setAnswers(answerMap);
                    }
                }
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizAndAttempt();
    }, [quizId, courseId, currentUser]);

    const handleAnswer = (questionId: string, answer: string) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    const handleSubmit = async () => {
        if (!currentUser || !quiz) return;

        try {
            const answerArray = Object.entries(answers).map(([questionId, answer]) => ({
                questionId,
                answer
            }));

            await submitQuizAnswers({
                userId: currentUser._id,
                quizId,
                courseId,
                answers: answerArray
            });

            setSubmitted(true);
            // Refresh the last attempt data
            const attemptData = await findLastAnswers(currentUser._id, quizId);
            setLastAttempt(attemptData);
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    const hasMoreAttempts = () => {
        if (!lastAttempt || !quiz) return true;
        return lastAttempt.attemptCount < quiz.numberAttempts;
    };

    const isAnswerCorrect = (question: any, answer: string) => {
        if (question.type === 'trueFalse') {
            return answer.toLowerCase() === question.answer.toLowerCase();
        } else if (question.type === 'multipleChoice') {
            return answer === question.answer;
        } else if (question.type === 'fillInTheBlank') {
            return question.answers.some((expected: string) => 
                answer.toLowerCase() === expected.toLowerCase()
            );
        }
        return false;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!quiz) {
        return <div>Quiz not found</div>;
    }

    return (
        <Container className="mt-3">
            <h2>{quiz.title}</h2>
            <div className="mb-4">
                <Row>
                    <Col>Due: {quiz.untilDate}</Col>
                    <Col>Points: {quiz.points}</Col>
                    <Col>Questions: {quiz.questions.length}</Col>
                </Row>
                <Row>
                    <Col>Available: {quiz.availableDate}</Col>
                    <Col>Time Limit: {quiz.timeLimit} Minutes</Col>
                    <Col>Attempts: {quiz.numberAttempts}</Col>
                </Row>
            </div>

            {lastAttempt && (
                <div className="mb-4">
                    <h4>Last Attempt</h4>
                    <p>Score: {lastAttempt.score} out of {lastAttempt.points}</p>
                    <p>Submitted: {new Date(lastAttempt.endTime).toLocaleString()}</p>
                    <p>Time Spent: {lastAttempt.timeSpent} seconds</p>
                </div>
            )}

            {hasMoreAttempts() && !submitted && (
                <div>
                    {quiz.questions.map((question: any) => (
                        <ListGroup key={question._id} className="mb-4">
                            <ListGroup.Item>
                                <h5>{question.question}</h5>
                                <p>Points: {question.points}</p>

                                {question.type === 'trueFalse' && (
                                    <div>
                                        {['True', 'False'].map((option) => (
                                            <FormCheck
                                                key={option}
                                                type="radio"
                                                label={option}
                                                name={`question-${question._id}`}
                                                checked={answers[question._id] === option}
                                                onChange={() => handleAnswer(question._id, option)}
                                                disabled={submitted}
                                            />
                                        ))}
                                    </div>
                                )}

                                {question.type === 'multipleChoice' && (
                                    <div>
                                        {question.choices.map((choice: any) => (
                                            <FormCheck
                                                key={choice._id}
                                                type="radio"
                                                label={choice.title}
                                                name={`question-${question._id}`}
                                                checked={answers[question._id] === choice._id}
                                                onChange={() => handleAnswer(question._id, choice._id)}
                                                disabled={submitted}
                                            />
                                        ))}
                                    </div>
                                )}

                                {question.type === 'fillInTheBlank' && (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={answers[question._id] || ''}
                                        onChange={(e) => handleAnswer(question._id, e.target.value)}
                                        disabled={submitted}
                                    />
                                )}

                                {submitted && (
                                    <div className="mt-2">
                                        {isAnswerCorrect(question, answers[question._id]) ? (
                                            <span className="text-success">
                                                <CheckCircle className="me-2" />
                                                Correct
                                            </span>
                                        ) : (
                                            <span className="text-danger">
                                                <XCircle className="me-2" />
                                                Incorrect
                                            </span>
                                        )}
                                    </div>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    ))}

                    <Button 
                        variant="primary" 
                        onClick={handleSubmit}
                        disabled={submitted}
                    >
                        Submit Quiz
                    </Button>
                </div>
            )}

            {!hasMoreAttempts() && (
                <div className="alert alert-warning">
                    You have reached the maximum number of attempts for this quiz.
                </div>
            )}
        </Container>
    );
};

export default QuizAttemptHandler; 