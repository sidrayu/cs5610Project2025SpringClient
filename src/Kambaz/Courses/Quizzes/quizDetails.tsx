import { Link } from "react-router-dom";
export default function QuizDetails() {
    return (
        <div>
            <h1>preview</h1>
            <Link 
                to="/Kambaz/Courses/RS101/Quizzes/A1/Editor" 
                className="btn btn-primary"
                id="wd-quiz-edit-button"
                >
                Edit
            </Link>
        </div>

    ); 
}
