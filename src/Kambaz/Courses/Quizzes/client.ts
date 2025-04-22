import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSE_API = `${REMOTE_SERVER}/api/courses`;
const QUIZ_API = `${REMOTE_SERVER}/api/quizzes`;
const axiosWithCredentials = axios.create({ withCredentials: true });

// Get all quizzes
export const findAllQuizzes = async () => {
    try {
        const response = await axiosWithCredentials.get(`${QUIZ_API}/getAll`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all quizzes:", error);
        throw error;
    }
};

// Get quizzes by course ID
export const findQuizzesByCourseId = async (courseId: string) => {
    try {
        console.log(`Fetching quizzes for course ${courseId} from ${COURSE_API}/${courseId}/quizzes`);
        const response = await axiosWithCredentials.get(`${COURSE_API}/${courseId}/quizzes`);
        console.log(`API response for course ${courseId}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching quizzes for course ${courseId}:`, error);
        throw error;
    }
};

// Get quiz by ID
export const findQuizById = async (courseId: string, quizId: string) => {
    try {
        const response = await axiosWithCredentials.get(`${COURSE_API}/${courseId}/quizzes/${quizId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching quiz ${quizId} for course ${courseId}:`, error);
        throw error;
    }
};

// Create a new quiz
export const createQuiz = async (courseId: string, quiz: any) => {
    try {
        const response = await axiosWithCredentials.post(`${COURSE_API}/${courseId}/quizzes`, quiz);
        return response.data;
    } catch (error) {
        console.error(`Error creating quiz for course ${courseId}:`, error);
        throw error;
    }
};

// Update an existing quiz
export const updateQuizById = async (courseId: string, quizId: string, quiz: any) => {
    try {
        const response = await axiosWithCredentials.put(`${COURSE_API}/${courseId}/quizzes/${quizId}`, quiz);
        return response.data;
    } catch (error) {
        console.error(`Error updating quiz ${quizId} for course ${courseId}:`, error);
        throw error;
    }
};

// Delete a quiz
export const deleteQuiz = async (courseId: string, quizId: string) => {
    try {
        const response = await axiosWithCredentials.delete(`${COURSE_API}/${courseId}/quizzes/${quizId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting quiz ${quizId} for course ${courseId}:`, error);
        throw error;
    }
};

// Toggle quiz publish status
export const toggleQuizPublish = async (courseId: string, quizId: string, isPublished: boolean) => {
    try {
        const response = await axiosWithCredentials.put(`${COURSE_API}/${courseId}/quizzes/${quizId}/publish`, { isPublished });
        return response.data;
    } catch (error) {
        console.error(`Error toggling publish status for quiz ${quizId} in course ${courseId}:`, error);
        throw error;
    }
};


// Get quiz by userId and quizId with formatted URL /api/quizAnswers/user/:userId/quiz/:quizId
export const findLastAnswers = async (userId: string, quizId: string) => {
    try {
        const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/quizAnswers/user/${userId}/quiz/${quizId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching quiz ${quizId} for user ${userId}:`, error);
        throw error;
    }
};

// create/update quiz answers
export const createQuizAnswers = async (quizAnswers: any) => {
    try {
        console.log("Creating quiz answers:", quizAnswers);
        const response = await axiosWithCredentials.post(`${REMOTE_SERVER}/api/quizAnswers`, quizAnswers);
        console.log("Quiz answers created/updated successfully:", response);
        return response.data;
    } catch (error) {
        console.error(`Error creating quiz answers for quiz answers${quizAnswers}:`, error);
        throw error;
    }
};


