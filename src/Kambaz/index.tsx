import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
//import { v4 as uuidv4 } from "uuid";
import ProtectedRoute from "./Account/ProtectedRoute";
import EnrollProtectRoute from "./Courses/EnrollProtectRoute";
//import { addCourse, deleteCourse, updateCourse, setCurrentCourse } from "./Courses/reducer";
import { useSelector } from "react-redux";
import Session from "./Account/Session";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import { useEffect, useState } from "react";
export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description"
  });
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [refresh, setRefresh] = useState(0);
  console.log(currentUser)
  const fetchCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      setCourses(courses);
      console.log(courses);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [currentUser, refresh]);

  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setCourses([ ...courses, newCourse ]);
  };

  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
};

  const updateCourse = async () => {
  await courseClient.updateCourse(course);
  setCourses(courses.map((c) => {
      if (c._id === course._id) {
          return course;
      } else {
          return c;
      }
  }));
  setRefresh(refresh + 1);
};

  
  return (
    <Session>
    <div id="wd-kambaz">
            <KambazNavigation />
            <div className="wd-main-content-offset p-3">
            <Routes>
                <Route path="/" element={<Navigate to="Account" />} />
                <Route path="/Account/*" element={<Account />} />
                <Route path="Dashboard" element={
            <ProtectedRoute><Dashboard
            courses={courses}
            course={course}
            addNewCourse={addNewCourse}
            deleteCourse={deleteCourse}
            updateCourse={updateCourse}
            setCourse={setCourse}
            refresh={refresh}
            setRefresh={setRefresh}
          /></ProtectedRoute>
            } />
                <Route path="Courses/:cid/*" element={
                  <ProtectedRoute>
                    <EnrollProtectRoute>
                      <Courses courses={courses} />
                    </EnrollProtectRoute>
                    </ProtectedRoute>} />
                <Route path="/Calendar" element={<h1>Calendar</h1>} />
                <Route path="/Inbox" element={<h1>Inbox</h1>} />
            </Routes>
            </div>
    </div>
    </Session>
);}
