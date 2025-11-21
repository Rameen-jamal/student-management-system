import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "./config/api";
import { 
    User, BookOpen, ClipboardCheck, Clock, Users, LogOut, 
    CheckCircle, AlertCircle, Target, MessageSquare, 
    Award, FileText, TrendingUp, Briefcase, Edit2, Save, X, XCircle
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

// Color palette matching FacultyDashboard
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

function TADashboard() {
    const [ta, setTA] = useState(null);
    const [stats, setStats] = useState({});
    const [tasks, setTasks] = useState([]);
    const [courses, setCourses] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskUpdate, setTaskUpdate] = useState({ status: '', completion_notes: '' });
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [gradeData, setGradeData] = useState({ grade: '', feedback: '' });
    const navigate = useNavigate();

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

    const fetchTAData = useCallback(async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("/");
            return;
        }

        try {
            const headers = { Authorization: `Bearer ${token}` };
            
            // Fetch TA profile using 'me' endpoint
            const taRes = await axios.get(`${API_ENDPOINTS.TAS}me/`, { headers });
            setTA(taRes.data);

            // Fetch dashboard stats
            const statsRes = await axios.get(`${API_ENDPOINTS.TAS}dashboard_stats/`, { headers });
            setStats(statsRes.data);

            // Fetch tasks
            const tasksRes = await axios.get(API_ENDPOINTS.TA_TASKS, { headers });
            setTasks(tasksRes.data);

            // Fetch assigned courses
            const coursesRes = await axios.get(API_ENDPOINTS.COURSES, { headers });
            setCourses(coursesRes.data);

            // Fetch assignments
            const assignmentsRes = await axios.get(API_ENDPOINTS.ASSIGNMENTS, { headers });
            setAssignments(assignmentsRes.data);

            // Fetch submissions
            const submissionsRes = await axios.get(API_ENDPOINTS.SUBMISSIONS, { headers });
            setSubmissions(submissionsRes.data);

        } catch (err) {
            console.error('Error fetching TA data:', err);
            if (err.response?.status === 401) {
                localStorage.clear();
                navigate("/");
            }
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchTAData();
    }, [fetchTAData]);

    const handleUpdateTask = async (taskId) => {
        const token = localStorage.getItem("access_token");
        try {
            await axios.patch(
                `${API_ENDPOINTS.TA_TASKS}${taskId}/update_status/`,
                taskUpdate,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSelectedTask(null);
            setTaskUpdate({ status: '', completion_notes: '' });
            fetchTAData();
            showDialog('Success', 'Task updated successfully!', 'success');
        } catch (err) {
            console.error('Error updating task:', err);
            showDialog('Error', 'Failed to update task. Please try again.', 'error');
        }
    };

    const handleGradeSubmission = async (submissionId) => {
        const token = localStorage.getItem("access_token");
        try {
            await axios.patch(
                `${API_ENDPOINTS.SUBMISSIONS}${submissionId}/grade/`,
                gradeData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSelectedSubmission(null);
            setGradeData({ grade: '', feedback: '' });
            fetchTAData();
            showDialog('Success', 'Submission graded successfully!', 'success');
        } catch (err) {
            console.error('Error grading submission:', err);
            showDialog('Error', 'Failed to grade submission. Please try again.', 'error');
        }
    };

    const openTaskModal = (task) => {
        setSelectedTask(task);
        setTaskUpdate({
            status: task.status,
            completion_notes: task.completion_notes || ''
        });
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    if (loading) {
        return <div style={styles.loading}>Loading...</div>;
    }

    if (!ta) {
        return (
            <div style={styles.loading}>
                <p>No TA data found. Please login.</p>
                <button onClick={() => navigate("/")} style={styles.button}>
                    Go to Login
                </button>
            </div>
        );
    }

    const pendingTasks = tasks.filter(t => t.status === 'pending');
    const completedTasks = tasks.filter(t => t.status === 'completed');

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerContent}>
                    <div>
                        <h1 style={styles.welcomeText}>
                            <Briefcase size={32} />
                            Teaching Assistant Dashboard
                        </h1>
                        <p style={styles.subtitle}>
                            <User size={18} />
                            {ta.full_name} • {ta.department}
                        </p>
                    </div>
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div style={styles.tabs}>
                <button
                    style={activeTab === 'overview' ? styles.activeTab : styles.tab}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button
                    style={activeTab === 'tasks' ? styles.activeTab : styles.tab}
                    onClick={() => setActiveTab('tasks')}
                >
                    My Tasks ({pendingTasks.length})
                </button>
                <button
                    style={activeTab === 'courses' ? styles.activeTab : styles.tab}
                    onClick={() => setActiveTab('courses')}
                >
                    Assigned Courses
                </button>
                <button
                    style={activeTab === 'submissions' ? styles.activeTab : styles.tab}
                    onClick={() => setActiveTab('submissions')}
                >
                    Submissions ({submissions.filter(s => !s.grade && s.status !== 'graded').length})
                </button>
            </div>

            {/* Content */}
            <div style={styles.content}>
                {activeTab === 'overview' && (
                    <div>
                        <div style={styles.statsGrid}>
                            <div style={styles.statCard}>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <div>
                                        <p style={{margin: 0, fontSize: '0.875rem', color: colors.textSecondary, fontWeight: '600'}}>ASSIGNED COURSES</p>
                                        <h3 style={{margin: '0.5rem 0', fontSize: '2.5rem', fontWeight: '700'}}>{stats.assigned_courses_count || 0}</h3>
                                    </div>
                                    <BookOpen size={40} color={colors.primary} />
                                </div>
                            </div>
                            <div style={styles.statCard}>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <div>
                                        <p style={{margin: 0, fontSize: '0.875rem', color: colors.textSecondary, fontWeight: '600'}}>PENDING TASKS</p>
                                        <h3 style={{margin: '0.5rem 0', fontSize: '2.5rem', fontWeight: '700'}}>{stats.pending_tasks || 0}</h3>
                                    </div>
                                    <ClipboardCheck size={40} color={colors.warning} />
                                </div>
                            </div>
                            <div style={styles.statCard}>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <div>
                                        <p style={{margin: 0, fontSize: '0.875rem', color: colors.textSecondary, fontWeight: '600'}}>TO GRADE</p>
                                        <h3 style={{margin: '0.5rem 0', fontSize: '2.5rem', fontWeight: '700'}}>{stats.submissions_to_grade || 0}</h3>
                                    </div>
                                    <Award size={40} color={colors.danger} />
                                </div>
                            </div>
                            <div style={styles.statCard}>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <div>
                                        <p style={{margin: 0, fontSize: '0.875rem', color: colors.textSecondary, fontWeight: '600'}}>TOTAL STUDENTS</p>
                                        <h3 style={{margin: '0.5rem 0', fontSize: '2.5rem', fontWeight: '700'}}>{stats.total_students || 0}</h3>
                                    </div>
                                    <Users size={40} color={colors.success} />
                                </div>
                            </div>
                        </div>

                        <div style={styles.section}>
                            <h3 style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem'}}>
                                <User size={24} />
                                Profile Information
                            </h3>
                            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem'}}>
                                <p><strong>Name:</strong> {ta.full_name}</p>
                                <p><strong>Email:</strong> {ta.user?.email || 'N/A'}</p>
                                <p><strong>Department:</strong> {ta.department}</p>
                                <p><strong>Contact:</strong> {ta.contact_number || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'tasks' && (
                    <div style={styles.section}>
                        <h3>My Tasks</h3>
                        
                        <h4 style={{ marginTop: '20px' }}>Pending Tasks</h4>
                        {pendingTasks.length > 0 ? (
                            <div style={styles.list}>
                                {pendingTasks.map(task => (
                                    <div key={task.id} style={styles.taskCard}>
                                        <div>
                                            <h4>{task.title}</h4>
                                            <p>{task.description}</p>
                                            <p><strong>Course:</strong> {task.course?.code || 'N/A'}</p>
                                            <p><strong>Assigned by:</strong> {task.assigned_by?.full_name || 'Faculty'}</p>
                                            <p><strong>Due Date:</strong> {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}</p>
                                        </div>
                                        <button
                                            onClick={() => openTaskModal(task)}
                                            style={styles.completeBtn}
                                        >
                                            Update Status
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No pending tasks!</p>
                        )}

                        <h4 style={{ marginTop: '30px' }}>Completed Tasks</h4>
                        {completedTasks.length > 0 ? (
                            <div style={styles.list}>
                                {completedTasks.map(task => (
                                    <div key={task.id} style={{...styles.taskCard, opacity: 0.7}}>
                                        <div>
                                            <h4>{task.title}</h4>
                                            <p>{task.description}</p>
                                            <p><strong>Course:</strong> {task.course_name}</p>
                                            <p style={{color: 'green'}}>✓ Completed</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No completed tasks yet.</p>
                        )}
                    </div>
                )}

                {activeTab === 'courses' && (
                    <div style={styles.section}>
                        <h3 style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                            <BookOpen size={24} />
                            Assigned Courses
                        </h3>
                        {courses.length > 0 ? (
                            <div style={styles.list}>
                                {courses.map(course => (
                                    <div key={course.id} style={styles.listItem}>
                                        <h4>{course.code} - {course.name}</h4>
                                        <p>{course.description}</p>
                                        <p><strong>Credit Hours:</strong> {course.credit_hours}</p>
                                        <p><strong>Faculty:</strong> {course.faculty?.full_name || 'Not assigned'}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No courses assigned yet.</p>
                        )}
                    </div>
                )}

                {activeTab === 'submissions' && (
                    <div style={styles.section}>
                        <h3 style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                            <ClipboardCheck size={24} />
                            Student Submissions - Grading Interface
                        </h3>
                        
                        <h4 style={{ marginTop: '20px', color: colors.warning }}>Pending Grading</h4>
                        {submissions.filter(s => s.status !== 'graded' && (!s.grade || s.grade === null || s.grade === 0)).length > 0 ? (
                            <div style={styles.list}>
                                {submissions.filter(s => s.status !== 'graded' && (!s.grade || s.grade === null || s.grade === 0)).map(submission => (
                                    <div key={submission.id} style={styles.submissionCard}>
                                        <div style={{flex: 1}}>
                                            <h4>{submission.assignment?.title || 'Assignment'}</h4>
                                            <p><strong>Student:</strong> {submission.student?.full_name || 'Unknown'}</p>
                                            <p><strong>Course:</strong> {submission.assignment?.course?.code || 'N/A'}</p>
                                            <p><strong>Submitted:</strong> {submission.submitted_at ? new Date(submission.submitted_at).toLocaleString() : 'N/A'}</p>
                                            <p><strong>Max Points:</strong> {submission.assignment?.max_points || 100}</p>
                                            {submission.file && (
                                                <p><a href={submission.file} target="_blank" rel="noopener noreferrer" style={{color: colors.primary}}>View Submission File</a></p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => {
                                                setSelectedSubmission(submission);
                                                setGradeData({ grade: '', feedback: '' });
                                            }}
                                            style={styles.gradeBtn}
                                        >
                                            <Edit2 size={18} />
                                            Grade
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No submissions pending grading!</p>
                        )}

                        <h4 style={{ marginTop: '30px', color: colors.success }}>Graded Submissions</h4>
                        {submissions.filter(s => s.status === 'graded' || (s.grade && s.grade > 0)).length > 0 ? (
                            <div style={styles.list}>
                                {submissions.filter(s => s.status === 'graded' || (s.grade && s.grade > 0)).map(submission => (
                                    <div key={submission.id} style={{...styles.submissionCard, opacity: 0.8}}>
                                        <div>
                                            <h4>{submission.assignment?.title || 'Assignment'}</h4>
                                            <p><strong>Student:</strong> {submission.student?.full_name || 'Unknown'}</p>
                                            <p><strong>Grade:</strong> <span style={{color: colors.success, fontWeight: 'bold'}}>{submission.grade}/{submission.assignment?.max_points || 100}</span></p>
                                            <p><strong>Feedback:</strong> {submission.feedback || 'No feedback provided'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No graded submissions yet.</p>
                        )}
                    </div>
                )}
            </div>

            {/* Grading Modal */}
            {selectedSubmission && (
                <div style={styles.modal} onClick={() => setSelectedSubmission(null)}>
                    <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h3 style={styles.modalTitle}>Grade Submission</h3>
                            <button style={styles.closeButton} onClick={() => setSelectedSubmission(null)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div style={styles.form}>
                            <div style={styles.formGroup}>
                                <p><strong>Student:</strong> {selectedSubmission.student?.full_name}</p>
                                <p><strong>Assignment:</strong> {selectedSubmission.assignment?.title}</p>
                                <p><strong>Max Points:</strong> {selectedSubmission.assignment?.max_points || 100}</p>
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Grade (out of {selectedSubmission.assignment?.max_points || 100}):</label>
                                <input
                                    type="number"
                                    min="0"
                                    max={selectedSubmission.assignment?.max_points || 100}
                                    value={gradeData.grade}
                                    onChange={(e) => setGradeData({...gradeData, grade: e.target.value})}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Feedback:</label>
                                <textarea
                                    value={gradeData.feedback}
                                    onChange={(e) => setGradeData({...gradeData, feedback: e.target.value})}
                                    style={{...styles.textarea, minHeight: '100px'}}
                                    placeholder="Provide feedback for the student..."
                                />
                            </div>
                            <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
                                <button
                                    style={styles.secondaryButton}
                                    onClick={() => setSelectedSubmission(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    style={styles.button}
                                    onClick={() => handleGradeSubmission(selectedSubmission.id)}
                                >
                                    <Save size={16} />
                                    Submit Grade
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Task Update Modal */}
            {selectedTask && (
                <div style={styles.modal} onClick={() => setSelectedTask(null)}>
                    <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h3 style={styles.modalTitle}>Update Task Status</h3>
                            <button style={styles.closeButton} onClick={() => setSelectedTask(null)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div style={styles.form}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Task: {selectedTask.title}</label>
                                <p style={{color: colors.textSecondary, margin: '0.25rem 0 0 0'}}>
                                    {selectedTask.description}
                                </p>
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Status</label>
                                <select
                                    style={styles.select}
                                    value={taskUpdate.status}
                                    onChange={(e) => setTaskUpdate({...taskUpdate, status: e.target.value})}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Completion Notes</label>
                                <textarea
                                    style={styles.textarea}
                                    value={taskUpdate.completion_notes}
                                    onChange={(e) => setTaskUpdate({...taskUpdate, completion_notes: e.target.value})}
                                    placeholder="Add notes about your progress or completion..."
                                />
                            </div>
                            <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
                                <button
                                    style={styles.secondaryButton}
                                    onClick={() => setSelectedTask(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    style={styles.button}
                                    onClick={() => handleUpdateTask(selectedTask.id)}
                                >
                                    <Save size={16} />
                                    Save Changes
                                </button>
                            </div>
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
    );
}

const styles = {
    container: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        backgroundColor: colors.background,
        minHeight: '100vh',
        padding: 0
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
        alignItems: 'center',
        gap: '0.75rem'
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
        whiteSpace: 'nowrap'
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
        whiteSpace: 'nowrap'
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
        transition: 'all 0.3s'
    },
    section: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: `1px solid ${colors.border}`,
        marginBottom: '1.5rem'
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    listItem: {
        padding: '1.5rem',
        backgroundColor: colors.light,
        borderRadius: '10px',
        border: `1px solid ${colors.border}`,
        transition: 'all 0.3s'
    },
    taskCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem',
        backgroundColor: colors.light,
        borderRadius: '10px',
        border: `1px solid ${colors.border}`,
        transition: 'all 0.3s'
    },
    completeBtn: {
        padding: '0.5rem 1rem',
        backgroundColor: colors.success,
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '600',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.25rem',
        color: colors.textSecondary
    },
    button: {
        padding: '10px 20px',
        marginTop: '20px',
        backgroundColor: colors.primary,
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    secondaryButton: {
        padding: '10px 20px',
        backgroundColor: 'white',
        color: colors.primary,
        border: `2px solid ${colors.primary}`,
        borderRadius: '5px',
        cursor: 'pointer',
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
        zIndex: 1000,
        padding: '1rem'
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto'
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
    },
    modalTitle: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: colors.textPrimary,
        margin: 0
    },
    closeButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem',
        color: colors.textSecondary
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    label: {
        fontSize: '0.875rem',
        fontWeight: '600',
        color: colors.textPrimary
    },
    select: {
        padding: '0.75rem',
        border: `1px solid ${colors.border}`,
        borderRadius: '8px',
        fontSize: '1rem',
        backgroundColor: 'white',
        cursor: 'pointer'
    },
    textarea: {
        padding: '0.75rem',
        border: `1px solid ${colors.border}`,
        borderRadius: '8px',
        fontSize: '1rem',
        minHeight: '100px',
        resize: 'vertical',
        fontFamily: 'inherit'
    },
    input: {
        padding: '0.75rem',
        border: `1px solid ${colors.border}`,
        borderRadius: '8px',
        fontSize: '1rem',
        width: '100%',
        boxSizing: 'border-box'
    },
    submissionCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.5rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: `1px solid ${colors.border}`,
        marginBottom: '1rem'
    },
    gradeBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '10px 20px',
        backgroundColor: colors.warning,
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '600',
        whiteSpace: 'nowrap'
    },
    messageForm: {
        padding: '1.5rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: `1px solid ${colors.border}`,
        marginTop: '1rem'
    },
    messageCard: {
        padding: '1rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: `1px solid ${colors.border}`,
        marginBottom: '1rem'
    },
    sendBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '10px 20px',
        backgroundColor: colors.primary,
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '600'
    }
};

export default TADashboard;
