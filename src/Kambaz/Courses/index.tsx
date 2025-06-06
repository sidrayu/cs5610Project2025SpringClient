import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Navigate, Route, Routes , useParams , useLocation} from "react-router";
import {FaAlignJustify} from "react-icons/fa"
import PeopleTable from "./People/Table";
import { useSelector } from "react-redux";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/quizDetails";
import QuizEditor from "./Quizzes/quizEditor";
import QuestionEditor from "./Quizzes/questionsEdtior";
import QuizPreviewPage from "./Quizzes/QuizPreviewPage";
import QuizStart from "./Quizzes/quizStart";

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const assignmentIds = assignments
    .filter((assignment: { course: string | undefined; }) => assignment.course === cid)
    .map((assignment: { _id: any; }) => assignment._id);

  const assignmentRoutes = [];
    for (let i = 0; i < assignmentIds.length; i++) {
      assignmentRoutes.push(
        <Route key={assignmentIds[i]} path={`Assignments/${assignmentIds[i]}`} element={<AssignmentEditor />} />
      );
    }

  return (
      <div id="wd-courses">
        <h2 className="text-danger">
      <FaAlignJustify className="me-4 fs-4 mb-1" />
      {course && course.name} &gt; {pathname.split("/")[4]}
     </h2> <hr />
      <div className="d-flex">
    <div className="d-none d-md-block">
      <CourseNavigation />
      </div>
    <div className="flex-fill ms-4">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home />} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments" element={<Assignments />} />
              <Route path="Assignments/:assignmentId" element={<AssignmentEditor />} />
              {/* {assignmentRoutes} */}
              <Route path="Quizzes" element={<Quizzes/>} />
              <Route path="Quizzes/:qid" element={<QuizDetails/>} />
              <Route path="Quizzes/:qid/Preview" element={<QuizPreviewPage/>} />
              <Route path="Quizzes/:qid/Start" element={<QuizStart/>} />
              <Route path ="Quizzes/:qid/Editor" element={<QuizEditor/>} />
              <Route path ="Quizzes/:qid/Editor/Details" element={<QuizEditor/>} />
              <Route path ="Quizzes/:qid/Editor/Questions" element={<QuestionEditor/>} />
              <Route path="People" element={<PeopleTable />} />
            </Routes>
            </div>
            </div></div>
  );}
  