// src/Kambaz/Courses/reducer.ts
import { createSlice } from "@reduxjs/toolkit";
//import Database from "../Database";
import { Enrollment } from "./type";

//const initialState = {
//   courses: courses, 
// };
// const { courses, enrollments } = Database;
//const { enrollments } = Database;
const initialState: {enrollments: Enrollment[]}= {
  // courses,
  enrollments:[],
  // currentCourse: {
  //   _id: "1234",
  //   name: "New Course",
  //   number: "New Number",
  //   description: "New Description",
  //   startDate: "2023-09-10",
  //   endDate: "2023-12-15",
  // },
};
const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    enrollInCourse: (state, { payload}) => {

      const alreadyEnrolled = state.enrollments.some(
        (enrollment: any) =>
          enrollment.user === payload.user && enrollment.course === payload.course
      );
      if (!alreadyEnrolled) {
        state.enrollments.push(payload);
      }
    },

    unenrollFromCourse: (state, { payload }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment: any) =>
          !(
            enrollment.user === payload.user &&
            enrollment.course === payload.course
          )
      );
    },
  },
});

export const {setEnrollments, enrollInCourse, unenrollFromCourse } =
enrollmentSlice.actions;
export default enrollmentSlice.reducer;
