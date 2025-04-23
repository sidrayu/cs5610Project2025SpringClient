import Nav from "react-bootstrap/Nav";
import {Link, useNavigate} from "react-router-dom";
// import {Route, Routes } from "react-router";
// import QuestionEditor from "./questionsEdtior";
import {useLocation, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {updateQuiz} from "./reducer.ts";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Card } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import {findQuizById, updateQuizById} from "./client.ts";



export default function QuizEditor() {
    const { pathname } = useLocation();
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();



    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
   // @ts-expect-error
    const quizzes = useSelector((state) => state.quizzesReducer.quizzes);
    // const quizzes = useSelector((state: { quizzesReducer: { quizzes: Quiz[] } }) => state.quizzesReducer.quizzes);

    const quiz = quizzes.find((q: { _id: string | undefined; }) => q._id === qid);
    const assignee  = (quiz?.assignTo || []).map((a: string) => ({
        label: a,
        value: a,
    }));



    const [formData, setFormData] = useState({ ...quiz });
    const [descriptionPreview, setDescriptionPreview] = useState(false);

    useEffect(() => {
        if (quiz) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setFormData((prev) => ({
                ...quiz,
                questions: quiz.questions ?? prev.questions ?? [],
                points: quiz.points ?? prev.points ?? 0,

            }));
        }
    }, [quiz]);

    useEffect(() => {
        if (!quiz?.questions) return;

        const totalPoints = quiz.questions.reduce(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            (sum, q) => sum + (parseInt(q.points) || 0),
            0
        );

        if (quiz.points !== totalPoints) {
            dispatch(updateQuiz({ ...quiz, points: totalPoints }));
        }
    }, [quiz?.questions, dispatch]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

    };

    const location = useLocation();

    useEffect(() => {
        const isEditorDetailsTab = location.pathname.includes(`/Editor/Details`);

        if (isEditorDetailsTab && cid && qid) {
            const refreshQuiz = async () => {
                try {
                    const latest = await findQuizById(cid, qid); 
                    dispatch(updateQuiz(latest));
                    setFormData(latest);
                } catch (err) {
                    console.error("Failed to refresh quiz in Editor", err);
                }
            };

            refreshQuiz();
        }
    }, [location.pathname, cid, qid]);


    const handleSave = async (publish = false) => {
        //
        // dispatch(updateQuiz(formData));
        // navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
        if (!cid || !qid) {
            console.error("Missing courseId or quizId");
            alert("Missing course or quiz ID");
            return;
        }

        try {
            const merged = {
                ...quiz,
                ...formData,
                isPublished: publish ? true : formData.isPublished || false,
                questions: quiz.questions ?? [],
            };

            const updatedQuiz = await updateQuizById(cid, qid, merged);
            dispatch(updateQuiz(updatedQuiz));
            navigate(`/Kambaz/Courses/${cid}/Quizzes/`);
        } catch (error) {
            console.error("Failed to update quiz:", error);
            alert("Error saving quiz");
        }
    };



    function handleCancle() {
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    }


    if (!quiz) return <div className="text-danger">Quiz not found</div>;


    const handleSaveNotPublish = () => handleSave(false);
    const handleSaveAndPublish = () => handleSave(true);

    const formatDateForInput = (isoString?: string): string => {
        if (!isoString) return "";
        const date = new Date(isoString);
        // Convert UTC → Local
        const localTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        return localTime.toISOString().slice(0, 16);
    };



    return (
    <div >
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


        <div className="flex-fill">
            <h3  className="mb-4"> Edit Quiz : {quiz.title} </h3>

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
                        // value={quiz?.points || 0}
                        value={formData?.points || 0}
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
                            setFormData((prev: { timeLimit: never; }) => ({
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

                {formData.multipleAttempts && (
                    <Form.Group className="mb-3">
                        <Form.Label>Max Attempts</Form.Label>
                        <Form.Control
                            type="number"
                            name="numberAttempts"
                            min={1}
                            value={formData.numberAttempts || ""}
                            onChange={handleChange}
                            placeholder="Enter number of allowed attempts"
                        />
                    </Form.Group>
                )}



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
                                    assignTo: selected.map((opt) => opt.value),
                                }))
                            }
                        />
                    </Form.Group>

                    <Row className="mt-2">
                        <Col md={4}>
                            <Form.Label>Due</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                // value={quiz?.dueDate || ""}
                                value={formatDateForInput(quiz?.dueDate)}
                                onChange={(e) => dispatch(updateQuiz({ ...quiz, dueDate: e.target.value }))}
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Label>Available From</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                // value={quiz?.availableDate || ""}
                                value={formatDateForInput(quiz?.availableDate)}
                                onChange={(e) => dispatch(updateQuiz({ ...quiz, availableDate: e.target.value }))}
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Label>Until</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                // value={quiz?.untilDate || ""}
                                value={formatDateForInput(quiz?.untilDate)}
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
                    <Button variant="danger" onClick={handleSaveNotPublish}>
                        Save
                    </Button>
                    <Button variant="success" onClick={handleSaveAndPublish}>
                        Save & Publish
                    </Button>
                </div>
            </Form>


                {/*<Routes>*/}
                {/*    /!*<Route path ="Quizzes/:qid/Editor/Details" element={<QuizEditor/>} />*!/*/}
                {/*    <Route path ="Quizzes/:qid/Editor/Questions" element={<QuestionEditor/>} />*/}
                {/*</Routes>*/}
            </div>
    </div>


   
);}