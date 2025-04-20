
import { Link, useNavigate } from "react-router-dom";
// import {Route, Routes } from "react-router";
// import QuestionEditor from "./questionsEdtior";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateQuiz } from "./reducer.ts";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Card } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";


// FOR QUIZ PREVIEW
import { AlertCircle } from 'lucide-react'; // or use any alert icon
import '../../styles.css'; // optional: external styling
// END QUIZ PREVIEW



export default function QuizPreview() {


    // FOR QUIZ PREVIEW
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
    // END QUIZ PREVIEW




    const { pathname } = useLocation();
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
    const quiz = quizzes.find((q: any) => q._id === qid);
    const assignee = (quiz?.assignTo || []).map((a: string) => ({
        label: a,
        value: a,
    }));



    const [formData, setFormData] = useState({ ...quiz });
    const [descriptionPreview, setDescriptionPreview] = useState(false);

    useEffect(() => {
        if (quiz) setFormData({ ...quiz })
    }, [quiz]);

    useEffect(() => {
        if (!quiz?.questions) return;

        const totalPoints = quiz.questions.reduce(
            (sum: any, q: any) => sum + (parseInt(q.points) || 0),
            0
        );

        if (quiz.points !== totalPoints) {
            dispatch(updateQuiz({ ...quiz, points: totalPoints }));
        }
    }, [quiz?.questions, dispatch]);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSave = () => {
        dispatch(updateQuiz(formData));
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
    };

    function handleCancle() {
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    }


    if (!quiz) return <div className="text-danger">Quiz not found</div>;


    return (
        <div >
            <div className="flex-fill">
                <h3 className="mb-4"> {quiz.title} </h3>

                <div className="preview-banner">
                    <AlertCircle className="icon" />
                    <span>This is a preview of the published version of the quiz</span>
                </div>

                <div className="mb-4">
                    <p className="text-sm text-gray-700">Started: {dateStr}</p>
                    <h1 className="text-2xl font-bold text-gray-900 mt-1">Quiz Instructions</h1>
                    <hr className="mt-2" />
                </div>

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label><strong>Points</strong></Form.Label>
                        <Form.Control
                            type="number"
                            value={quiz?.points || 0}
                            // onChange={(e) =>
                            //     dispatch(updateQuiz({ ...quiz, points: parseInt(e.target.value) || 0 }))
                            // }
                            disabled
                        />
                    </Form.Group>


                    <Form.Group className="mb-3">
                        <Form.Label><strong>Quiz Instructions:</strong></Form.Label>
                        <ReactQuill
                            theme="snow"
                            value={quiz?.description || ""}
                            onChange={(value) =>
                                dispatch(updateQuiz({ ...quiz, description: value }))
                            }
                            modules={{
                                toolbar: [
                                    [{ header: [1, 2, 3, false] }],
                                    ["bold", "italic", "underline", "strike"],
                                    [{ list: "ordered" }, { list: "bullet" }],
                                    ["link", "image"],
                                    ["clean"],
                                    [{ align: [] }],
                                    ["code-block"],
                                    ["blockquote"]
                                ]
                            }}
                        />
                        <div className="mt-2 d-flex justify-content-between">
                            <small>
                                <strong>Words:</strong>{" "}
                                {
                                    quiz?.description?.replace(/<[^>]+>/g, "").trim().split(/\s+/).filter(Boolean).length || 0
                                }
                            </small>

                            <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => setDescriptionPreview(!descriptionPreview)}
                            >
                                {descriptionPreview ? "Hide Preview" : "Show Preview"}
                            </button>
                        </div>

                        {descriptionPreview && (
                            <div
                                className="border p-2 mt-2"
                                style={{ background: "#f9f9f9", minHeight: "100px" }}
                                dangerouslySetInnerHTML={{ __html: quiz?.description || "" }}
                            />
                        )}
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label> Quiz Type</Form.Label>
                                <Form.Select
                                    name="type"
                                    value={formData.type || "Graded Quiz"}
                                    onChange={handleChange}
                                >
                                    <option>Graded Quiz</option>
                                    <option>Practice Quiz</option>
                                    <option>Graded Survey</option>
                                    <option>Ungraded Survey</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                    </Row>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Assignment Group</Form.Label>
                            <Form.Select
                                name="group"
                                value={formData.group || "Quizzes"}
                                onChange={handleChange}
                            >
                                <option>Quizzes</option>
                                <option>Exams</option>
                                <option>Assignments</option>
                                <option>Project</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Form.Group className="mb-3">
                        <Form.Label><strong>Options</strong></Form.Label>
                        <Form.Check
                            label="Shuffle Answers"
                            name="shuffle"
                            checked={formData.shuffle || false}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 d-flex align-items-center">
                        <Form.Check
                            label="Time Limit"
                            name="hasTimeLimit"
                            checked={!!formData.timeLimit}
                            onChange={() =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    timeLimit: prev.timeLimit ? 0 : 20,
                                }))
                            }
                        />
                        <Form.Control
                            type="number"
                            name="timeLimit"
                            className="ms-3"
                            value={formData.timeLimit || 0}
                            onChange={handleChange}
                            style={{ width: "100px" }}
                            disabled={!formData.timeLimit}
                        />
                        <span className="ms-2">Minutes</span>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            label="Allow Multiple Attempts"
                            name="multipleAttempts"
                            checked={formData.multipleAttempts || false}
                            onChange={handleChange}
                        />
                    </Form.Group>


                    <h5>Assign</h5>
                    <Card className="p-3 mt-4">

                        <Form.Group>
                            <Form.Label><strong>Assign to</strong></Form.Label>
                            <CreatableSelect
                                isMulti
                                placeholder="Select or type to add..."
                                value={assignee}
                                onChange={(selected) =>
                                    dispatch(updateQuiz({
                                        ...quiz,
                                        assignTo: selected.map((opt: any) => opt.value),
                                    }))
                                }
                            />
                        </Form.Group>

                        <Row className="mt-2">
                            <Col md={4}>
                                <Form.Label>Due</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    value={quiz?.dueDate || ""}
                                    onChange={(e) => dispatch(updateQuiz({ ...quiz, dueDate: e.target.value }))}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Label>Available From</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    value={quiz?.availableDate || ""}
                                    onChange={(e) => dispatch(updateQuiz({ ...quiz, availableDate: e.target.value }))}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Label>Until</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    value={quiz?.untilDate || ""}
                                    onChange={(e) => dispatch(updateQuiz({ ...quiz, untilDate: e.target.value }))}
                                />
                            </Col>
                        </Row>
                    </Card>

                    <Form.Group className="mb-3">
                        <Form.Label><strong>Show Correct Answers</strong></Form.Label>
                        <Form.Select
                            value={quiz?.showAnswersImmediately ? "immediately" : (quiz?.showAnswersAfter ? "after" : "never")}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === "immediately") {
                                    dispatch(updateQuiz({ ...quiz, showAnswersImmediately: true, showAnswersAfter: "" }));
                                } else if (value === "after") {
                                    dispatch(updateQuiz({ ...quiz, showAnswersImmediately: false, showAnswersAfter: new Date().toISOString() }));
                                } else {
                                    dispatch(updateQuiz({ ...quiz, showAnswersImmediately: false, showAnswersAfter: "" }));
                                }
                            }}
                        >
                            <option value="immediately">Immediately</option>
                            <option value="after">After a specific date</option>
                            <option value="never">Never</option>
                        </Form.Select>
                    </Form.Group>

                    {quiz?.showAnswersAfter && (
                        <Form.Group className="mb-3">
                            <Form.Label><strong>Show Answers After</strong></Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={quiz?.showAnswersAfter?.substring(0, 16) || ""}
                                onChange={(e) =>
                                    dispatch(updateQuiz({ ...quiz, showAnswersAfter: e.target.value }))
                                }
                            />
                        </Form.Group>
                    )}
                    <Form.Group className="mb-3">
                        <Form.Label><strong>Access Code</strong></Form.Label>
                        <Form.Control
                            type="text"
                            value={quiz?.accessCode || ""}
                            onChange={(e) =>
                                dispatch(updateQuiz({ ...quiz, accessCode: e.target.value }))
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label><strong>One Question at a Time</strong></Form.Label>
                        <Form.Select
                            value={quiz?.oneQuestionAtATime ? "Yes" : "No"}
                            onChange={(e) =>
                                dispatch(updateQuiz({ ...quiz, oneQuestionAtATime: e.target.value === "Yes" }))
                            }
                        >
                            <option>Yes</option>
                            <option>No</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label><strong>Webcam Required</strong></Form.Label>
                        <Form.Select
                            value={quiz?.webcam ? "Yes" : "No"}
                            onChange={(e) =>
                                dispatch(updateQuiz({ ...quiz, webcam: e.target.value === "Yes" }))
                            }
                        >
                            <option>No</option>
                            <option>Yes</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label><strong>Lock Questions After Answering</strong></Form.Label>
                        <Form.Select
                            value={quiz?.lock ? "Yes" : "No"}
                            onChange={(e) =>
                                dispatch(updateQuiz({ ...quiz, lock: e.target.value === "Yes" }))
                            }
                        >
                            <option>No</option>
                            <option>Yes</option>
                        </Form.Select>
                    </Form.Group>



                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" onClick={handleCancle}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </Form>


                {/*<Routes>*/}
                {/*    /!*<Route path ="Quizzes/:qid/Editor/Details" element={<QuizEditor/>} />*!/*/}
                {/*    <Route path ="Quizzes/:qid/Editor/Questions" element={<QuestionEditor/>} />*/}
                {/*</Routes>*/}
            </div>
        </div>



    );
}