import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setEnrollments, enrollInCourse, unenrollFromCourse } from "./Enrollments/reducer"
import { useEffect, useState } from "react";
import * as enrollmentClient from "./Enrollments/client";
import * as courseClient from "./Courses/client";
interface CourseType {
  _id: string;
  name: string;
  description: string;
}
export default function Dashboard({
  courses,
  course,
  addNewCourse,
  deleteCourse,
  updateCourse,
  setCourse,
  setRefresh,
  refresh
}: {
  courses: any[],
  course: any,
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: (c: any) => void;
  setCourse: (c: any) => void;
  setRefresh: (c: number) => void;
  refresh: number;
}) {
  const dispatch = useDispatch();
  // const {enrollments} = useSelector(
  //   (state: any) => state.enrollmentReducer
  // );
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [allCourses, setAllCourses] = useState<CourseType[]>([]);

  const fetchEnrollments = async () => {
    const enrollments = await enrollmentClient.findAllEnrollments();
    dispatch(setEnrollments(enrollments));
  };
  useEffect(() => {
    fetchEnrollments();
  }, []);

  const [showAll, setShowAll] = useState(false);
  
  const fetchallCourses = async () => {
    const courses = await courseClient.fetchAllCourses();
    setAllCourses(courses);
  };
  useEffect(() => {
    fetchallCourses();
  }, []);
  const isFaculty = currentUser?.role === "FACULTY";

  const handleEnrollCourse = async (courseId: string) => {
      await enrollmentClient.enrollUserInCourse(currentUser._id, courseId);
      dispatch(enrollInCourse({ courseId, userId: currentUser._id }));
      setRefresh(refresh + 1);
  };

  const handleUnenrollCourse = async (courseId: string) => {
      await enrollmentClient.unenrollUserFromCourse(currentUser._id, courseId);
      dispatch(unenrollFromCourse({ courseId, userId: currentUser._id }));
      setRefresh(refresh + 1);
  };

  
  const displayedallCourses = !showAll ? courses : allCourses;
  
  
  const isEnrolled = (courseId: string) => {
    if (!currentUser) return false;
    return courses.some(
      (course: { _id: string }) =>
         course._id === courseId
      
    );
  };

  
  console.log(displayedallCourses)
  


  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard
      <button
              className="btn btn-primary float-end"
              onClick={() =>setShowAll(!showAll)}
            >
              Enrollments
            </button></h1> 
            
            <hr />
      {isFaculty && (
      <>
      <h5>New Course
          <button className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={addNewCourse} > Add </button>
          <button className="btn btn-warning float-end me-2"
                onClick={() => updateCourse(course)} 
                id="wd-update-course-click">
          Update
        </button>
      </h5>
      <br />
      <FormControl value={course.name} className="mb-2"
             onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <FormControl as="textarea" value={course.description} rows={3}
             onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
      <hr />
      </>
    )}


   <h2 id="wd-dashboard-published">
      Published Courses ({courses.length}) (Total {allCourses.length})
    </h2> 
    <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
        {displayedallCourses.map((course: any) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
               <Card>
                <Link to={`/Kambaz/Courses/${course._id}/Home`}
                className="wd-dashboard-course-link text-decoration-none text-dark" >
                <Card.Img src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                <Card.Body className="card-body">
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {course.name} </Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    {course.description} </Card.Text>
                  <Button variant="primary"> Go </Button>
              {isFaculty && (
                  <>  
                  <button onClick={(event) => {
                      event.preventDefault();
                      deleteCourse(course._id);
                    }} className="btn btn-danger float-end"
                    id="wd-delete-course-click">
                    Delete
                </button>

                <button id="wd-edit-course-click"
                    onClick={(event) => {
                    event.preventDefault();
                    setCourse(course);
                  }}
                  className="btn btn-warning me-2 float-end" >
                  Edit
                </button>
                </>
              )}
                <hr />
                <Link to={`/Kambaz/Dashboard`}>
                      <Button
                        variant={isEnrolled(course._id) ? "danger" : "success"}
                        onClick={() => {
                          if (isEnrolled(course._id)) {
                            console.log(course._id)
                            handleUnenrollCourse(course._id)
                          } else {
                            console.log(course._id)
                            handleEnrollCourse(course._id)
                          }
                        }}
                      >
                        {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                      </Button>
                      </Link>
                
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  </div>
  );}