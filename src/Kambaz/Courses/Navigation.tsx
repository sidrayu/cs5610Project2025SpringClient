import { Link , useLocation } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
export default function CourseNavigation() {
  const { pathname } = useLocation();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const pathSegments = pathname.split("/");
  const coursesIndex = pathSegments.indexOf("Courses");
  let basePath = pathname;
  if (coursesIndex !== -1 && coursesIndex + 2 < pathSegments.length) {
    basePath = pathSegments.slice(0, coursesIndex + 2).join("/");
  }
  return (
    
    <ListGroup id="wd-courses-navigation" style={{width: 120}}
         className="list-group fs-5 rounded-0 ms-0 align-items-start ">
      {links.map((links) => (
        <ListGroup.Item key={`${basePath}/${links}`} as={Link} to={`${basePath}/${links}`} className={`text-center border-0
              ${pathname.includes(`${basePath}/${links}`) ? "text-black bg-white" : "text-danger"}`}>
          <br />
          {links}
        </ListGroup.Item>
      ))}
    </ListGroup>
    // <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
    //   <Link to="/Kambaz/Courses/1234/Home" id="wd-course-home-link"
    //     className="list-group-item active border border-0"> Home </Link><br />
    //   <Link to="/Kambaz/Courses/1234/Modules" id="wd-course-modules-link"
    //     className="list-group-item text-danger border border-0"> Modules </Link><br />
    //   <Link to="/Kambaz/Courses/1234/Piazza" id="wd-course-piazza-link"
    //     className="list-group-item text-danger border border-0"> Piazza </Link><br />
    //   <Link to="/Kambaz/Courses/1234/Zoom" id="wd-course-zoom-link"
    //     className="list-group-item text-danger border border-0"> Zoom </Link><br />
    //   <Link to="/Kambaz/Courses/1234/Assignments" id="wd-course-quizzes-link"
    //     className="list-group-item text-danger border border-0"> Assignments </Link><br />
    //   <Link to="/Kambaz/Courses/1234/Quizzes" id="wd-course-assignments-link"
    //     className="list-group-item text-danger border border-0"> Quizzes </Link><br />
    //   <Link to="/Kambaz/Courses/1234/People" id="wd-course-people-link"
    //     className="list-group-item text-danger border border-0" > People </Link><br />
    // </div>
);}

