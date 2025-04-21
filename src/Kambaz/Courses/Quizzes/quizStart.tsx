import QuizPreviewPage from "./QuizPreviewPage";
import { Button, ListGroup, Container } from 'react-bootstrap';
import { FaPencilAlt, FaQuestionCircle } from 'react-icons/fa';
export default function QuizStart() {
    const questions = [1, 2, 3, 4, 5];
    return (
        <div>
            <QuizPreviewPage />
            <Container className="mt-3">
                <div className="d-flex justify-content-between align-items-center border p-3 mb-3">
                    <div className="text-muted">Quiz saved at 8:19am</div>
                    <Button variant="outline-dark">Submit Quiz</Button>
                </div>

                <div className="bg-light border p-2 mb-4 d-flex align-items-center">
                    <FaPencilAlt className="me-2" />
                    <span>Keep Editing This Quiz</span>
                </div>

                <h4>Questions</h4>
                <ListGroup variant="flush">
                    {questions.map((q, idx) => (
                    <ListGroup.Item key={idx} className="ps-0 border-0">
                        <FaQuestionCircle className="me-2 text-muted" />
                        <span className="text-danger fw-bold">Question {q}</span>
                    </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        </div>
    );
}
