import AssignmentControls from "./AssignmentControls";
import ListGroup from 'react-bootstrap/ListGroup';
import { BsGripVertical } from 'react-icons/bs';
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { TbNotebook } from "react-icons/tb";
import "./assignmentstyle.css"
import { Form} from 'react-bootstrap'; 
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAssignment, deleteAssignment }
  from "./reducer";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import { useEffect } from "react";
export default function Assignments() 
{
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const fetchAssignments = async () => {
      const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
      dispatch(setAssignment(assignments));
    };
    useEffect(() => {
      fetchAssignments();
    }, []);

  const removeAssignment = async (assignmentId: string) => {
      await assignmentsClient.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    };
  


  const isFaculty = currentUser?.role === "FACULTY";
    return (
      <div>
  <AssignmentControls /><br /><br /><br /><br />


  <ListGroup className="rounded-0" id="wd-modules">
    <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray bg-secondary">
    <div className="wd-title p-3 ps-2 bg-secondary">
    <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS 
    {isFaculty && <ModuleControlButtons />}
    </div>



      <ListGroup className="wd-lessons rounded-0">

      {assignments
          .map((assignment: any) => (
      <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center">
      
      <BsGripVertical className="fs-3" /> 
      <TbNotebook className="me-2 fs-3 text-success" /> 

      <Form.Group controlId={`assignment-${assignment._id}`} className="mb-3">

      {isFaculty ? (
    <Form.Label>
    <Link
      to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
      className="wd-assignment-link text-decoration-none"
    >
      {assignment.title}
    </Link>
    </Form.Label>
    ) : (
    <Form.Label>{assignment.title}</Form.Label>
)}
          <br></br>
          <Form.Label>
          <p id={`wd-${assignment._id}`}>
  <span className="text-danger">{assignment.modules}</span> | <strong>Not available until</strong> {assignment.startdate} | &nbsp;
  <strong>Due</strong> {assignment.duedate} | {assignment.points}
</p>
            

          </Form.Label>
        </Form.Group>
        <div className="float-end ms-auto">
        {currentUser?.role === "FACULTY" && (
      
      <LessonControlButtons assignmentId={assignment._id}
      deleteAssignment={(assignmentId) => {
        removeAssignment(assignmentId);
      }}
/> )}
      </div>
      
      </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}