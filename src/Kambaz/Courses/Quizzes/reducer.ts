import { createSlice } from "@reduxjs/toolkit";
import { quizzes, quizScores } from "../../Database"; 
import { v4 as uuidv4 } from "uuid";

const initialState = {
  quizzes: quizzes,
  quizScores: quizScores,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuiz: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz = {
        _id: quiz._id || uuidv4(),
        ...quiz,
      };
      state.quizzes = [...state.quizzes, newQuiz];
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q) => q._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === quiz._id ? quiz : q
      );
    },
    togglePublish: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === quizId ? { ...q, isPublished: !q.isPublished } : q
      );
    }
  },
});

export const {
  setQuiz,
  addQuiz,
  deleteQuiz,
  updateQuiz,
  togglePublish,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;