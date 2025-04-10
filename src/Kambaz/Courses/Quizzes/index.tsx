import { Link } from "react-router";
import QuizzesControls from "./QuizzesControls";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuiz, togglePublish } from "./reducer";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from 'react-icons/bs';
import { IoRocketOutline } from "react-icons/io5";
import "./quizstyle.css"
import { Form } from 'react-bootstrap';
import LessonControlButtons from "./LessonControlButtons";
//import { useState, useEffect } from "react";

export default function Quizzes() {
    const { cid } = useParams();
    const { quizzes, quizScores } = useSelector((state: any) => state.quizzesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const dispatch = useDispatch();
    
    const isFaculty = currentUser?.role === "FACULTY";
    
    const removeQuiz = (quizId: string) => {
        dispatch(deleteQuiz(quizId));
    };

    const handlePublishToggle = (quizId: string) => {
        dispatch(togglePublish(quizId));
    };

    const getAvailabilityStatus = (quiz: any) => {
        const now = new Date();
        const availableDate = new Date(quiz.availableDate);
        const untilDate = new Date(quiz.untilDate);
        
        if (now > untilDate) {
            return "Closed";
        } else if (now >= availableDate && now <= untilDate) {
            return "Available";
        } else {
            return `Not available until ${formatDate(quiz.availableDate)}`;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getQuestionCount = (quiz: any) => {
        return quiz.questions ? quiz.questions.length : 0;
    };

    const getStudentScore = (quiz: any) => {
        if (!isFaculty && currentUser) {
            const quizData = quizScores.quizzes.find(
                (q: any) => q.quiz === quiz._id
            );
            
            if (quizData) {
                const userData = quizData.users.find(
                    (u: any) => u.userId === currentUser._id
                );
                
                if (userData && userData.attempts.length > 0) {
                    const sortedAttempts = [...userData.attempts].sort((a: any, b: any) => 
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    );
                    return sortedAttempts[0].score;
                }
            }
        }
        return null;
    };

    return (
        <div>
            {/* <Link to="/Kambaz/Courses/RS101/Quizzes/A1">
            <h1>quiz-A1</h1>
            <h1>quiz-A2</h1>
            <h1>quiz-A3</h1>
            <h1>quiz-A4</h1>

            </Link> */}
            <QuizzesControls /><br /><br /><br /><br />

            <ListGroup className="rounded-0" id="wd-modules">
                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray bg-secondary">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" /> Assignment Quizzes
                    </div>

                    <ListGroup className="wd-lessons rounded-0">
                        {quizzes
                            .filter((quiz: any) => 
                                quiz.course === cid && 
                                (isFaculty || 
                                 (quiz.visibleTo && quiz.visibleTo.includes("STUDENT")) || 
                                 (quiz.isPublished && !quiz.visibleTo))
                            )
                            .map((quiz: any) => (
                                <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center">
                                    <IoRocketOutline className="me-2 fs-3 ms-3 text-success" />

                                    <Form.Group controlId={`quiz-${quiz._id}`} className="mb-3">
                       
                                            <Form.Label>
                                                <Link
                                                    to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}
                                                    className="wd-quiz-link text-decoration-none"
                                                >
                                                    {quiz.title}
                                                </Link>
                                            </Form.Label>
                                        
                                        
                                        <br />
                                        <Form.Label>
                                            <p id={`wd-${quiz._id}`}>
                                                <strong> {getAvailabilityStatus(quiz)} </strong>  | &nbsp;
                                                <strong>Due: </strong> {formatDate(quiz.dueDate)} | &nbsp;
                                                <strong>Points: </strong> {quiz.points} pts | &nbsp;
                                                <strong>Questions: </strong> {getQuestionCount(quiz)}
                                                {!isFaculty && getStudentScore(quiz) !== null && (
                                                    <> | <strong>Score: </strong> {getStudentScore(quiz)} pts</>
                                                )}
                                            </p>
                                        </Form.Label>
                                    </Form.Group>
                                    <div className="float-end ms-auto">
                                        {currentUser?.role === "FACULTY" && (
                                            <LessonControlButtons
                                                quizId={quiz._id}
                                                deleteQuiz={removeQuiz}
                                                isPublished={quiz.isPublished}
                                                onPublishToggle={handlePublishToggle}
                                            />
                                        )}
                                    </div>
                                </ListGroup.Item>
                            ))}
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}

