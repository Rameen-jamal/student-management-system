// frontend/src/FacultyDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "./config/api";
import { 
    User, BookOpen, Calendar, Award, FileText, ClipboardCheck, Clock, Users, LogOut, 
    Search, Filter, X, CheckCircle, AlertCircle, Clock3, TrendingUp, GraduationCap, 
    Mail, Phone, MapPin, Building, Hash, Target, MessageSquare, ChevronDown, Plus,
    Upload, Send, Edit, Briefcase, Save, FileQuestion, Timer, XCircle
} from 'lucide-react';

// Dialog Component
const Dialog = ({ isOpen, onClose, title, message, type = 'info', onConfirm }) => {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle size={48} color="#10B981" />;
            case 'error':
                return <XCircle size={48} color="#EF4444" />;
            case 'warning':
                return <AlertCircle size={48} color="#F59E0B" />;
            case 'confirm':
                return <AlertCircle size={48} color="#4F46E5" />;
            default:
                return <AlertCircle size={48} color="#4F46E5" />;
        }
    };

    const getColor = () => {
        switch (type) {
            case 'success': return '#10B981';
            case 'error': return '#EF4444';
            case 'warning': return '#F59E0B';
            default: return '#4F46E5';
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '2rem',
                maxWidth: '450px',
                width: '100%',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                position: 'relative'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#6B7280',
                        padding: '0.25rem'
                    }}
                >
                    <X size={20} />
                </button>

                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    {getIcon()}
                </div>

                {title && (
                    <h3 style={{
                        margin: '0 0 1rem 0',
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: '#1F2937',
                        textAlign: 'center'
                    }}>
                        {title}
                    </h3>
                )}

                <p style={{
                    margin: '0 0 1.5rem 0',
                    fontSize: '1rem',
                    color: '#6B7280',
                    textAlign: 'center',
                    lineHeight: '1.5'
                }}>
                    {message}
                </p>

                <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    justifyContent: 'center'
                }}>
                    {type === 'confirm' ? (
                        <>
                            <button
                                onClick={onClose}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#F3F4F6',
                                    color: '#1F2937',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    transition: 'all 0.2s'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: getColor(),
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    transition: 'all 0.2s'
                                }}
                            >
                                Confirm
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onClose}
                            style={{
                                padding: '0.75rem 2rem',
                                backgroundColor: getColor(),
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                        >
                            OK
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// Color palette
const colors = {
    primary: '#4F46E5',
    secondary: '#7C3AED',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    light: '#F9FAFB',
    border: '#E5E7EB',
    textPrimary: '#1F2937',
    textSecondary: '#6B7280',
    background: '#F3F4F6'
};

// Modern styles
const styles = {
    container: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        backgroundColor: colors.background,
        minHeight: '100vh',
        padding: 0
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.25rem',
        color: colors.textSecondary
    },
    header: {
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        color: 'white',
        padding: '2rem 3rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    headerContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
    },
    welcomeText: {
        margin: 0,
        fontSize: '2rem',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center'
    },
    subtitle: {
        margin: '0.5rem 0 0 0',
        opacity: 0.95,
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    logoutBtn: {
        padding: '0.75rem 1.5rem',
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: 'white',
        border: '2px solid rgba(255,255,255,0.3)',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
        transition: 'all 0.3s',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    content: {
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem 3rem'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
    },
    statCard: {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: `1px solid ${colors.border}`,
        transition: 'all 0.3s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    statLabel: {
        fontSize: '0.875rem',
        color: colors.textSecondary,
        textTransform: 'uppercase',
        fontWeight: '600',
        letterSpacing: '0.5px'
    },
    statValue: {
        fontSize: '2.5rem',
        fontWeight: '700',
        margin: '0.5rem 0'
    },
    tabs: {
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        borderBottom: `2px solid ${colors.border}`,
        overflowX: 'auto',
        paddingBottom: '0.5rem'
    },
    tab: {
        padding: '0.75rem 1.5rem',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '500',
        color: colors.textSecondary,
        borderBottom: '3px solid transparent',
        transition: 'all 0.3s',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    activeTab: {
        padding: '0.75rem 1.5rem',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
        color: colors.primary,
        borderBottom: `3px solid ${colors.primary}`,
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    card: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: `1px solid ${colors.border}`,
        marginBottom: '1.5rem'
    },
    cardTitle: {
        margin: '0 0 1.5rem 0',
        fontSize: '1.5rem',
        fontWeight: '700',
        color: colors.textPrimary
    },
    button: {
        padding: '0.75rem 1.5rem',
        backgroundColor: colors.primary,
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
        transition: 'all 0.3s',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    secondaryButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: 'white',
        color: colors.primary,
        border: `2px solid ${colors.primary}`,
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
        transition: 'all 0.3s',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1.5rem',
        backgroundColor: colors.light,
        borderRadius: '8px',
        border: `1px solid ${colors.border}`
    },
    input: {
        padding: '0.75rem',
        border: `1px solid ${colors.border}`,
        borderRadius: '8px',
        fontSize: '1rem',
        transition: 'all 0.3s'
    },
    textarea: {
        padding: '0.75rem',
        border: `1px solid ${colors.border}`,
        borderRadius: '8px',
        fontSize: '1rem',
        minHeight: '100px',
        resize: 'vertical'
    },
    select: {
        padding: '0.75rem',
        border: `1px solid ${colors.border}`,
        borderRadius: '8px',
        fontSize: '1rem',
        backgroundColor: 'white',
        cursor: 'pointer'
    },
    courseCard: {
        padding: '1.5rem',
        backgroundColor: 'white',
        borderRadius: '10px',
        border: `2px solid ${colors.border}`,
        marginBottom: '1rem',
        transition: 'all 0.3s',
        cursor: 'pointer'
    },
    listItem: {
        padding: '1rem',
        backgroundColor: colors.light,
        borderRadius: '8px',
        marginBottom: '0.75rem',
        border: `1px solid ${colors.border}`
    },
    badge: {
        display: 'inline-block',
        padding: '0.25rem 0.75rem',
        borderRadius: '12px',
        fontSize: '0.875rem',
        fontWeight: '600'
    },
    emptyState: {
        textAlign: 'center',
        padding: '3rem',
        color: colors.textSecondary,
        fontSize: '1.125rem'
    },
    checkboxItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: `1px solid ${colors.border}`,
        marginBottom: '0.5rem'
    },
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem',
        color: colors.textSecondary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
};


function FacultyDashboard() {
    const [faculty, setFaculty] = useState(null);
    const [courses, setCourses] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [students, setStudents] = useState([]);
    const [submissions, setSubmissions] = useState([]); // NEW: for Grades tab
    const [quizGrades, setQuizGrades] = useState([]); // NEW: for Grades tab
    const [tas, setTAs] = useState([]); // NEW: for TAs tab
    
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [showTAAssignModal, setShowTAAssignModal] = useState(false);
    const [selectedTAForAssign, setSelectedTAForAssign] = useState(null);
    const [selectedCourseForTA, setSelectedCourseForTA] = useState('');
    
    // Dialog state
    const [dialog, setDialog] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info',
        onConfirm: null
    });

    const showDialog = (title, message, type = 'info', onConfirm = null) => {
        setDialog({ isOpen: true, title, message, type, onConfirm });
    };

    const closeDialog = () => {
        setDialog({ isOpen: false, title: '', message: '', type: 'info', onConfirm: null });
    };

    // Forms state
    const [showAssignmentForm, setShowAssignmentForm] = useState(false);
    const [showQuizForm, setShowQuizForm] = useState(false);
    const [showAnnouncementForm, setShowAnnouncementForm] = useState({});
    const [assignmentFormData, setAssignmentFormData] = useState({ title:'', description:'', course:'', due_date:'', max_points:100, file: null });
    const [quizFormData, setQuizFormData] = useState({ title:'', course:'', date:'', time_limit:'' });
    const [announcementFormData, setAnnouncementFormData] = useState({ title:'', content:'' });
    
    // Attendance State 
    const [selectedCourseIdForAttendance, setSelectedCourseIdForAttendance] = useState('');
    const [attendanceMark, setAttendanceMark] = useState({}); // {studentId: true/false}
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [showAttendanceHistory, setShowAttendanceHistory] = useState(false);

    // Grades Filter State
    const [gradeFilter, setGradeFilter] = useState('all'); // all, graded, pending
    const [gradeSearchQuery, setGradeSearchQuery] = useState('');
    const [selectedCourseForGrades, setSelectedCourseForGrades] = useState('all');
    const [selectedQuizForGrades, setSelectedQuizForGrades] = useState('all'); // NEW: Filter by specific quiz
    const [gradeViewMode, setGradeViewMode] = useState('assignments'); // NEW: 'assignments' or 'quizzes'
    
    // Grading State
    const [editingSubmission, setEditingSubmission] = useState(null); // submissionId being edited
    const [gradeFormData, setGradeFormData] = useState({ grade: '', feedback: '' });
    const [editingQuizGrade, setEditingQuizGrade] = useState(null); // quizGradeId being edited
    const [quizGradeFormData, setQuizGradeFormData] = useState({ marks_obtained: '', remarks: '' });

    // Assignment and Quiz Filter State
    const [assignmentSearchQuery, setAssignmentSearchQuery] = useState('');
    const [selectedCourseForAssignments, setSelectedCourseForAssignments] = useState('all');
    const [quizSearchQuery, setQuizSearchQuery] = useState('');
    const [selectedCourseForQuizzes, setSelectedCourseForQuizzes] = useState('all');

    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");
    const headers = { Authorization: `Bearer ${token}` };

    // Fetch faculty & related data
    const fetchFacultyData = async () => {
        if (!token) { navigate("/"); return; }
        setLoading(true);
        try {
            // Updated Promise.all to fetch new data for the new tabs
            const [
                facultyRes, coursesRes, assignmentsRes, quizzesRes, studentsRes, 
                submissionsRes, quizGradesRes, tasRes
            ] = await Promise.all([
                axios.get(API_ENDPOINTS.FACULTY, { headers }),
                axios.get(API_ENDPOINTS.COURSES, { headers }),
                axios.get(API_ENDPOINTS.ASSIGNMENTS, { headers }),
                axios.get(API_ENDPOINTS.QUIZZES, { headers }),
                axios.get(API_ENDPOINTS.STUDENTS, { headers }),
                axios.get(API_ENDPOINTS.SUBMISSIONS, { headers }), // For Grades (Assignments)
                axios.get(API_ENDPOINTS.QUIZ_GRADES, { headers }), // For Grades (Quizzes)
                axios.get(API_ENDPOINTS.TAS, { headers }), // For TAs tab
            ]);

            if (facultyRes.data.length > 0) setFaculty(facultyRes.data[0]);
            setCourses(coursesRes.data);
            setAssignments(assignmentsRes.data);
            setQuizzes(quizzesRes.data);
            setStudents(studentsRes.data);
            setSubmissions(submissionsRes.data); 
            setQuizGrades(quizGradesRes.data);
            setTAs(tasRes.data);

            // Initialize announcement form toggles per course
            const annFormObj = {};
            coursesRes.data.forEach(c => annFormObj[c.id] = false);
            setShowAnnouncementForm(annFormObj);

        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                localStorage.clear();
                navigate("/");
            }
        } finally { setLoading(false); }
    };

    useEffect(() => { fetchFacultyData(); }, []); // eslint-disable-line

    const handleLogout = () => { localStorage.clear(); navigate("/"); };

    // ---------------- Assignment Submit ----------------
    const handleAssignmentSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", assignmentFormData.title);
            formData.append("description", assignmentFormData.description);
            formData.append("course", assignmentFormData.course);
            formData.append("due_date", assignmentFormData.due_date);
            formData.append("max_points", assignmentFormData.max_points);
            if (assignmentFormData.file) formData.append("file", assignmentFormData.file);

            await axios.post(API_ENDPOINTS.ASSIGNMENTS, formData, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
            });

            setShowAssignmentForm(false);
            setAssignmentFormData({ title:'', description:'', course:'', due_date:'', max_points:100, file: null });
            fetchFacultyData();
        } catch(err) {
            console.error("Error adding assignment:", err);
            alert("Failed to add assignment. Check console for details.");
        }
    };

    // ---------------- Quiz Submit ----------------
    const handleQuizSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_ENDPOINTS.QUIZZES, quizFormData, { headers });
            setShowQuizForm(false);
            setQuizFormData({ title:'', course:'', date:'', time_limit:'' });
            fetchFacultyData();
        } catch(err) {
            console.error("Error adding quiz:", err);
        }
    };

    // ---------------- Attendance Submit (FIXED LOGIC) ----------------
    const handleAttendanceSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCourseIdForAttendance) {
            showDialog('Warning', 'Please select a course first.', 'warning');
            return;
        }

        try {
            // FIX: Endpoint should target a custom action on the CourseViewSet: /api/courses/{id}/mark_attendance/
            await axios.post(`${API_ENDPOINTS.COURSES}${selectedCourseIdForAttendance}/mark_attendance/`, {
                // Collect IDs of students marked present
                student_ids: students.filter(s => attendanceMark[s.id]).map(s => s.id) 
            }, { headers });

            showDialog('Success', 'Attendance marked successfully!', 'success');
            // Refresh attendance history
            fetchAttendanceHistory(selectedCourseIdForAttendance);
            setAttendanceMark({}); // Reset marks
            fetchFacultyData(); // Refresh data
        } catch(err) {
            console.error("Error marking attendance:", err.response ? err.response.data : err);
            showDialog('Error', 'Failed to mark attendance. Please try again.', 'error');
        }
    };
    
    // Handler for course selection change in Attendance tab
    const handleCourseSelectForAttendance = (e) => {
        const courseId = e.target.value;
        setSelectedCourseIdForAttendance(courseId);
        
        // Reset attendance marks when a new course is selected
        const attendanceObj = {};
        if (courseId) {
            // Initialize all fetched students to NOT present (false)
            students.forEach(s => attendanceObj[s.id] = false); 
            // Fetch attendance history for this course
            fetchAttendanceHistory(courseId);
        } else {
            setAttendanceHistory([]);
            setShowAttendanceHistory(false);
        }
        setAttendanceMark(attendanceObj);
    };

    // Fetch attendance history for a specific course
    const fetchAttendanceHistory = async (courseId) => {
        try {
            const response = await axios.get(`${API_ENDPOINTS.COURSES}${courseId}/attendance_history/`, { headers });
            setAttendanceHistory(response.data);
        } catch (err) {
            console.error("Error fetching attendance history:", err.response ? err.response.data : err);
        }
    };


    // ---------------- Announcement Submit ----------------
    // In FacultyDashboard.js, inside the handleAnnouncementSubmit function:
