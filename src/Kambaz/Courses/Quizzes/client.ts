import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSE_API = `${REMOTE_SERVER}/api/courses`;
const axiosWithCredentials = axios.create({ withCredentials: true });
export const findQuizById = async (courseId: string, quizId: string) => {
    const response = await axiosWithCredentials.get(`${COURSE_API}/${courseId}/quizzes/${quizId}`);
    console.log("find quiz by id response:", response);
    return response.data;
}


export const updateQuizById = async (courseId: string, quizId: string, quiz: any) => {
    const response = await axiosWithCredentials.put(`${COURSE_API}/${courseId}/quizzes/${quizId}`, quiz);
    console.log("update quiz by id response:", response);
    return response.data;
}



