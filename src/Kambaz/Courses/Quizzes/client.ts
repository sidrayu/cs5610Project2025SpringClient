import axios from "axios";

interface ImportMeta {
  env: {
    VITE_REMOTE_SERVER: string;
  };
}

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

/**
 * 测验答案接口
 * 
 * 功能：
 * 1. 定义单个问题的答案结构
 * 2. 包含答案的正确性信息
 * 3. 存储正确答案用于比较
 */
export interface QuizAnswer {
  questionId: string;
  studentAnswer: string;
  isCorrect: boolean;
  correctAnswer: string;
}

/**
 * 测验尝试接口
 * 
 * 功能：
 * 1. 定义一次完整的测验尝试
 * 2. 包含学生ID和测验ID
 * 3. 存储所有问题的答案
 * 4. 记录分数和提交时间
 */
export interface QuizAttempt {
  id: string;
  studentId: string;
  quizId: string;
  score: number;
  answers: QuizAnswer[];
  timestamp: string;
}

/**
 * 测验配置接口
 * 
 * 功能：
 * 1. 定义测验的重试规则
 * 2. 控制是否允许多次尝试
 * 3. 设置最大尝试次数
 */
export interface QuizConfig {
  id: string;
  multipleAttempts: boolean;
  maxAttempts: number;
}

/**
 * 获取测验尝试记录
 * 
 * 功能：
 * 1. 获取指定测验的所有尝试记录
 * 2. 支持按学生ID筛选
 * 
 * 参数：
 * - quizId: 测验ID
 * - studentId: 学生ID（可选）
 * 
 * 返回值：
 * - QuizAttempt[]: 测验尝试数组
 */
export const fetchQuizAttempts = async (quizId: string, studentId: string): Promise<QuizAttempt[]> => {
  const response = await axiosWithCredentials.get(`${QUIZ_API}/${quizId}/attempts?studentId=${studentId}`);
  return response.data;
};

/**
 * 获取最新的测验尝试
 * 
 * 功能：
 * 1. 获取指定测验的最新尝试记录
 * 2. 按时间戳排序获取最新的记录
 * 
 * 参数：
 * - quizId: 测验ID
 * - studentId: 学生ID
 * 
 * 返回值：
 * - QuizAttempt | null: 最新的测验尝试，如果没有则返回null
 */
export const fetchLatestQuizAttempt = async (quizId: string, studentId: string): Promise<QuizAttempt | null> => {
  const response = await axiosWithCredentials.get(`${QUIZ_API}/${quizId}/attempts/latest?studentId=${studentId}`);
  return response.data;
};

/**
 * 提交测验尝试
 * 
 * 功能：
 * 1. 保存学生的测验答案
 * 2. 计算分数
 * 3. 记录提交时间
 * 
 * 参数：
 * - quizId: 测验ID
 * - studentId: 学生ID
 * - answers: 答案数组
 * 
 * 返回值：
 * - QuizAttempt: 包含分数的完整测验尝试记录
 */
export const submitQuizAttempt = async (
  quizId: string,
  studentId: string,
  answers: QuizAnswer[]
): Promise<QuizAttempt> => {
  const response = await axiosWithCredentials.post(`${QUIZ_API}/${quizId}/attempts`, {
    studentId,
    answers,
  });
  return response.data;
};

/**
 * 获取测验配置
 * 
 * 功能：
 * 1. 获取测验的重试规则配置
 * 2. 检查是否允许多次尝试
 * 3. 获取最大尝试次数
 * 
 * 参数：
 * - quizId: 测验ID
 * 
 * 返回值：
 * - QuizConfig: 测验配置信息
 */
export const fetchQuizConfig = async (quizId: string): Promise<QuizConfig> => {
  const response = await axiosWithCredentials.get(`${QUIZ_API}/${quizId}/config`);
  return response.data;
};