const handleAnnouncementSubmit = async (e, courseId) => {
    e.preventDefault();
    try {
        await axios.post(
            `${API_ENDPOINTS.COURSES}${courseId}/post_announcement/`, 
            announcementFormData, 
            { 
                headers: { 
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json' 
                } 
            }
        );
        setAnnouncementFormData({ title:'', content:'' });
        setShowAnnouncementForm({...showAnnouncementForm, [courseId]: false });
        fetchFacultyData();
    } catch(err) {
        console.error(err);
        showDialog('Error', 'Failed to post announcement. Please try again.', 'error');
    }
};

// Handle grading submission
const handleGradeSubmission = async (submissionId) => {
    try {
        await axios.post(
            `${API_ENDPOINTS.SUBMISSIONS}${submissionId}/update_status/`,
            {
                grade: parseFloat(gradeFormData.grade),
                feedback: gradeFormData.feedback,
                status: 'graded'
            },
            { headers }
        );
        setEditingSubmission(null);
        setGradeFormData({ grade: '', feedback: '' });
        fetchFacultyData();
        showDialog('Success', 'Grade submitted successfully!', 'success');
    } catch(err) {
        console.error(err);
        showDialog('Error', 'Failed to submit grade. Please try again.', 'error');
    }
};

// Handle quiz grade update
const handleUpdateQuizGrade = async (quizGradeId) => {
    try {
        // Find the quiz grade to get quiz and student IDs
        const quizGrade = quizGrades.find(g => g.id === quizGradeId);
        
        await axios.put(
            `${API_ENDPOINTS.QUIZ_GRADES}${quizGradeId}/`,
            {
                quiz: quizGrade.quiz,
                student: quizGrade.student,
                marks_obtained: parseFloat(quizGradeFormData.marks_obtained),
                remarks: quizGradeFormData.remarks
            },
            { headers }
        );
        setEditingQuizGrade(null);
        setQuizGradeFormData({ marks_obtained: '', remarks: '' });
        fetchFacultyData();
        showDialog('Success', 'Quiz grade updated successfully!', 'success');
    } catch(err) {
        console.error(err);
        showDialog('Error', 'Failed to update quiz grade. Please try again.', 'error');
    }
};

// Bulk create quiz grades for all students
const handleCreateQuizGrades = async (quizId) => {
    showDialog(
        'Confirm',
        'Create grade records for all enrolled students in this quiz?',
        'confirm',
        async () => {
            await performCreateQuizGrades(quizId);
        }
    );
};

const performCreateQuizGrades = async (quizId) => {
    
    try {
        const quiz = quizzes.find(q => q.id === quizId);
        if (!quiz) {
            showDialog('Error', 'Quiz not found', 'error');
            return;
        }

        // Get students enrolled in the quiz's course
        const courseStudents = students.filter(s => 
            s.courses_enrolled?.includes(quiz.course) || true // Simplified - all students
        );

        let created = 0;
        let skipped = 0;

        for (const student of courseStudents) {
            try {
                await axios.post(
                    API_ENDPOINTS.QUIZ_GRADES,
                    {
                        quiz: quizId,
                        student: student.id,
                        marks_obtained: 0,
                        remarks: 'Pending grading'
                    },
                    { headers }
                );
                created++;
            } catch(err) {
                // Skip if already exists (unique constraint)
                if (err.response?.status === 400) {
                    skipped++;
                } else {
                    console.error(`Failed for student ${student.id}:`, err);
                }
            }
        }

        fetchFacultyData();
        showDialog('Success', `Created ${created} quiz grade records. Skipped ${skipped} (already exist).`, 'success');
    } catch(err) {
        console.error(err);
        showDialog('Error', 'Failed to create quiz grades. Please try again.', 'error');
    }
};

