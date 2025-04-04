import { createSlice } from "@reduxjs/toolkit";
//import { assignments } from "../../Database"; 
//import { v4 as uuidv4 } from "uuid";

const initialState = {
    assignments: [],
  };

  const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
      setAssignment: (state, action) => {
        state.assignments = action.payload;
      }, 
      addAssignment: (state, { payload: assignment }) => {
        const newAssignment: any = {
          _id: assignment._id,
          ...assignment,
        };
        state.assignments = [...state.assignments, newAssignment] as any;
      },
      deleteAssignment: (state, { payload: assignmentId }) => {
        state.assignments = state.assignments.filter((a: any) => a._id !== assignmentId);
      },
      updateAssignment: (state, { payload: assignment }) => {
        state.assignments = state.assignments.map((a : any) =>
          a._id === assignment._id ? assignment : a
        ) as any;
      },
    },
  });
  
  export const {
    setAssignment,
    addAssignment,
    deleteAssignment,
    updateAssignment,
  } = assignmentsSlice.actions;
  export default assignmentsSlice.reducer;