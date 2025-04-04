import axios from "axios";
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;
const axiosWithCredentials = axios.create({ withCredentials: true });
export const findAllEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(`${ENROLLMENTS_API}/enrollments`);
  
  return data;
};
export async function enrollUserInCourse(userId: string, courseId: string) {
    console.log(userId)
    console.log(courseId)
    const response = await axios.post(`${ENROLLMENTS_API}/users/${userId}/courses/${courseId}`);
    console.log("test")
    console.log(response)
    return response.data;
  }


export async function unenrollUserFromCourse(userId: string, courseId: string) {
    const response = await axios.delete(`${ENROLLMENTS_API}/users/${userId}/courses/${courseId}`);
    return response.status; 
  }


export async function findCoursesForUser(userId: string) {
    const response = await axios.get(`${REMOTE_SERVER}/api/users/${userId}/courses`);
    return response.data; 
  }



