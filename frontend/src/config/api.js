// API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

export const API_ENDPOINTS = {
    // Authentication
    LOGIN: `${API_BASE_URL}/api/token/`,
    REFRESH: `${API_BASE_URL}/api/token/refresh/`,
    REGISTER: `${API_BASE_URL}/api/register/`,
    
    // User
    CURRENT_USER: `${API_BASE_URL}/api/users/me/`,
    UPDATE_PROFILE: `${API_BASE_URL}/api/users/me/update/`,
    CHANGE_PASSWORD: `${API_BASE_URL}/api/users/change-password/`,
    
    // Students
    STUDENTS: `${API_BASE_URL}/api/students/`,
    
    // Faculty
    FACULTY: `${API_BASE_URL}/api/faculty/`,
    
    // TAs
    TAS: `${API_BASE_URL}/api/tas/`,
    
    // Courses
    COURSES: `${API_BASE_URL}/api/courses/`,
    
    // Assignments
    ASSIGNMENTS: `${API_BASE_URL}/api/assignments/`,
    SUBMISSIONS: `${API_BASE_URL}/api/submissions/`,
    
    // Attendance
    ATTENDANCE: `${API_BASE_URL}/api/attendance/`,
    
    // Quizzes
    QUIZZES: `${API_BASE_URL}/api/quizzes/`,
    QUIZ_GRADES: `${API_BASE_URL}/api/quiz-grades/`,
    
    // TA Tasks
    TA_TASKS: `${API_BASE_URL}/api/ta-tasks/`,
    
    // Fee Management
    FEE_RECORDS: `${API_BASE_URL}/api/fee-records/`,
    PAYMENTS: `${API_BASE_URL}/api/payments/`,

    // Admin
    ADMIN_USERS: `${API_BASE_URL}/api/admin/users/`,
    ADMIN_COURSES: `${API_BASE_URL}/api/admin/courses/`,
};

export default API_BASE_URL;
