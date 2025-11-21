// frontend/src/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "./config/api";

// Modern color palette
const colors = {
    primary: '#4f46e5',
    primaryHover: '#4338ca',
    secondary: '#06b6d4',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    light: '#f3f4f6',
    dark: '#1f2937',
    border: '#e5e7eb',
    cardBg: '#ffffff',
    textPrimary: '#111827',
    textSecondary: '#6b7280'
};

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: colors.light,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    header: {
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        padding: '2rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        color: 'white'
    },
    headerContent: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
    },
    welcomeText: {
        margin: 0,
        fontSize: '1.875rem',
        fontWeight: '700',
        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    subtitle: {
        margin: '0.25rem 0 0 0',
        fontSize: '0.875rem',
        opacity: 0.9
    },
    logoutBtn: {
        padding: '0.75rem 1.5rem',
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.3)',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600',
        transition: 'all 0.2s',
        backdropFilter: 'blur(10px)'
    },
    content: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
    },
    statCard: {
        backgroundColor: colors.cardBg,
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: `1px solid ${colors.border}`,
        transition: 'transform 0.2s, box-shadow 0.2s'
    },
    statLabel: {
        fontSize: '0.875rem',
        color: colors.textSecondary,
        marginBottom: '0.5rem',
        fontWeight: '500'
    },
    statValue: {
        fontSize: '2rem',
        fontWeight: '700',
        color: colors.textPrimary
    },
    tabs: {
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        backgroundColor: colors.cardBg,
        padding: '0.5rem',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflowX: 'auto'
    },
    tab: {
        padding: '0.75rem 1.5rem',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '0.875rem',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
        color: colors.textSecondary
    },
    activeTab: {
        padding: '0.75rem 1.5rem',
        border: 'none',
        backgroundColor: colors.primary,
        cursor: 'pointer',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '0.875rem',
        color: 'white',
        boxShadow: '0 2px 4px rgba(79, 70, 229, 0.3)',
        whiteSpace: 'nowrap'
    },
    card: {
        backgroundColor: colors.cardBg,
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: `1px solid ${colors.border}`
    },
    cardTitle: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: '1.5rem'
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem'
    },
    infoItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem'
    },
    infoLabel: {
        fontSize: '0.75rem',
        color: colors.textSecondary,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
    },
    infoValue: {
        fontSize: '1rem',
        color: colors.textPrimary,
        fontWeight: '500'
    },
    listItem: {
        padding: '1rem',
        backgroundColor: colors.cardBg,
        borderRadius: '8px',
        marginBottom: '1rem',
        border: `1px solid ${colors.border}`,
        transition: 'transform 0.2s, box-shadow 0.2s'
    },
    courseCard: {
        padding: '1.25rem',
        backgroundColor: colors.cardBg,
        borderRadius: '10px',
        marginBottom: '1rem',
        border: `2px solid ${colors.border}`,
        transition: 'all 0.2s',
        cursor: 'pointer'
    },
    assignmentCard: {
        padding: '1.25rem',
        backgroundColor: colors.cardBg,
        borderRadius: '10px',
        marginBottom: '1rem',
        border: `1px solid ${colors.border}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        transition: 'all 0.2s'
    },
    badge: {
        display: 'inline-block',
        padding: '0.25rem 0.75rem',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    emptyState: {
        textAlign: 'center',
        padding: '3rem 1rem',
        color: colors.textSecondary
    },
    loading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontSize: '1.25rem',
        color: colors.textSecondary
    }
};

function Dashboard() {
    const [student, setStudent] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [quizGrades, setQuizGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const navigate = useNavigate();

    const token = localStorage.getItem("access_token");
    const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        const fetchStudent = async () => {
            if (!token) { navigate("/"); return; }
            setLoading(true);
            try {
                const [studentRes, assignmentsRes, quizzesRes, attendanceRes, submissionsRes, quizGradesRes] = await Promise.all([
                    axios.get(API_ENDPOINTS.STUDENTS, { headers }),
                    axios.get(API_ENDPOINTS.ASSIGNMENTS, { headers }),
                    axios.get(API_ENDPOINTS.QUIZZES, { headers }),
                    axios.get(API_ENDPOINTS.ATTENDANCE, { headers }),
                    axios.get(API_ENDPOINTS.SUBMISSIONS, { headers }),
                    axios.get(API_ENDPOINTS.QUIZ_GRADES, { headers })
                ]);
                if (studentRes.data.length > 0) setStudent(studentRes.data[0]);
                setAssignments(assignmentsRes.data);
                setQuizzes(quizzesRes.data);
                setAttendance(attendanceRes.data);
                setSubmissions(submissionsRes.data);
                setQuizGrades(quizGradesRes.data);
            } catch (err) {
                console.error(err);
                if (err.response?.status === 401) { localStorage.clear(); navigate("/"); }
            } finally { setLoading(false); }
        };
        fetchStudent();
    }, [navigate, token]);

    const handleLogout = () => { localStorage.clear(); navigate("/"); };

    const getAttendancePercentage = () => {
        if (!attendance.length) return 0;
        return Math.round((attendance.length / (attendance.length + 2)) * 100);
    };

    const getPendingAssignments = () => {
        return assignments.filter(a => !submissions.find(s => s.assignment === a.id)).length;
    };

    const getAverageGrade = () => {
        if (!submissions.length) return 'N/A';
        const total = submissions.reduce((acc, s) => acc + (s.grade || 0), 0);
        return (total / submissions.length).toFixed(1);
    };

    if (loading) return <div style={styles.loading}>Loading your dashboard...</div>;
    if (!student) return (
        <div style={styles.emptyState}>
            <h2>No student data found</h2>
            <button onClick={()=>navigate("/")} style={{...styles.logoutBtn, marginTop: '1rem'}}>Go to Login</button>
        </div>
    );

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerContent}>
                    <div>
                        <h1 style={styles.welcomeText}>Welcome, {student.first_name}! 👋</h1>
                        <p style={styles.subtitle}>{student.enrollment_number} • {student.department}</p>
                    </div>
                    <button 
                        onClick={handleLogout} 
                        style={styles.logoutBtn}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div style={styles.content}>
                {/* Stats Cards */}
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <div style={styles.statLabel}>CGPA</div>
                        <div style={{...styles.statValue, color: colors.primary}}>{student.cgpa || 'N/A'}</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={styles.statLabel}>Enrolled Courses</div>
                        <div style={{...styles.statValue, color: colors.secondary}}>{student.courses_enrolled?.length || 0}</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={styles.statLabel}>Pending Assignments</div>
                        <div style={{...styles.statValue, color: colors.warning}}>{getPendingAssignments()}</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={styles.statLabel}>Attendance</div>
                        <div style={{...styles.statValue, color: colors.success}}>{getAttendancePercentage()}%</div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={styles.tabs}>
                    {['overview','courses','assignments','quizzes','grades','attendance'].map(tab=>(
                        <button 
                            key={tab} 
                            onClick={()=>setActiveTab(tab)} 
                            style={activeTab===tab ? styles.activeTab : styles.tab}
                        >
                            {tab.charAt(0).toUpperCase()+tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {activeTab==='overview' && (
                    <div style={styles.card}>
                        <h2 style={styles.cardTitle}>Profile Information</h2>
                        <div style={styles.infoGrid}>
                            <div style={styles.infoItem}>
                                <div style={styles.infoLabel}>Full Name</div>
                                <div style={styles.infoValue}>{student.first_name} {student.last_name}</div>
                            </div>
                            <div style={styles.infoItem}>
                                <div style={styles.infoLabel}>Email</div>
                                <div style={styles.infoValue}>{student.user?.email || 'N/A'}</div>
                            </div>
                            <div style={styles.infoItem}>
                                <div style={styles.infoLabel}>Enrollment Number</div>
                                <div style={styles.infoValue}>{student.enrollment_number}</div>
                            </div>
                            <div style={styles.infoItem}>
                                <div style={styles.infoLabel}>Department</div>
                                <div style={styles.infoValue}>{student.department}</div>
                            </div>
                            <div style={styles.infoItem}>
                                <div style={styles.infoLabel}>Year</div>
                                <div style={styles.infoValue}>Year {student.year}</div>
                            </div>
                            <div style={styles.infoItem}>
                                <div style={styles.infoLabel}>Semester</div>
                                <div style={styles.infoValue}>Semester {student.semester}</div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab==='courses' && (
                    <div style={styles.card}>
                        <h2 style={styles.cardTitle}>Enrolled Courses ({student.courses_enrolled?.length || 0})</h2>
                        {student.courses_enrolled?.length > 0 ? student.courses_enrolled.map(c => (
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
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <div>
                                        <h3 style={{margin: 0, color: colors.textPrimary, fontSize: '1.125rem'}}>{c.course_name}</h3>
                                        <p style={{margin: '0.25rem 0 0 0', color: colors.textSecondary, fontSize: '0.875rem'}}>
                                            Enrolled: {new Date(c.date_enrolled).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span style={{...styles.badge, backgroundColor: c.status === 'active' ? colors.success : colors.warning, color: 'white'}}>
                                        {c.status}
                                    </span>
                                </div>
                            </div>
                        )) : <div style={styles.emptyState}>No courses enrolled yet</div>}
                    </div>
                )}

                {activeTab==='assignments' && (
                    <div style={styles.card}>
                        <h2 style={styles.cardTitle}>Assignments ({assignments.length})</h2>
                        {assignments.length > 0 ? assignments.map(a => {
                            const isSubmitted = submissions.find(s => s.assignment === a.id);
                            const dueDate = new Date(a.due_date);
                            const isOverdue = dueDate < new Date() && !isSubmitted;
                            
                            return (
                                <div 
                                    key={a.id} 
                                    style={{
                                        ...styles.assignmentCard,
                                        borderLeftWidth: '4px',
                                        borderLeftColor: isSubmitted ? colors.success : isOverdue ? colors.danger : colors.warning
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
                                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'}
                                >
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem'}}>
                                        <div style={{flex: 1}}>
                                            <h3 style={{margin: 0, color: colors.textPrimary, fontSize: '1.125rem'}}>{a.title}</h3>
                                            <p style={{margin: '0.5rem 0', color: colors.textSecondary, fontSize: '0.875rem'}}>
                                                {a.description || 'No description provided'}
                                            </p>
                                        </div>
                                        <span style={{
                                            ...styles.badge, 
                                            backgroundColor: isSubmitted ? colors.success : isOverdue ? colors.danger : colors.warning,
                                            color: 'white',
                                            marginLeft: '1rem'
                                        }}>
                                            {isSubmitted ? 'Submitted' : isOverdue ? 'Overdue' : 'Pending'}
                                        </span>
                                    </div>
                                    <div style={{display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: colors.textSecondary}}>
                                        <span>📚 {a.course_name}</span>
                                        <span>📅 Due: {dueDate.toLocaleDateString()}</span>
                                        <span>🎯 {a.max_points} points</span>
                                    </div>
                                </div>
                            );
                        }) : <div style={styles.emptyState}>No assignments yet</div>}
                    </div>
                )}

                {activeTab==='quizzes' && (
                    <div style={styles.card}>
                        <h2 style={styles.cardTitle}>Quizzes ({quizzes.length})</h2>
                        {quizzes.length > 0 ? quizzes.map(q => {
                            const quizDate = new Date(q.date);
                            const isPast = quizDate < new Date();
                            const grade = quizGrades.find(g => g.quiz === q.id);
                            
                            return (
                                <div 
                                    key={q.id} 
                                    style={{
                                        ...styles.assignmentCard,
                                        borderLeftWidth: '4px',
                                        borderLeftColor: grade ? colors.success : isPast ? colors.danger : colors.secondary
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
                                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'}
                                >
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem'}}>
                                        <div style={{flex: 1}}>
                                            <h3 style={{margin: 0, color: colors.textPrimary, fontSize: '1.125rem'}}>{q.title}</h3>
                                            {q.description && <p style={{margin: '0.5rem 0', color: colors.textSecondary, fontSize: '0.875rem'}}>{q.description}</p>}
                                        </div>
                                        {grade && (
                                            <span style={{...styles.badge, backgroundColor: colors.success, color: 'white', marginLeft: '1rem'}}>
                                                {grade.marks_obtained}/{q.max_marks}
                                            </span>
                                        )}
                                    </div>
                                    <div style={{display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: colors.textSecondary}}>
                                        <span>📚 {q.course_name}</span>
                                        <span>📅 {quizDate.toLocaleDateString()}</span>
                                        <span>⏱️ {q.duration_minutes} mins</span>
                                        <span>🎯 {q.max_marks} marks</span>
                                    </div>
                                </div>
                            );
                        }) : <div style={styles.emptyState}>No quizzes scheduled</div>}
                    </div>
                )}

                {activeTab==='grades' && (
                    <div style={styles.card}>
                        <h2 style={styles.cardTitle}>Academic Performance</h2>
                        <div style={{marginBottom: '2rem'}}>
                            <h3 style={{fontSize: '1.125rem', color: colors.textPrimary, marginBottom: '1rem'}}>
                                Assignment Submissions ({submissions.length})
                            </h3>
                            {submissions.length > 0 ? submissions.map(s => (
                                <div key={s.id} style={styles.listItem}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <div>
                                            <h4 style={{margin: 0, color: colors.textPrimary}}>{s.assignment_title}</h4>
                                            <p style={{margin: '0.5rem 0 0 0', color: colors.textSecondary, fontSize: '0.875rem'}}>
                                                Submitted: {new Date(s.submitted_at).toLocaleDateString()}
                                            </p>
                                            {s.feedback && (
                                                <p style={{margin: '0.5rem 0 0 0', color: colors.textSecondary, fontSize: '0.875rem'}}>
                                                    💬 {s.feedback}
                                                </p>
                                            )}
                                        </div>
                                        <div style={{textAlign: 'right'}}>
                                            <div style={{fontSize: '1.5rem', fontWeight: '700', color: colors.success}}>
                                                {s.grade || 'Pending'}
                                            </div>
                                            <div style={{fontSize: '0.75rem', color: colors.textSecondary}}>
                                                {s.status}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : <div style={styles.emptyState}>No submissions yet</div>}
                        </div>
                        
                        <div>
                            <h3 style={{fontSize: '1.125rem', color: colors.textPrimary, marginBottom: '1rem'}}>
                                Quiz Grades ({quizGrades.length})
                            </h3>
                            {quizGrades.length > 0 ? quizGrades.map(g => (
                                <div key={g.id} style={styles.listItem}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <div>
                                            <h4 style={{margin: 0, color: colors.textPrimary}}>{g.quiz_title}</h4>
                                            {g.remarks && (
                                                <p style={{margin: '0.5rem 0 0 0', color: colors.textSecondary, fontSize: '0.875rem'}}>
                                                    💬 {g.remarks}
                                                </p>
                                            )}
                                        </div>
                                        <div style={{fontSize: '1.5rem', fontWeight: '700', color: colors.success}}>
                                            {g.marks_obtained}
                                        </div>
                                    </div>
                                </div>
                            )) : <div style={styles.emptyState}>No quiz grades yet</div>}
                        </div>
                    </div>
                )}

                {activeTab==='attendance' && (
                    <div style={styles.card}>
                        <h2 style={styles.cardTitle}>Attendance Records ({attendance.length})</h2>
                        <div style={{marginBottom: '1rem', padding: '1rem', backgroundColor: colors.light, borderRadius: '8px'}}>
                            <div style={{fontSize: '0.875rem', color: colors.textSecondary}}>
                                Overall Attendance Rate
                            </div>
                            <div style={{fontSize: '2rem', fontWeight: '700', color: colors.success}}>
                                {getAttendancePercentage()}%
                            </div>
                        </div>
                        {attendance.length > 0 ? attendance.map(a => (
                            <div key={a.id} style={styles.listItem}>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <div>
                                        <h4 style={{margin: 0, color: colors.textPrimary}}>{a.course_name}</h4>
                                        <p style={{margin: '0.25rem 0 0 0', color: colors.textSecondary, fontSize: '0.875rem'}}>
                                            {new Date(a.date).toLocaleDateString()} • Marked by: {a.marked_by_name}
                                        </p>
                                    </div>
                                    <span style={{...styles.badge, backgroundColor: colors.success, color: 'white'}}>
                                        Present
                                    </span>
                                </div>
                            </div>
                        )) : <div style={styles.emptyState}>No attendance records yet</div>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
