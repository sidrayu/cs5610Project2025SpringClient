import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Define types for our quiz data
interface QuizAttempt {
  date: string;
  score: number;
}

interface QuizUser {
  userId: string;
  attempts: QuizAttempt[];
}

interface QuizScore {
  quiz: string;
  users: QuizUser[];
}

interface Quiz {
  _id: string;
  title: string;
  course: string;
  points: number;
  dueDate: string;
  availableDate: string;
  untilDate: string;
  isPublished: boolean;
  visibleTo?: string[];
  questions?: any[];
}

// Initialize with empty arrays instead of importing from Database
const initialState = {
  quizzes: [] as Quiz[],
  quizScores: { quizzes: [] as QuizScore[] },
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuiz: (state, action) => {
      state.quizzes = action.payload;
    },
    setQuizzes: (state, action) => {
      state.quizzes = action.payload.quizzes;
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
        q._id === quizId ? { 
          ...q, 
          isPublished: !q.isPublished,
          visibleTo: !q.isPublished ? ["FACULTY", "STUDENT"] : ["FACULTY"]
        } : q
      );
    }
  },
});

export const {
  setQuiz,
  setQuizzes,
  addQuiz,
  deleteQuiz,
  updateQuiz,
  togglePublish,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;