const handleAssignTA = async () => {
    const token = localStorage.getItem("access_token");
    if (!selectedTAForAssign || !selectedCourseForTA) {
        showDialog('Warning', 'Please select both TA and course', 'warning');
        return;
    }
    try {
        await axios.post(
            `${API_ENDPOINTS.COURSES}${selectedCourseForTA}/assign_ta/`,
            { ta_id: selectedTAForAssign },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setShowTAAssignModal(false);
        setSelectedTAForAssign(null);
        setSelectedCourseForTA('');
        fetchFacultyData();
        showDialog('Success', 'TA assigned successfully!', 'success');
    } catch (err) {
        console.error('Error assigning TA:', err);
        showDialog('Error', err.response?.data?.error || 'Failed to assign TA', 'error');
    }
};

const handleRemoveTA = (taId, courseId, taName, courseName) => {
    showDialog(
        'Confirm',
        `Remove ${taName} from ${courseName}?`,
        'confirm',
        async () => {
            await performRemoveTA(taId, courseId);
        }
    );
};

const performRemoveTA = async (taId, courseId) => {
    const token = localStorage.getItem("access_token");
    try {
        console.log('Removing TA:', { taId, courseId, endpoint: `${API_ENDPOINTS.COURSES}${courseId}/remove_ta/` });
        const response = await axios.post(
            `${API_ENDPOINTS.COURSES}${courseId}/remove_ta/`,
            { ta_id: taId },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Remove TA response:', response.data);
        fetchFacultyData();
        showDialog('Success', 'TA removed successfully!', 'success');
    } catch (err) {
        console.error('Error removing TA:', err);
        console.error('Error response:', err.response?.data);
        console.error('Error status:', err.response?.status);
        const errorMsg = err.response?.data?.error || err.response?.data?.message || err.message || 'Failed to remove TA';
        showDialog('Error', errorMsg, 'error');
    }
};

    if (loading) return <div style={styles.loading}>Loading...</div>;
    if (!faculty) return (
        <div style={styles.loading}>
            <p>No faculty data found. Please login.</p>
            <button onClick={() => navigate("/")} style={styles.button}>Go to Login</button>
        </div>
    ); 
    
    // Data preparation for rendering
    const courseForAttendance = courses.find(c => c.id === parseInt(selectedCourseIdForAttendance));
    
    // Filter students enrolled in the selected course for Attendance marking (using all students for simplicity 
    // since specific enrollment list per course is typically a backend detail).
    const studentsToMark = courseForAttendance ? students : [];

    const allSubmissions = submissions.map(s => ({
        id: s.id,
        assignment: s.assignment_title || 'N/A',
        assignmentId: s.assignment,
        student: s.student_name || 'N/A',
        grade: s.grade || null,
        feedback: s.feedback || 'No feedback'
    }));
    
    const allQuizGrades = quizGrades.map(g => ({
        id: g.id,
        quiz: g.quiz_name || 'N/A',
        quizId: g.quiz,
        student: g.student_name || 'N/A',
        score: g.score || g.marks_obtained || 'N/A',
        max: g.max || 'N/A'
    }));

    // Filter submissions for grades tab
    const getFilteredSubmissions = () => {
        let filtered = [...allSubmissions];
        
        // Filter by grading status
        if (gradeFilter === 'graded') {
            filtered = filtered.filter(s => s.grade && s.grade !== 'N/A');
        } else if (gradeFilter === 'pending') {
            filtered = filtered.filter(s => !s.grade || s.grade === 'N/A');
        }
        
        // Filter by course (via assignment)
        if (selectedCourseForGrades !== 'all') {
            const courseAssignments = assignments
                .filter(a => a.course === parseInt(selectedCourseForGrades))
                .map(a => a.id);
            filtered = filtered.filter(s => courseAssignments.includes(s.assignmentId));
        }
        
        // Search filter
        if (gradeSearchQuery) {
            filtered = filtered.filter(s => 
                s.student.toLowerCase().includes(gradeSearchQuery.toLowerCase()) ||
                s.assignment.toLowerCase().includes(gradeSearchQuery.toLowerCase())
            );
        }
        
        return filtered;
    };

    // Filter quiz grades
    const getFilteredQuizGrades = () => {
        let filtered = [...allQuizGrades];
        
        // Filter by specific quiz (takes precedence over course filter)
        if (selectedQuizForGrades !== 'all') {
            filtered = filtered.filter(g => g.quizId === parseInt(selectedQuizForGrades));
        } 
        // Filter by course (via quiz) if no specific quiz selected
        else if (selectedCourseForGrades !== 'all') {
            const courseQuizzes = quizzes
                .filter(q => q.course === parseInt(selectedCourseForGrades))
                .map(q => q.id);
            filtered = filtered.filter(g => courseQuizzes.includes(g.quizId));
        }
        
        // Search filter
        if (gradeSearchQuery) {
            filtered = filtered.filter(g => 
                g.student.toLowerCase().includes(gradeSearchQuery.toLowerCase()) ||
                g.quiz.toLowerCase().includes(gradeSearchQuery.toLowerCase())
            );
        }
        
        return filtered;
    };

    // Filter assignments
    const getFilteredAssignments = () => {
        let filtered = [...assignments];
        
        // Filter by course
        if (selectedCourseForAssignments !== 'all') {
            filtered = filtered.filter(a => a.course === parseInt(selectedCourseForAssignments));
        }
        
        // Search filter
        if (assignmentSearchQuery) {
            filtered = filtered.filter(a => 
                a.title.toLowerCase().includes(assignmentSearchQuery.toLowerCase()) ||
                a.course_code?.toLowerCase().includes(assignmentSearchQuery.toLowerCase()) ||
                a.course_name?.toLowerCase().includes(assignmentSearchQuery.toLowerCase())
            );
        }
        
        return filtered;
    };

    // Filter quizzes
    const getFilteredQuizzes = () => {
        let filtered = [...quizzes];
        
        // Filter by course
        if (selectedCourseForQuizzes !== 'all') {
            filtered = filtered.filter(q => q.course === parseInt(selectedCourseForQuizzes));
        }
        
        // Search filter
        if (quizSearchQuery) {
            filtered = filtered.filter(q => 
                q.title.toLowerCase().includes(quizSearchQuery.toLowerCase()) ||
                q.course_name?.toLowerCase().includes(quizSearchQuery.toLowerCase())
            );
        }
        
        return filtered;
    };


    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerContent}>
                    <div>
                        <h1 style={styles.welcomeText}>
                            <Briefcase size={32} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                            {faculty.first_name} {faculty.last_name}
                        </h1>
                        <p style={styles.subtitle}>
                            <Building size={16} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                            {faculty.designation?.replace('_', ' ').toUpperCase()} • {faculty.department}
                        </p>
                    </div>
                    <button 
                        onClick={handleLogout} 
                        style={styles.logoutBtn}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                    >
                        <LogOut size={18} style={{display: 'inline-block', verticalAlign: 'middle'}} />
                        Logout
                    </button>
                </div>
            </div>
            
            <div style={styles.content}>
                {/* Stats Cards */}
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <BookOpen size={28} color={colors.primary} style={{marginBottom: '0.5rem'}} />
                        <div style={styles.statLabel}>Courses Teaching</div>
                        <div style={{...styles.statValue, color: colors.primary}}>{courses.length}</div>
                    </div>
                    <div style={styles.statCard}>
                        <Users size={28} color={colors.secondary} style={{marginBottom: '0.5rem'}} />
                        <div style={styles.statLabel}>Total Students</div>
                        <div style={{...styles.statValue, color: colors.secondary}}>{students.length}</div>
                    </div>
                    <div style={styles.statCard}>
                        <FileText size={28} color={colors.warning} style={{marginBottom: '0.5rem'}} />
                        <div style={styles.statLabel}>Assignments Posted</div>
                        <div style={{...styles.statValue, color: colors.warning}}>{assignments.length}</div>
                    </div>
                    <div style={styles.statCard}>
                        <ClipboardCheck size={28} color={colors.success} style={{marginBottom: '0.5rem'}} />
                        <div style={styles.statLabel}>Quizzes Scheduled</div>
                        <div style={{...styles.statValue, color: colors.success}}>{quizzes.length}</div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={styles.tabs}>
                    {[
                        {name: 'overview', icon: User},
                        {name: 'courses', icon: BookOpen},
                        {name: 'assignments', icon: FileText},
                        {name: 'quizzes', icon: ClipboardCheck},
                        {name: 'students', icon: Users},
                        {name: 'tas', icon: Briefcase},
                        {name: 'attendance', icon: Calendar},
                        {name: 'grades', icon: Award},
                        {name: 'materials', icon: Upload}
                    ].map(({name, icon: Icon})=>(
                        <button 
                            key={name} 
                            onClick={()=>setActiveTab(name)} 
                            style={activeTab===name ? styles.activeTab : styles.tab}
                        >
                            <Icon size={16} style={{display: 'inline-block', verticalAlign: 'middle'}} />
                            {name.charAt(0).toUpperCase()+name.slice(1)}
                        </button>
                    ))}
                </div>

                {/* --- Overview Tab --- */}
                {activeTab === 'overview' && (
                    <>
                        {/* Profile Card */}
                        <div style={{
                            ...styles.card,
                            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                            color: 'white',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap'}}>
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2.5rem',
                                    fontWeight: '700',
                                    border: '3px solid rgba(255,255,255,0.3)'
                                }}>
                                    {faculty.first_name?.charAt(0)}{faculty.last_name?.charAt(0)}
                                </div>
                                <div style={{flex: 1}}>
                                    <h2 style={{margin: '0 0 0.5rem 0', fontSize: '1.75rem', fontWeight: '700'}}>
                                        {faculty.first_name} {faculty.last_name}
                                    </h2>
                                    <div style={{fontSize: '1rem', opacity: 0.95}}>
                                        {faculty.designation?.replace('_', ' ').toUpperCase()} • {faculty.department}
                                    </div>
                                    {faculty.office && (
                                        <div style={{marginTop: '0.5rem', opacity: 0.9}}>
                                            <MapPin size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                                            Office: {faculty.office}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem'}}>
                            <div style={styles.card}>
                                <h3 style={{...styles.cardTitle, fontSize: '1.125rem'}}>
                                    <BookOpen size={20} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                                    Teaching Summary
                                </h3>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: colors.light, borderRadius: '6px'}}>
                                        <span style={{color: colors.textSecondary, fontSize: '0.875rem'}}>Active Courses</span>
                                        <span style={{fontWeight: '700', color: colors.primary}}>{courses.length}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: colors.light, borderRadius: '6px'}}>
                                        <span style={{color: colors.textSecondary, fontSize: '0.875rem'}}>Total Students</span>
                                        <span style={{fontWeight: '700', color: colors.secondary}}>{students.length}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: colors.light, borderRadius: '6px'}}>
                                        <span style={{color: colors.textSecondary, fontSize: '0.875rem'}}>Assignments Posted</span>
                                        <span style={{fontWeight: '700', color: colors.warning}}>{assignments.length}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: colors.light, borderRadius: '6px'}}>
                                        <span style={{color: colors.textSecondary, fontSize: '0.875rem'}}>Quizzes Scheduled</span>
                                        <span style={{fontWeight: '700', color: colors.success}}>{quizzes.length}</span>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.card}>
                                <h3 style={{...styles.cardTitle, fontSize: '1.125rem'}}>
                                    <Award size={20} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                                    Grading Overview
                                </h3>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: colors.light, borderRadius: '6px'}}>
                                        <span style={{color: colors.textSecondary, fontSize: '0.875rem'}}>Submissions Received</span>
                                        <span style={{fontWeight: '700', color: colors.textPrimary}}>{submissions.length}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: colors.light, borderRadius: '6px'}}>
                                        <span style={{color: colors.textSecondary, fontSize: '0.875rem'}}>Quiz Grades Recorded</span>
                                        <span style={{fontWeight: '700', color: colors.textPrimary}}>{quizGrades.length}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: colors.light, borderRadius: '6px'}}>
                                        <span style={{color: colors.textSecondary, fontSize: '0.875rem'}}>Pending Reviews</span>
                                        <span style={{fontWeight: '700', color: colors.danger}}>
                                            {submissions.filter(s => !s.grade).length}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* --- Courses Tab (Existing Logic) --- */}
                {activeTab === 'courses' && (
                    <div style={styles.card}>
                        <h2 style={styles.cardTitle}>My Courses ({courses.length})</h2>
                        {courses.length > 0 ? courses.map(c => (
                            <div 
                                key={c.id} 
                                style={styles.courseCard}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = colors.primary;
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = colors.border;
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem'}}>
                                    <div>
                                        <h3 style={{margin: 0, color: colors.primary, fontSize: '1.25rem'}}>{c.code}</h3>
                                        <h4 style={{margin: '0.25rem 0 0.5rem 0', fontSize: '1.125rem', fontWeight: '600'}}>{c.name}</h4>
                                    </div>
                                    <span style={{...styles.badge, backgroundColor: colors.primary, color: 'white'}}>
                                        {c.semester && `Semester ${c.semester}`}
                                    </span>
                                </div>
                                <p style={{color: colors.textSecondary, marginBottom: '1rem'}}>{c.description}</p>
                                <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem', fontSize: '0.875rem'}}>
                                    <span style={{color: colors.textSecondary}}>
                                        <Award size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                        {c.credit_hours} Credits
                                    </span>
                                    <span style={{color: colors.textSecondary}}>
                                        <Users size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                        {students.filter(s => s.courses_enrolled?.some(e => e.course === c.id)).length} Students
                                    </span>
                                    {c.tas_detail?.length > 0 && (
                                        <span style={{color: colors.textSecondary}}>
                                            <User size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                            TAs: {c.tas_detail.map(ta => ta.full_name).join(', ')}
                                        </span>
                                    )}
                                </div>

                                {/* Announcements section */}
                                <div style={{marginTop: '1rem', padding: '1rem', backgroundColor: colors.light, borderRadius: '8px'}}>
                                    <h5 style={{margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center'}}>
                                        <MessageSquare size={16} style={{marginRight: '0.5rem'}} />
                                        Announcements ({c.announcements_detail?.length || 0})
                                    </h5>
                                    {(c.announcements_detail?.length || 0) > 0 ? (
                                        c.announcements_detail.map(a => (
                                            <div key={a.id} style={{
                                                backgroundColor: 'white',
                                                padding: '1rem',
                                                borderRadius: '8px',
                                                marginBottom: '0.75rem',
                                                border: `1px solid ${colors.border}`
                                            }}>
                                                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                                                    <strong style={{color: colors.textPrimary}}>{a.title}</strong>
                                                    <small style={{color: colors.textSecondary}}>
                                                        {new Date(a.posted_at).toLocaleDateString()}
                                                    </small>
                                                </div>
                                                <p style={{margin: 0, color: colors.textSecondary, fontSize: '0.875rem'}}>{a.content}</p>
                                            </div>
                                        ))
                                    ) : <p style={{color: colors.textSecondary, fontSize: '0.875rem'}}>No announcements yet.</p>}

                                    <button 
                                        style={{
                                            ...styles.button,
                                            backgroundColor: showAnnouncementForm[c.id] ? colors.textSecondary : colors.success,
                                            marginTop: '0.5rem'
                                        }}
                                        onClick={() => setShowAnnouncementForm({...showAnnouncementForm, [c.id]: !showAnnouncementForm[c.id]})}
                                        onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                                        onMouseLeave={(e) => e.target.style.opacity = '1'}
                                    >
                                        {showAnnouncementForm[c.id] ? <X size={16} /> : <Plus size={16} />}
                                        {showAnnouncementForm[c.id] ? 'Cancel' : 'Post New Announcement'}
                                    </button>

                                    {showAnnouncementForm[c.id] && (
                                        <form onSubmit={(e) => handleAnnouncementSubmit(e, c.id)} style={styles.form}>
                                            <input 
                                                type="text" 
                                                placeholder="Announcement Title" 
                                                value={announcementFormData.title} 
                                                onChange={e => setAnnouncementFormData({...announcementFormData, title: e.target.value})} 
                                                required 
                                                style={styles.input}
                                            />
                                            <textarea 
                                                placeholder="Announcement Content" 
                                                value={announcementFormData.content} 
                                                onChange={e => setAnnouncementFormData({...announcementFormData, content: e.target.value})} 
                                                required 
                                                style={styles.textarea}
                                            />
                                            <button type="submit" style={styles.button}>
                                                <Send size={16} />
                                                Post Announcement
                                            </button>
                                        </form>
                                    )}
                                </div>
                                
                                {/* Attendance Details */}
                                <div style={{marginTop: '1rem', padding: '1rem', backgroundColor: colors.light, borderRadius: '8px'}}>
                                    <h5 style={{margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center'}}>
                                        <Calendar size={16} style={{marginRight: '0.5rem'}} />
                                        Recent Attendance ({c.attendance_detail?.length || 0})
                                    </h5>
                                    {(c.attendance_detail?.length || 0) > 0 ? (
                                        <>
                                            {c.attendance_detail.slice(0, 3).map(att => (
                                                <div key={att.id} style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    padding: '0.75rem',
                                                    backgroundColor: 'white',
                                                    borderRadius: '6px',
                                                    marginBottom: '0.5rem',
                                                    fontSize: '0.875rem'
                                                }}>
                                                    <span style={{color: colors.textPrimary}}>
                                                        <Clock size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                                        {new Date(att.date).toLocaleDateString()}
                                                    </span>
                                                    <span style={{color: colors.success, fontWeight: '600'}}>
                                                        {att.students_present_count} Present
                                                    </span>
                                                </div>
                                            ))}
                                            {(c.attendance_detail?.length || 0) > 3 && (
                                                <p style={{fontSize: '0.875rem', color: colors.textSecondary, margin: '0.5rem 0 0 0'}}>
                                                    +{c.attendance_detail.length - 3} more records
                                                </p>
                                            )}
                                        </>
                                    ) : <p style={{color: colors.textSecondary, fontSize: '0.875rem'}}>No attendance records yet.</p>}
                                </div>
                            </div>
                        )) : <div style={styles.emptyState}>No courses assigned yet</div>}
                    </div>
                )}
                
                {/* --- Assignments Tab (Existing Logic) --- */}
                {activeTab === 'assignments' && (
                    <div style={styles.card}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
                            <h2 style={styles.cardTitle}>
                                <FileText size={24} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                                Assignments
                            </h2>
                            <button style={styles.button} onClick={() => setShowAssignmentForm(!showAssignmentForm)}>
                                <Plus size={16} />
                                {showAssignmentForm ? 'Hide Form' : 'Add Assignment'}
                            </button>
                        </div>
                        
                        {showAssignmentForm && (
                            <form onSubmit={handleAssignmentSubmit} style={{...styles.form, marginBottom: '1.5rem'}}>
                                <input type="text" placeholder="Title" value={assignmentFormData.title} onChange={e=>setAssignmentFormData({...assignmentFormData,title:e.target.value})} required style={styles.input}/>
                                <textarea placeholder="Description" value={assignmentFormData.description} onChange={e=>setAssignmentFormData({...assignmentFormData,description:e.target.value})} required style={styles.textarea}/>
                                <select value={assignmentFormData.course} onChange={e=>setAssignmentFormData({...assignmentFormData,course:e.target.value})} required style={styles.input}>
                                    <option value="">Select Course</option>
                                    {courses.map(c=><option key={c.id} value={c.id}>{c.code} - {c.name}</option>)}
                                </select>
                                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                                    <div>
                                        <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: colors.textSecondary}}>Due Date</label>
                                        <input type="datetime-local" value={assignmentFormData.due_date} onChange={e=>setAssignmentFormData({...assignmentFormData,due_date:e.target.value})} required style={styles.input}/>
                                    </div>
                                    <div>
                                        <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: colors.textSecondary}}>Max Points</label>
                                        <input type="number" placeholder="100" value={assignmentFormData.max_points} onChange={e=>setAssignmentFormData({...assignmentFormData,max_points:parseFloat(e.target.value)})} required min="1" style={styles.input}/>
                                    </div>
                                </div>
                                <div>
                                    <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: colors.textSecondary}}>Attachment (Optional)</label>
                                    <input type="file" onChange={e=>setAssignmentFormData({...assignmentFormData,file:e.target.files[0]})} style={styles.input}/>
                                </div>
                                <button type="submit" style={styles.button}>
                                    <Save size={16} />
                                    Save Assignment
                                </button>
                            </form>
                        )}

                        {/* Filter Bar */}
                        <div style={{display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap'}}>
                            <select 
                                value={selectedCourseForAssignments} 
                                onChange={(e) => setSelectedCourseForAssignments(e.target.value)}
                                style={styles.input}
                            >
                                <option value="all">All Courses</option>
                                {courses.map(c => <option key={c.id} value={c.id}>{c.code} - {c.name}</option>)}
                            </select>
                            <input 
                                type="text" 
                                placeholder="Search assignments..." 
                                value={assignmentSearchQuery}
                                onChange={(e) => setAssignmentSearchQuery(e.target.value)}
                                style={{...styles.input, flex: 1}}
                            />
                            {(selectedCourseForAssignments !== 'all' || assignmentSearchQuery) && (
                                <button 
                                    onClick={() => {
                                        setSelectedCourseForAssignments('all');
                                        setAssignmentSearchQuery('');
                                    }}
                                    style={styles.secondaryButton}
                                >
                                    <X size={16} />
                                    Clear
                                </button>
                            )}
                        </div>

                        <div style={{marginBottom: '1rem', color: colors.textSecondary, fontSize: '0.875rem'}}>
                            Showing {getFilteredAssignments().length} of {assignments.length}
                        </div>

                        {getFilteredAssignments().length > 0 ? getFilteredAssignments().map(a=>(
                            <div key={a.id} style={{...styles.listItem, borderLeft: `5px solid ${colors.warning}`}}> 
                                <div style={{display: 'flex', alignItems: 'start', gap: '1rem'}}>
                                    <FileText size={24} style={{color: colors.warning, flexShrink: 0}} />
                                    <div style={{flex: 1}}>
                                        <h4 style={{margin: '0 0 0.5rem 0', color: colors.textPrimary}}>{a.title}</h4>
                                        <p style={{margin: '0.25rem 0', fontSize: '0.875rem', color: colors.textSecondary}}>
                                            <BookOpen size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                            {a.course_code} - {a.course_name}
                                        </p>
                                        <p style={{margin: '0.25rem 0', fontSize: '0.875rem', color: colors.textSecondary}}>
                                            <Calendar size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                            Due: {new Date(a.due_date).toLocaleDateString()}
                                        </p>
                                        <p style={{margin: '0.25rem 0', fontSize: '0.875rem', color: colors.textSecondary}}>
                                            <Award size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                            Max Points: {a.max_points}
                                        </p>
                                        <p style={{margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: colors.textPrimary}}>{a.description}</p>
                                    </div>
                                </div>
                            </div>
                        )) : <div style={styles.emptyState}>No assignments found</div>}
                    </div>
                )}
                
                {/* --- Quizzes Tab --- */}
                {activeTab === 'quizzes' && (
                    <div style={styles.card}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
                            <h2 style={styles.cardTitle}>
                                <FileQuestion size={24} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                                Quizzes
                            </h2>
                            <button style={styles.button} onClick={() => setShowQuizForm(!showQuizForm)}>
                                <Plus size={16} />
                                {showQuizForm ? 'Hide Form' : 'Add Quiz'}
                            </button>
                        </div>

                        {showQuizForm && (
                            <form onSubmit={handleQuizSubmit} style={{...styles.form, marginBottom: '1.5rem'}}>
                                <input type="text" placeholder="Title" value={quizFormData.title} onChange={e=>setQuizFormData({...quizFormData,title:e.target.value})} required style={styles.input}/>
                                <select value={quizFormData.course} onChange={e=>setQuizFormData({...quizFormData,course:e.target.value})} required style={styles.input}>
                                    <option value="">Select Course</option>
                                    {courses.map(c=><option key={c.id} value={c.id}>{c.code} - {c.name}</option>)}
                                </select>
                                <input type="datetime-local" placeholder="Date and Time" value={quizFormData.date} onChange={e=>setQuizFormData({...quizFormData,date:e.target.value})} required style={styles.input}/>
                                <input type="number" placeholder="Time Limit (minutes)" value={quizFormData.time_limit} onChange={e=>setQuizFormData({...quizFormData,time_limit:e.target.value})} required style={styles.input}/>
                                <button type="submit" style={styles.button}>
                                    <Save size={16} />
                                    Save Quiz
                                </button>
                            </form>
                        )}

                        {/* Filter Bar */}
                        <div style={{display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap'}}>
                            <select 
                                value={selectedCourseForQuizzes} 
                                onChange={(e) => setSelectedCourseForQuizzes(e.target.value)}
                                style={styles.input}
                            >
                                <option value="all">All Courses</option>
                                {courses.map(c => <option key={c.id} value={c.id}>{c.code} - {c.name}</option>)}
                            </select>
                            <input 
                                type="text" 
                                placeholder="Search quizzes..." 
                                value={quizSearchQuery}
                                onChange={(e) => setQuizSearchQuery(e.target.value)}
                                style={{...styles.input, flex: 1}}
                            />
                            {(selectedCourseForQuizzes !== 'all' || quizSearchQuery) && (
                                <button 
                                    onClick={() => {
                                        setSelectedCourseForQuizzes('all');
                                        setQuizSearchQuery('');
                                    }}
                                    style={styles.secondaryButton}
                                >
                                    <X size={16} />
                                    Clear
                                </button>
                            )}
                        </div>

                        <div style={{marginBottom: '1rem', color: colors.textSecondary, fontSize: '0.875rem'}}>
                            Showing {getFilteredQuizzes().length} of {quizzes.length}
                        </div>

                        {getFilteredQuizzes().length > 0 ? getFilteredQuizzes().map(q=>(
                            <div key={q.id} style={{...styles.listItem, borderLeft: `5px solid ${colors.secondary}`}}> 
                                <div style={{display: 'flex', alignItems: 'start', gap: '1rem'}}>
                                    <FileQuestion size={24} style={{color: colors.secondary, flexShrink: 0}} />
                                    <div style={{flex: 1}}>
                                        <h4 style={{margin: '0 0 0.5rem 0', color: colors.textPrimary}}>{q.title}</h4>
                                        <p style={{margin: '0.25rem 0', fontSize: '0.875rem', color: colors.textSecondary}}>
                                            <BookOpen size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                            {q.course_name}
                                        </p>
                                        <p style={{margin: '0.25rem 0', fontSize: '0.875rem', color: colors.textSecondary}}>
                                            <Clock size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                            {new Date(q.date).toLocaleString()}
                                        </p>
                                        <div style={{display: 'flex', gap: '1rem', marginTop: '0.5rem'}}>
                                            <span style={{fontSize: '0.875rem', color: colors.textSecondary}}>
                                                <Award size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                                {q.max_marks} marks
                                            </span>
                                            <span style={{fontSize: '0.875rem', color: colors.textSecondary}}>
                                                <Timer size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                                {q.duration_minutes} mins
                                            </span>
                                        </div>
                                        <button 
                                            onClick={() => handleCreateQuizGrades(q.id)}
                                            style={{...styles.secondaryButton, marginTop: '1rem', fontSize: '0.875rem'}}
                                        >
                                            <Plus size={14} />
                                            Create Grade Records
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )) : <div style={styles.emptyState}>No quizzes found</div>}
                    </div>
                )}

                {/* --- Students Tab (Existing Logic) --- */}
                {activeTab === 'students' && (
                    <div style={styles.card}>
                        <h2 style={styles.cardTitle}>All Students ({students.length})</h2>
                        {students.length > 0 ? (
                            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem'}}>
                                {students.map(s => (
                                    <div 
                                        key={s.id} 
                                        style={{
                                            padding: '1.25rem',
                                            backgroundColor: 'white',
                                            borderRadius: '10px',
                                            border: `2px solid ${colors.border}`,
                                            transition: 'all 0.3s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = colors.primary;
                                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.15)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = colors.border;
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                                            <div style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontSize: '1.25rem',
                                                fontWeight: '700'
                                            }}>
                                                {s.first_name?.charAt(0)}{s.last_name?.charAt(0)}
                                            </div>
                                            <div style={{flex: 1}}>
                                                <h4 style={{margin: 0, fontSize: '1.125rem', fontWeight: '600', color: colors.textPrimary}}>
                                                    {s.first_name} {s.last_name}
                                                </h4>
                                                <p style={{margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: colors.textSecondary}}>
                                                    <Hash size={12} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                                    {s.enrollment_number}
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem'}}>
                                            <div style={{color: colors.textSecondary}}>
                                                <Mail size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                                                {s.user?.email || 'No email'}
                                            </div>
                                            <div style={{color: colors.textSecondary}}>
                                                <Building size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                                                {s.department}
                                            </div>
                                            <div style={{color: colors.textSecondary}}>
                                                <BookOpen size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                                                Year {s.year}, Sem {s.semester}
                                            </div>
                                            {s.cgpa && (
                                                <div style={{color: colors.success, fontWeight: '600'}}>
                                                    <Award size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                                                    CGPA: {s.cgpa}
                                                </div>
                                            )}
                                        </div>
                                        <div style={{
                                            marginTop: '1rem',
                                            paddingTop: '1rem',
                                            borderTop: `1px solid ${colors.border}`,
                                            fontSize: '0.875rem',
                                            color: colors.textSecondary
                                        }}>
                                            Enrolled in {s.courses_enrolled?.length || 0} courses
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : <div style={styles.emptyState}>No students found</div>}
                    </div>
                )}

                {/* --- TAs Tab --- */}
                {activeTab === 'tas' && (
                    <div style={styles.section}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
                            <h3 style={{margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                <Briefcase size={24} />
                                Teaching Assistants
                            </h3>
                            <button 
                                onClick={() => setShowTAAssignModal(true)} 
                                style={styles.button}
                            >
                                <Plus size={18} />
                                Assign TA to Course
                            </button>
                        </div>

                        {tas.length > 0 ? (
                            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem'}}>
                                {tas.map(ta => {
                                    const assignedToMyCourses = ta.courses_assigned?.filter(courseId => 
                                        courses.some(c => c.id === courseId)
                                    ) || [];
                                    const isAssignedToOthers = ta.courses_assigned?.some(courseId => 
                                        !courses.some(c => c.id === courseId)
                                    );

                                    return (
                                        <div key={ta.id} style={{
                                            ...styles.card,
                                            opacity: isAssignedToOthers && assignedToMyCourses.length === 0 ? 0.6 : 1,
                                            border: assignedToMyCourses.length > 0 ? `2px solid ${colors.success}` : `1px solid ${colors.border}`
                                        }}>
                                            <div style={{display: 'flex', alignItems: 'flex-start', gap: '1rem'}}>
                                                <div style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    borderRadius: '50%',
                                                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    fontSize: '1.25rem',
                                                    fontWeight: '700'
                                                }}>
                                                    {ta.first_name?.charAt(0)}{ta.last_name?.charAt(0)}
                                                </div>
                                                <div style={{flex: 1}}>
                                                    <h4 style={{margin: 0, marginBottom: '0.25rem'}}>
                                                        {ta.first_name} {ta.last_name}
                                                    </h4>
                                                    <div style={{fontSize: '0.875rem', color: colors.textSecondary, marginBottom: '0.5rem'}}>
                                                        <Mail size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                                        {ta.user?.email || 'N/A'}
                                                    </div>
                                                    <div style={{fontSize: '0.875rem', color: colors.textSecondary}}>
                                                        <Building size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                                        {ta.department}
                                                    </div>
                                                    {ta.contact_number && (
                                                        <div style={{fontSize: '0.875rem', color: colors.textSecondary, marginTop: '0.25rem'}}>
                                                            <Phone size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                                            {ta.contact_number}
                                                        </div>
                                                    )}
                                                    <div style={{
                                                        fontSize: '0.875rem',
                                                        marginTop: '0.5rem',
                                                        padding: '0.25rem 0.5rem',
                                                        borderRadius: '4px',
                                                        backgroundColor: (ta.courses_assigned?.length || 0) >= 2 ? colors.danger : colors.light,
                                                        color: (ta.courses_assigned?.length || 0) >= 2 ? 'white' : colors.textPrimary,
                                                        fontWeight: '600',
                                                        display: 'inline-block'
                                                    }}>
                                                        {ta.courses_assigned?.length || 0}/2 Courses
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div style={{marginTop: '1rem', paddingTop: '1rem', borderTop: `1px solid ${colors.border}`}}>
                                                {assignedToMyCourses.length > 0 ? (
                                                    <div>
                                                        <div style={{fontSize: '0.875rem', fontWeight: '600', color: colors.success, marginBottom: '0.5rem'}}>
                                                            Assigned to your courses:
                                                        </div>
                                                        {assignedToMyCourses.map(courseId => {
                                                            const course = courses.find(c => c.id === courseId);
                                                            return course ? (
                                                                <div key={courseId} style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center',
                                                                    fontSize: '0.875rem',
                                                                    padding: '0.5rem',
                                                                    backgroundColor: colors.light,
                                                                    borderRadius: '4px',
                                                                    marginBottom: '0.5rem'
                                                                }}>
                                                                    <span>{course.code} - {course.name}</span>
                                                                    <button
                                                                        onClick={() => handleRemoveTA(
                                                                            ta.id,
                                                                            courseId,
                                                                            `${ta.first_name} ${ta.last_name}`,
                                                                            course.code
                                                                        )}
                                                                        style={{
                                                                            padding: '0.25rem 0.5rem',
                                                                            backgroundColor: colors.danger,
                                                                            color: 'white',
                                                                            border: 'none',
                                                                            borderRadius: '4px',
                                                                            cursor: 'pointer',
                                                                            fontSize: '0.75rem',
                                                                            fontWeight: '600',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: '0.25rem'
                                                                        }}
                                                                    >
                                                                        <X size={12} />
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            ) : null;
                                                        })}
                                                    </div>
                                                ) : isAssignedToOthers ? (
                                                    <div style={{fontSize: '0.875rem', color: colors.warning, fontWeight: '600'}}>
                                                        <AlertCircle size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                                        Assigned to other faculty
                                                    </div>
                                                ) : (
                                                    <div style={{fontSize: '0.875rem', color: colors.textSecondary}}>
                                                        Not assigned to any course
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div style={styles.emptyState}>No TAs available</div>
                        )}
                    </div>
                )}

                {/* --- Attendance Tab (NEW LOGIC) --- */}
                {activeTab === 'attendance' && (
                    <div style={styles.section}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
                            <h3 style={{margin: 0}}>Mark Daily Attendance</h3>
                            {selectedCourseIdForAttendance && (
                                <button
                                    type="button"
                                    onClick={() => setShowAttendanceHistory(!showAttendanceHistory)}
                                    style={{
                                        ...styles.button,
                                        backgroundColor: showAttendanceHistory ? colors.secondary : colors.primary,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <Clock3 size={16} />
                                    {showAttendanceHistory ? 'Hide History' : 'View History'}
                                </button>
                            )}
                        </div>

                        {/* Attendance History View */}
                        {showAttendanceHistory && selectedCourseIdForAttendance && (
                            <div style={{...styles.card, marginBottom: '2rem'}}>
                                <h4 style={{...styles.cardTitle, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                    <Calendar size={20} />
                                    Attendance History for {courseForAttendance?.code} - {courseForAttendance?.name}
                                </h4>
                                {attendanceHistory.length > 0 ? (
                                    <div style={{display: 'grid', gap: '1rem'}}>
                                        {attendanceHistory.map((record) => (
                                            <div 
                                                key={record.id} 
                                                style={{
                                                    padding: '1.5rem',
                                                    backgroundColor: colors.light,
                                                    borderRadius: '10px',
                                                    border: `1px solid ${colors.border}`
                                                }}
                                            >
                                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem'}}>
                                                    <div>
                                                        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
                                                            <Calendar size={16} color={colors.primary} />
                                                            <strong style={{fontSize: '1rem', color: colors.textPrimary}}>
                                                                {new Date(record.date).toLocaleDateString('en-US', { 
                                                                    weekday: 'long', 
                                                                    year: 'numeric', 
                                                                    month: 'long', 
                                                                    day: 'numeric' 
                                                                })}
                                                            </strong>
                                                        </div>
                                                        <div style={{fontSize: '0.875rem', color: colors.textSecondary}}>
                                                            Marked by: {record.marked_by_name || 'N/A'}
                                                        </div>
                                                    </div>
                                                    <div style={{
                                                        padding: '0.5rem 1rem',
                                                        backgroundColor: 'white',
                                                        borderRadius: '8px',
                                                        border: `2px solid ${colors.success}`,
                                                        textAlign: 'center'
                                                    }}>
                                                        <div style={{fontSize: '1.5rem', fontWeight: '700', color: colors.success}}>
                                                            {record.students_present_detail?.length || 0}
                                                        </div>
                                                        <div style={{fontSize: '0.75rem', color: colors.textSecondary}}>
                                                            Present
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* List of present students */}
                                                {record.students_present_detail && record.students_present_detail.length > 0 && (
                                                    <div>
                                                        <div style={{fontSize: '0.875rem', fontWeight: '600', color: colors.textSecondary, marginBottom: '0.5rem'}}>
                                                            Students Present:
                                                        </div>
                                                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                                                            {record.students_present_detail.map((student) => (
                                                                <span
                                                                    key={student.id}
                                                                    style={{
                                                                        padding: '0.25rem 0.75rem',
                                                                        backgroundColor: 'white',
                                                                        borderRadius: '20px',
                                                                        fontSize: '0.875rem',
                                                                        border: `1px solid ${colors.border}`,
                                                                        color: colors.textPrimary
                                                                    }}
                                                                >
                                                                    {student.first_name} {student.last_name}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div style={{textAlign: 'center', padding: '2rem', color: colors.textSecondary}}>
                                        <Calendar size={48} style={{marginBottom: '1rem', opacity: 0.3}} />
                                        <p>No attendance records found for this course.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Mark Attendance Form */}
                        <form onSubmit={handleAttendanceSubmit} style={styles.form}>
                            {/* Course Selection */}
                            <select 
                                value={selectedCourseIdForAttendance} 
                                onChange={handleCourseSelectForAttendance} 
                                required 
                                style={{...styles.input, marginBottom: '20px'}}
                            >
                                <option value="">Select Course to Mark Attendance</option>
                                {courses.map(c => (
                                    <option key={c.id} value={c.id}>{c.code} - {c.name}</option>
                                ))}
                            </select>

                            {selectedCourseIdForAttendance && !showAttendanceHistory && (
                                <>
                                    <h4>Mark Students Present for {courseForAttendance?.code} - {courseForAttendance?.name}</h4>
                                    <div style={{maxHeight: '400px', overflowY: 'auto', paddingRight: '10px'}}>
                                        {studentsToMark.length > 0 ? studentsToMark.map(s => (
                                            <div key={s.id} style={styles.checkboxItem}>
                                                <input
                                                    type="checkbox"
                                                    id={`student-${s.id}`}
                                                    checked={!!attendanceMark[s.id]}
                                                    onChange={(e) => setAttendanceMark({ ...attendanceMark, [s.id]: e.target.checked })}
                                                />
                                                <label htmlFor={`student-${s.id}`}>{s.first_name} {s.last_name} ({s.enrollment_number})</label>
                                            </div>
                                        )) : <p>No students available to mark.</p>}
                                    </div>
                                    
                                    <button type="submit" style={{...styles.button, marginTop: '20px'}}>
                                        Submit Attendance
                                    </button>
                                </>
                            )}
                        </form>
                    </div>
                )}

                {/* --- Grades Tab (NEW LOGIC) --- */}
                {activeTab === 'grades' && (
                    <>
                        {/* Summary Stats */}
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem'}}>
                            <div style={{
                                ...styles.card,
                                background: `linear-gradient(135deg, ${colors.success}15 0%, ${colors.success}05 100%)`,
                                borderLeft: `4px solid ${colors.success}`
                            }}>
                                <div style={{textAlign: 'center'}}>
                                    <CheckCircle size={32} color={colors.success} style={{marginBottom: '0.5rem'}} />
                                    <div style={{fontSize: '2rem', fontWeight: '700', color: colors.success}}>
                                        {submissions.filter(s => s.grade).length}
                                    </div>
                                    <div style={{fontSize: '0.875rem', color: colors.textSecondary, marginTop: '0.25rem'}}>
                                        Graded Submissions
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{
                                ...styles.card,
                                background: `linear-gradient(135deg, ${colors.warning}15 0%, ${colors.warning}05 100%)`,
                                borderLeft: `4px solid ${colors.warning}`
                            }}>
                                <div style={{textAlign: 'center'}}>
                                    <Clock3 size={32} color={colors.warning} style={{marginBottom: '0.5rem'}} />
                                    <div style={{fontSize: '2rem', fontWeight: '700', color: colors.warning}}>
                                        {submissions.filter(s => !s.grade).length}
                                    </div>
                                    <div style={{fontSize: '0.875rem', color: colors.textSecondary, marginTop: '0.25rem'}}>
                                        Pending Reviews
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{
                                ...styles.card,
                                background: `linear-gradient(135deg, ${colors.secondary}15 0%, ${colors.secondary}05 100%)`,
                                borderLeft: `4px solid ${colors.secondary}`
                            }}>
                                <div style={{textAlign: 'center'}}>
                                    <ClipboardCheck size={32} color={colors.secondary} style={{marginBottom: '0.5rem'}} />
                                    <div style={{fontSize: '2rem', fontWeight: '700', color: colors.secondary}}>
                                        {quizGrades.length}
                                    </div>
                                    <div style={{fontSize: '0.875rem', color: colors.textSecondary, marginTop: '0.25rem'}}>
                                        Quiz Grades
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* View Mode Toggle */}
                        <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'center'}}>
                            <button
                                onClick={() => setGradeViewMode('assignments')}
                                style={{
                                    ...styles.button,
                                    backgroundColor: gradeViewMode === 'assignments' ? colors.primary : 'white',
                                    color: gradeViewMode === 'assignments' ? 'white' : colors.textPrimary,
                                    border: `2px solid ${gradeViewMode === 'assignments' ? colors.primary : colors.border}`,
                                    flex: 1,
                                    maxWidth: '300px'
                                }}
                            >
                                <FileText size={16} />
                                Assignments ({submissions.length})
                            </button>
                            <button
                                onClick={() => setGradeViewMode('quizzes')}
                                style={{
                                    ...styles.button,
                                    backgroundColor: gradeViewMode === 'quizzes' ? colors.secondary : 'white',
                                    color: gradeViewMode === 'quizzes' ? 'white' : colors.textPrimary,
                                    border: `2px solid ${gradeViewMode === 'quizzes' ? colors.secondary : colors.border}`,
                                    flex: 1,
                                    maxWidth: '300px'
                                }}
                            >
                                <FileQuestion size={16} />
                                Quizzes ({quizGrades.length})
                            </button>
                        </div>

                        {/* Filters */}
                        <div style={{...styles.card, marginBottom: '1.5rem'}}>
                            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'end'}}>
                                <div style={{flex: '1', minWidth: '200px'}}>
                                    <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: colors.textSecondary}}>
                                        <Filter size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                        Filter by Course
                                    </label>
                                    <select 
                                        style={styles.select}
                                        value={selectedCourseForGrades}
                                        onChange={(e) => {
                                            setSelectedCourseForGrades(e.target.value);
                                            setSelectedQuizForGrades('all'); // Reset quiz filter when course changes
                                        }}
                                    >
                                        <option value="all">All Courses</option>
                                        {courses.map(c => (
                                            <option key={c.id} value={c.id}>{c.code} - {c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Show Quiz filter only when in quizzes view mode */}
                                {gradeViewMode === 'quizzes' && (
                                    <div style={{flex: '1', minWidth: '200px'}}>
                                        <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: colors.textSecondary}}>
                                            <FileQuestion size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                            Filter by Quiz
                                        </label>
                                        <select 
                                            style={styles.select}
                                            value={selectedQuizForGrades}
                                            onChange={(e) => setSelectedQuizForGrades(e.target.value)}
                                        >
                                            <option value="all">All Quizzes</option>
                                            {quizzes
                                                .filter(q => selectedCourseForGrades === 'all' || q.course === parseInt(selectedCourseForGrades))
                                                .map(q => (
                                                    <option key={q.id} value={q.id}>{q.title}</option>
                                                ))}
                                        </select>
                                    </div>
                                )}
                                
                                {/* Show Status filter only for assignments */}
                                {gradeViewMode === 'assignments' && (
                                    <div style={{flex: '1', minWidth: '200px'}}>
                                        <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: colors.textSecondary}}>
                                            <Filter size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                            Grading Status
                                        </label>
                                        <select 
                                            style={styles.select}
                                            value={gradeFilter}
                                            onChange={(e) => setGradeFilter(e.target.value)}
                                        >
                                            <option value="all">All Submissions</option>
                                            <option value="graded">Graded</option>
                                            <option value="pending">Pending</option>
                                        </select>
                                    </div>
                                )}
                                
                                <div style={{flex: '1', minWidth: '250px'}}>
                                    <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: colors.textSecondary}}>
                                        <Search size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                        Search
                                    </label>
                                    <input 
                                        type="text"
                                        style={styles.input}
                                        placeholder="Search by student or assignment..."
                                        value={gradeSearchQuery}
                                        onChange={(e) => setGradeSearchQuery(e.target.value)}
                                    />
                                </div>
                                
                                {(selectedCourseForGrades !== 'all' || selectedQuizForGrades !== 'all' || gradeFilter !== 'all' || gradeSearchQuery) && (
                                    <button 
                                        style={{...styles.secondaryButton, padding: '0.75rem 1rem'}}
                                        onClick={() => {
                                            setSelectedCourseForGrades('all');
                                            setSelectedQuizForGrades('all');
                                            setGradeFilter('all');
                                            setGradeSearchQuery('');
                                        }}
                                    >
                                        <X size={16} />
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Assignment Submissions */}
                        {gradeViewMode === 'assignments' && (
                        <div style={styles.card}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
                                <h2 style={{...styles.cardTitle, margin: 0}}>
                                    <FileText size={24} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                                    Assignment Submissions
                                </h2>
                                <span style={{...styles.badge, backgroundColor: colors.light, color: colors.textPrimary}}>
                                    Showing {getFilteredSubmissions().length} of {allSubmissions.length}
                                </span>
                            </div>
                            {getFilteredSubmissions().length > 0 ? (
                                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                                    {getFilteredSubmissions().map(s => (
                                        <div 
                                            key={s.id} 
                                            style={{
                                                padding: '1.5rem',
                                                backgroundColor: colors.light,
                                                borderRadius: '10px',
                                                border: `2px solid ${s.grade ? colors.success : colors.warning}`,
                                                transition: 'all 0.3s'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.boxShadow = 'none';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                            }}
                                        >
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem'}}>
                                                <div style={{flex: 1}}>
                                                    <h4 style={{margin: 0, fontSize: '1.125rem', fontWeight: '600', color: colors.textPrimary}}>
                                                        {s.student}
                                                    </h4>
                                                    <p style={{margin: '0.5rem 0', color: colors.textSecondary, fontSize: '0.875rem'}}>
                                                        <FileText size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                                                        Assignment: {s.assignment}
                                                    </p>
                                                </div>
                                                <div style={{textAlign: 'right'}}>
                                                    <span style={{
                                                        ...styles.badge,
                                                        backgroundColor: s.grade ? colors.success : colors.warning,
                                                        color: 'white',
                                                        fontSize: '1rem',
                                                        padding: '0.5rem 1rem'
                                                    }}>
                                                        {s.grade ? `Grade: ${s.grade}` : 'Pending'}
                                                    </span>
                                                </div>
                                            </div>
                                            {s.feedback && s.feedback !== 'No feedback' && !editingSubmission && (
                                                <div style={{
                                                    padding: '1rem',
                                                    backgroundColor: 'white',
                                                    borderRadius: '8px',
                                                    border: `1px solid ${colors.border}`,
                                                    marginTop: '1rem'
                                                }}>
                                                    <div style={{fontSize: '0.875rem', color: colors.textSecondary, marginBottom: '0.5rem', fontWeight: '600'}}>
                                                        <MessageSquare size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                                                        Feedback:
                                                    </div>
                                                    <p style={{margin: 0, color: colors.textPrimary, fontSize: '0.875rem'}}>
                                                        {s.feedback}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Grading Form/Button */}
                                            {editingSubmission === s.id ? (
                                                <div style={{...styles.form, marginTop: '1rem'}}>
                                                    <div>
                                                        <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: colors.textSecondary}}>
                                                            Grade
                                                        </label>
                                                        <input 
                                                            type="text"
                                                            style={styles.input}
                                                            placeholder="Enter grade (e.g., 95, A+)"
                                                            value={gradeFormData.grade}
                                                            onChange={(e) => setGradeFormData({...gradeFormData, grade: e.target.value})}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: colors.textSecondary}}>
                                                            Feedback
                                                        </label>
                                                        <textarea 
                                                            style={styles.textarea}
                                                            placeholder="Enter feedback for the student..."
                                                            value={gradeFormData.feedback}
                                                            onChange={(e) => setGradeFormData({...gradeFormData, feedback: e.target.value})}
                                                        />
                                                    </div>
                                                    <div style={{display: 'flex', gap: '0.75rem'}}>
                                                        <button 
                                                            style={styles.button}
                                                            onClick={() => handleGradeSubmission(s.id)}
                                                        >
                                                            <CheckCircle size={16} />
                                                            Submit Grade
                                                        </button>
                                                        <button 
                                                            style={styles.secondaryButton}
                                                            onClick={() => {
                                                                setEditingSubmission(null);
                                                                setGradeFormData({ grade: '', feedback: '' });
                                                            }}
                                                        >
                                                            <X size={16} />
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div style={{marginTop: '1rem'}}>
                                                    <button 
                                                        style={{...styles.button, backgroundColor: s.grade ? colors.secondary : colors.primary}}
                                                        onClick={() => {
                                                            setEditingSubmission(s.id);
                                                            setGradeFormData({ 
                                                                grade: s.grade && s.grade !== 'N/A' ? s.grade : '', 
                                                                feedback: s.feedback && s.feedback !== 'No feedback' ? s.feedback : '' 
                                                            });
                                                        }}
                                                    >
                                                        <Edit size={16} />
                                                        {s.grade ? 'Edit Grade' : 'Add Grade'}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={styles.emptyState}>
                                    {gradeSearchQuery || selectedCourseForGrades !== 'all' || gradeFilter !== 'all'
                                        ? 'No submissions match your filters'
                                        : 'No submissions to review'}
                                </div>
                            )}
                        </div>
                        )}

                        {/* Quiz Grades */}
                        {gradeViewMode === 'quizzes' && (
                        <div style={styles.card}>
                            <div style={{marginBottom: '1.5rem'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: selectedQuizForGrades !== 'all' ? '1rem' : '0'}}>
                                    <h2 style={{...styles.cardTitle, margin: 0}}>
                                        <ClipboardCheck size={24} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                                        Quiz Grades
                                    </h2>
                                    <span style={{...styles.badge, backgroundColor: colors.light, color: colors.textPrimary}}>
                                        Showing {getFilteredQuizGrades().length} of {allQuizGrades.length}
                                    </span>
                                </div>
                                
                                {/* Show selected quiz info */}
                                {selectedQuizForGrades !== 'all' && (() => {
                                    const selectedQuiz = quizzes.find(q => q.id === parseInt(selectedQuizForGrades));
                                    return selectedQuiz ? (
                                        <div style={{
                                            padding: '1rem',
                                            backgroundColor: colors.light,
                                            borderRadius: '8px',
                                            borderLeft: `4px solid ${colors.secondary}`
                                        }}>
                                            <div style={{fontSize: '0.875rem', color: colors.textSecondary, marginBottom: '0.25rem'}}>
                                                Grading for:
                                            </div>
                                            <div style={{fontWeight: '600', color: colors.textPrimary, fontSize: '1rem'}}>
                                                {selectedQuiz.title}
                                            </div>
                                            <div style={{fontSize: '0.875rem', color: colors.textSecondary, marginTop: '0.25rem'}}>
                                                {selectedQuiz.course_name} • Max: {selectedQuiz.max_marks} marks
                                            </div>
                                        </div>
                                    ) : null;
                                })()}
                            </div>
                            {getFilteredQuizGrades().length > 0 ? (
                                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem'}}>
                                    {getFilteredQuizGrades().map(g => (
                                        <div 
                                            key={g.id} 
                                            style={{
                                                padding: '1.25rem',
                                                backgroundColor: 'white',
                                                borderRadius: '10px',
                                                border: `2px solid ${colors.border}`,
                                                transition: 'all 0.3s'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor = colors.secondary;
                                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.15)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor = colors.border;
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                        >
                                            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                                                <div style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    borderRadius: '50%',
                                                    background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    fontSize: '1.25rem',
                                                    fontWeight: '700'
                                                }}>
                                                    {g.student?.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div style={{flex: 1}}>
                                                    <h4 style={{margin: 0, fontSize: '1rem', fontWeight: '600', color: colors.textPrimary}}>
                                                        {g.student}
                                                    </h4>
                                                    <p style={{margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: colors.textSecondary}}>
                                                        {g.quiz}
                                                    </p>
                                                </div>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '1rem',
                                                backgroundColor: colors.light,
                                                borderRadius: '8px'
                                            }}>
                                                <span style={{fontSize: '0.875rem', color: colors.textSecondary, fontWeight: '600'}}>
                                                    Score:
                                                </span>
                                                <span style={{fontSize: '1.5rem', fontWeight: '700', color: colors.secondary}}>
                                                    {g.score} / {g.max}
                                                </span>
                                            </div>
                                            <div style={{
                                                marginTop: '0.75rem',
                                                textAlign: 'center',
                                                fontSize: '0.875rem',
                                                color: colors.textSecondary
                                            }}>
                                                {Math.round((g.score / g.max) * 100)}% Score
                                            </div>

                                            {/* Edit Quiz Grade */}
                                            {editingQuizGrade === g.id ? (
                                                <div style={{marginTop: '1rem', padding: '1rem', backgroundColor: colors.light, borderRadius: '8px'}}>
                                                    <div style={{marginBottom: '0.75rem'}}>
                                                        <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: colors.textSecondary}}>
                                                            Score (out of {g.max})
                                                        </label>
                                                        <input 
                                                            type="number"
                                                            style={styles.input}
                                                            placeholder="Enter score"
                                                            value={quizGradeFormData.marks_obtained}
                                                            onChange={(e) => setQuizGradeFormData({...quizGradeFormData, marks_obtained: e.target.value})}
                                                            max={g.max}
                                                            min="0"
                                                        />
                                                    </div>
                                                    <div style={{marginBottom: '0.75rem'}}>
                                                        <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: colors.textSecondary}}>
                                                            Remarks
                                                        </label>
                                                        <textarea 
                                                            style={{...styles.textarea, minHeight: '60px'}}
                                                            placeholder="Optional remarks..."
                                                            value={quizGradeFormData.remarks}
                                                            onChange={(e) => setQuizGradeFormData({...quizGradeFormData, remarks: e.target.value})}
                                                        />
                                                    </div>
                                                    <div style={{display: 'flex', gap: '0.5rem'}}>
                                                        <button 
                                                            style={{...styles.button, fontSize: '0.875rem', padding: '0.5rem 1rem'}}
                                                            onClick={() => handleUpdateQuizGrade(g.id)}
                                                        >
                                                            <CheckCircle size={14} />
                                                            Save
                                                        </button>
                                                        <button 
                                                            style={{...styles.secondaryButton, fontSize: '0.875rem', padding: '0.5rem 1rem'}}
                                                            onClick={() => {
                                                                setEditingQuizGrade(null);
                                                                setQuizGradeFormData({ marks_obtained: '', remarks: '' });
                                                            }}
                                                        >
                                                            <X size={14} />
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button 
                                                    style={{...styles.secondaryButton, width: '100%', marginTop: '1rem', justifyContent: 'center'}}
                                                    onClick={() => {
                                                        setEditingQuizGrade(g.id);
                                                        setQuizGradeFormData({ 
                                                            marks_obtained: g.score !== 'N/A' ? g.score : '', 
                                                            remarks: '' 
                                                        });
                                                    }}
                                                >
                                                    <Edit size={14} />
                                                    Edit Grade
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={styles.emptyState}>
                                    {gradeSearchQuery || selectedCourseForGrades !== 'all'
                                        ? 'No quiz grades match your filters'
                                        : 'No quiz grades recorded yet'}
                                </div>
                            )}
                        </div>
                        )}
                    </>
                )}

                {/* --- Materials Tab (NEW LOGIC for Slides/Syllabus etc.) --- */}
                {activeTab === 'materials' && (
                    <div style={styles.section}>
                        <h3>Course Materials (Syllabus, Slides, Videos)</h3>
                        {courses.map(c => (
                            <div key={c.id} style={{...styles.listItem, borderLeft: '5px solid #fd7e14'}}>
                                <h4>{c.code} - {c.name}</h4>
                                <p><strong>Syllabus:</strong> {c.syllabus ? <a href={c.syllabus} target="_blank" rel="noopener noreferrer" style={{color: '#007bff'}}>View Syllabus</a> : 'N/A'}</p>
                                <p><strong>Slides:</strong> {c.slides ? <a href={c.slides} target="_blank" rel="noopener noreferrer" style={{color: '#007bff'}}>View Slides</a> : 'N/A'}</p>
                                <p><strong>Learning Materials:</strong> {c.learning_materials ? <a href={c.learning_materials} target="_blank" rel="noopener noreferrer" style={{color: '#007bff'}}>View Materials</a> : 'N/A'}</p>
                                <p><strong>Videos:</strong> {c.videos ? <a href={c.videos} target="_blank" rel="noopener noreferrer" style={{color: '#007bff'}}>Watch Videos</a> : 'N/A'}</p>
                                <p><strong>Weekly Topics:</strong> {c.weekly_topics || 'N/A'}</p>
                                <p style={{marginTop: '10px'}}>
                                    <button style={{...styles.button, backgroundColor: '#6c757d'}}>Upload/Edit Materials (Feature To Be Added)</button>
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* TA Assignment Modal */}
                {showTAAssignModal && (
                    <div style={styles.modal} onClick={() => setShowTAAssignModal(false)}>
                        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
                                <h3 style={{margin: 0}}>Assign TA to Course</h3>
                                <button onClick={() => setShowTAAssignModal(false)} style={styles.closeBtn}>
                                    <X size={24} />
                                </button>
                            </div>

                            <div style={{marginBottom: '1rem'}}>
                                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>
                                    Select TA:
                                </label>
                                <select
                                    value={selectedTAForAssign || ''}
                                    onChange={(e) => setSelectedTAForAssign(e.target.value)}
                                    style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: `1px solid ${colors.border}`}}
                                >
                                    <option value="">-- Select TA --</option>
                                    {tas.filter(ta => {
                                        // Show all TAs but indicate if already assigned to other faculty
                                        return true;
                                    }).map(ta => {
                                        const assignedToOthers = ta.courses_assigned?.some(courseId => 
                                            !courses.some(c => c.id === courseId)
                                        );
                                        const totalCourses = ta.courses_assigned?.length || 0;
                                        const isFull = totalCourses >= 2;
                                        return (
                                            <option key={ta.id} value={ta.id} disabled={isFull}>
                                                {ta.first_name} {ta.last_name} - {ta.department} ({totalCourses}/2 courses)
                                                {isFull ? ' - FULL' : ''}
                                                {assignedToOthers && !isFull ? ' (Assigned to other faculty)' : ''}
                                            </option>
                                        );
                                    })}
                                </select>
                                <div style={{fontSize: '0.875rem', color: colors.textSecondary, marginTop: '0.5rem'}}>
                                    ℹ️ Each TA can be assigned to a maximum of 2 courses
                                </div>
                            </div>

                            <div style={{marginBottom: '1.5rem'}}>
                                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>
                                    Select Course:
                                </label>
                                <select
                                    value={selectedCourseForTA || ''}
                                    onChange={(e) => setSelectedCourseForTA(e.target.value)}
                                    style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: `1px solid ${colors.border}`}}
                                >
                                    <option value="">-- Select Course --</option>
                                    {courses.map(course => (
                                        <option key={course.id} value={course.id}>
                                            {course.code} - {course.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
                                <button
                                    onClick={() => setShowTAAssignModal(false)}
                                    style={{...styles.button, backgroundColor: colors.border, color: colors.textPrimary}}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAssignTA}
                                    style={styles.button}
                                >
                                    <Plus size={18} />
                                    Assign TA
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Dialog Component */}
                <Dialog
                    isOpen={dialog.isOpen}
                    onClose={closeDialog}
                    title={dialog.title}
                    message={dialog.message}
                    type={dialog.type}
                    onConfirm={dialog.onConfirm}
                />
            </div>
        </div>
    );
}

export default FacultyDashboard;

// Add API_ENDPOINTS structure check for completeness (this should be in a separate file like config/api.js)
// export const API_ENDPOINTS = {
//     FACULTY: 'YOUR_BASE_API_URL/faculty/',
//     COURSES: 'YOUR_BASE_API_URL/courses/',
//     ASSIGNMENTS: 'YOUR_BASE_API_URL/assignments/',
//     QUIZZES: 'YOUR_BASE_API_URL/quizzes/',
//     STUDENTS: 'YOUR_BASE_API_URL/students/',
//     SUBMISSIONS: 'YOUR_BASE_API_URL/submissions/', 
//     QUIZ_GRADES: 'YOUR_BASE_API_URL/quiz-grades/', 
//     // ... other endpoints
// };