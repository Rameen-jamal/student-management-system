// frontend/src/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "./config/api";
import { 
    User, 
    BookOpen, 
    Calendar, 
    Award, 
    FileText, 
    ClipboardCheck, 
    Clock, 
    Users, 
    LogOut, 
    Search, 
    Filter,
    X,
    CheckCircle,
    AlertCircle,
    Clock3,
    TrendingUp,
    GraduationCap,
    Mail,
    Phone,
    MapPin,
    Building,
    Hash,
    Target,
    MessageSquare,
    ChevronDown
} from "lucide-react";

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
    },
    filterBar: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: colors.cardBg,
        borderRadius: '10px',
        border: `1px solid ${colors.border}`,
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    filterGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
        minWidth: '180px'
    },
    filterLabel: {
        fontSize: '0.75rem',
        color: colors.textSecondary,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
    },
    select: {
        padding: '0.5rem 0.75rem',
        border: `1px solid ${colors.border}`,
        borderRadius: '6px',
        fontSize: '0.875rem',
        color: colors.textPrimary,
        backgroundColor: colors.cardBg,
        cursor: 'pointer',
        outline: 'none',
        transition: 'border-color 0.2s'
    },
    searchInput: {
        padding: '0.5rem 0.75rem',
        border: `1px solid ${colors.border}`,
        borderRadius: '6px',
        fontSize: '0.875rem',
        color: colors.textPrimary,
        backgroundColor: colors.cardBg,
        outline: 'none',
        flex: 1,
        minWidth: '200px',
        transition: 'border-color 0.2s'
    },
    clearBtn: {
        padding: '0.5rem 1rem',
        backgroundColor: colors.light,
        color: colors.textSecondary,
        border: `1px solid ${colors.border}`,
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '500',
        transition: 'all 0.2s'
    },
    courseGroup: {
        marginBottom: '2rem'
    },
    courseGroupTitle: {
        fontSize: '1.125rem',
        fontWeight: '600',
        color: colors.primary,
        marginBottom: '1rem',
        paddingBottom: '0.5rem',
        borderBottom: `2px solid ${colors.border}`
    },
    resultCount: {
        fontSize: '0.875rem',
        color: colors.textSecondary,
        padding: '0.5rem 0',
        fontStyle: 'italic'
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
    
    // Filter states
    const [selectedCourse, setSelectedCourse] = useState('all');
    const [assignmentFilter, setAssignmentFilter] = useState('all'); // all, pending, submitted
    const [quizFilter, setQuizFilter] = useState('all'); // all, upcoming, past
    const [searchQuery, setSearchQuery] = useState('');
    
    // Submission modal states
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [submissionFile, setSubmissionFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    
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
        return assignments.filter(a => {
            const hasSubmission = submissions.find(s => {
                const submissionAssignmentId = typeof s.assignment === 'object' ? s.assignment?.id : s.assignment;
                return submissionAssignmentId === a.id;
            });
            return !hasSubmission;
        }).length;
    };

    const getAverageGrade = () => {
        if (!submissions.length) return 'N/A';
        const total = submissions.reduce((acc, s) => acc + (s.grade || 0), 0);
        return (total / submissions.length).toFixed(1);
    };

    const handleSubmitAssignmentOpen = (assignment) => {
        setSelectedAssignment(assignment);
        setSubmissionFile(null);
        setShowSubmitModal(true);
    };

    const handleSubmitAssignment = async () => {
        if (!submissionFile) {
            alert('Please select a file to submit');
            return;
        }
        
        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('assignment', selectedAssignment.id);
            formData.append('file', submissionFile);
            
            console.log('Submitting assignment ID:', selectedAssignment.id);
            console.log('File:', submissionFile.name);
            
            const response = await axios.post(API_ENDPOINTS.SUBMISSIONS, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                    // Don't set Content-Type - let axios set it with boundary
                }
            });
            
            console.log('Submission successful:', response.data);
            console.log('Submission assignment field:', response.data.assignment);
            
            // Refresh submissions data
            const submissionsRes = await axios.get(API_ENDPOINTS.SUBMISSIONS, { headers });
            console.log('Refreshed submissions:', submissionsRes.data);
            console.log('Assignment IDs in submissions:', submissionsRes.data.map(s => ({id: s.id, assignment: s.assignment})));
            setSubmissions(submissionsRes.data);
            
            setShowSubmitModal(false);
            setSelectedAssignment(null);
            setSubmissionFile(null);
            alert('Assignment submitted successfully!');
        } catch (err) {
            console.error('Submission error:', err);
            console.error('Error response:', err.response?.data);
            const errorMsg = err.response?.data?.assignment?.[0] 
                || err.response?.data?.detail 
                || err.response?.data?.error 
                || err.response?.data?.non_field_errors?.[0]
                || JSON.stringify(err.response?.data)
                || 'Failed to submit assignment';
            alert(errorMsg);
        } finally {
            setSubmitting(false);
        }
    };

    // Get unique courses for filter
    const getEnrolledCourses = () => {
        if (!student?.courses_enrolled) return [];
        return student.courses_enrolled;
    };

    // Filter assignments
    const getFilteredAssignments = () => {
        let filtered = [...assignments];
        
        // Filter by course
        if (selectedCourse !== 'all') {
            filtered = filtered.filter(a => a.course === parseInt(selectedCourse));
        }
        
        // Filter by status
        if (assignmentFilter === 'pending') {
            filtered = filtered.filter(a => {
                const hasSubmission = submissions.find(s => {
                    const submissionAssignmentId = typeof s.assignment === 'object' ? s.assignment?.id : s.assignment;
                    return submissionAssignmentId === a.id;
                });
                return !hasSubmission;
            });
        } else if (assignmentFilter === 'submitted') {
            filtered = filtered.filter(a => {
                const hasSubmission = submissions.find(s => {
                    const submissionAssignmentId = typeof s.assignment === 'object' ? s.assignment?.id : s.assignment;
                    return submissionAssignmentId === a.id;
                });
                return hasSubmission;
            });
        }
        
        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(a => 
                a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (a.description && a.description.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }
        
        // Sort by due date
        filtered.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
        
        return filtered;
    };

    // Filter quizzes
    const getFilteredQuizzes = () => {
        let filtered = [...quizzes];
        
        // Filter by course
        if (selectedCourse !== 'all') {
            filtered = filtered.filter(q => q.course === parseInt(selectedCourse));
        }
        
        // Filter by time
        const now = new Date();
        if (quizFilter === 'upcoming') {
            filtered = filtered.filter(q => new Date(q.date) >= now);
        } else if (quizFilter === 'past') {
            filtered = filtered.filter(q => new Date(q.date) < now);
        }
        
        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(q => 
                q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.course_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        // Sort by date
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        return filtered;
    };

    // Filter attendance
    const getFilteredAttendance = () => {
        let filtered = [...attendance];
        
        // Filter by course
        if (selectedCourse !== 'all') {
            filtered = filtered.filter(a => a.course === parseInt(selectedCourse));
        }
        
        // Sort by date (most recent first)
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        return filtered;
    };

    // Group assignments by course
    const getAssignmentsByCourse = () => {
        const grouped = {};
        getFilteredAssignments().forEach(a => {
            if (!grouped[a.course_name]) {
                grouped[a.course_name] = [];
            }
            grouped[a.course_name].push(a);
        });
        return grouped;
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
                        <h1 style={styles.welcomeText}>
                            <GraduationCap size={32} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                            Welcome, {student.first_name}!
                        </h1>
                        <p style={styles.subtitle}>
                            <Hash size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                            {student.enrollment_number} • 
                            <Building size={14} style={{display: 'inline-block', verticalAlign: 'middle', margin: '0 0.25rem'}} />
                            {student.department}
                        </p>
                    </div>
                    <button 
                        onClick={handleLogout} 
                        style={styles.logoutBtn}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                    >
                        <LogOut size={18} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                        Logout
                    </button>
                </div>
            </div>

            <div style={styles.content}>
                {/* Stats Cards */}
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <Award size={24} color={colors.primary} style={{marginBottom: '0.5rem'}} />
                        <div style={styles.statLabel}>CGPA</div>
                        <div style={{...styles.statValue, color: colors.primary}}>{student.cgpa || 'N/A'}</div>
                    </div>
                    <div style={styles.statCard}>
                        <BookOpen size={24} color={colors.secondary} style={{marginBottom: '0.5rem'}} />
                        <div style={styles.statLabel}>Enrolled Courses</div>
                        <div style={{...styles.statValue, color: colors.secondary}}>{student.courses_enrolled?.length || 0}</div>
                    </div>
                    <div style={styles.statCard}>
                        <FileText size={24} color={colors.warning} style={{marginBottom: '0.5rem'}} />
                        <div style={styles.statLabel}>Pending Assignments</div>
                        <div style={{...styles.statValue, color: colors.warning}}>{getPendingAssignments()}</div>
                    </div>
                    <div style={styles.statCard}>
                        <ClipboardCheck size={24} color={colors.success} style={{marginBottom: '0.5rem'}} />
                        <div style={styles.statLabel}>Attendance</div>
                        <div style={{...styles.statValue, color: colors.success}}>{getAttendancePercentage()}%</div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={styles.tabs}>
                    {[
                        {name: 'overview', icon: User},
                        {name: 'courses', icon: BookOpen},
                        {name: 'assignments', icon: FileText},
                        {name: 'quizzes', icon: ClipboardCheck},
                        {name: 'grades', icon: Award},
                        {name: 'attendance', icon: Calendar}
                    ].map(({name, icon: Icon})=>(
                        <button 
                            key={name} 
                            onClick={()=>setActiveTab(name)} 
                            style={activeTab===name ? styles.activeTab : styles.tab}
                        >
                            <Icon size={16} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                            {name.charAt(0).toUpperCase()+name.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {activeTab==='overview' && (
                    <>
                        {/* Profile Card with Avatar */}
                        <div style={{
                            ...styles.card,
                            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                            color: 'white',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap'}}>
                                <div style={{
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '3rem',
                                    fontWeight: '700',
                                    border: '4px solid rgba(255,255,255,0.3)',
                                    backdropFilter: 'blur(10px)'
                                }}>
                                    {student.first_name?.charAt(0)}{student.last_name?.charAt(0)}
                                </div>
                                <div style={{flex: 1}}>
                                    <h2 style={{margin: '0 0 0.5rem 0', fontSize: '2rem', fontWeight: '700'}}>
                                        {student.first_name} {student.last_name}
                                    </h2>
                                    <div style={{fontSize: '1rem', opacity: 0.95, marginBottom: '0.75rem'}}>
                                        <Hash size={16} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                                        {student.enrollment_number}
                                    </div>
                                    <div style={{display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.95rem', opacity: 0.9}}>
                                        <span>
                                            <Building size={16} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                                            {student.department}
                                        </span>
                                        <span>
                                            <TrendingUp size={16} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                                            Year {student.year}
                                        </span>
                                        <span>
                                            <Calendar size={16} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                                            Semester {student.semester}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Academic Performance Highlights */}
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem'}}>
                            <div style={{
                                ...styles.card,
                                background: `linear-gradient(135deg, ${colors.success}15 0%, ${colors.success}05 100%)`,
                                borderLeft: `4px solid ${colors.success}`
                            }}>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <div>
                                        <div style={{fontSize: '0.875rem', color: colors.textSecondary, marginBottom: '0.5rem', fontWeight: '600'}}>
                                            CUMULATIVE GPA
                                        </div>
                                        <div style={{fontSize: '2.5rem', fontWeight: '700', color: colors.success}}>
                                            {student.cgpa || 'N/A'}
                                        </div>
                                        <div style={{fontSize: '0.875rem', color: colors.textSecondary, marginTop: '0.25rem'}}>
                                            Out of 4.0
                                        </div>
                                    </div>
                                    <Award size={48} color={colors.success} style={{opacity: 0.2}} />
                                </div>
                            </div>

                            <div style={{
                                ...styles.card,
                                background: `linear-gradient(135deg, ${colors.primary}15 0%, ${colors.primary}05 100%)`,
                                borderLeft: `4px solid ${colors.primary}`
                            }}>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <div>
                                        <div style={{fontSize: '0.875rem', color: colors.textSecondary, marginBottom: '0.5rem', fontWeight: '600'}}>
                                            ATTENDANCE RATE
                                        </div>
                                        <div style={{fontSize: '2.5rem', fontWeight: '700', color: colors.primary}}>
                                            {getAttendancePercentage()}%
                                        </div>
                                        <div style={{fontSize: '0.875rem', color: colors.textSecondary, marginTop: '0.25rem'}}>
                                            {attendance.length} classes
                                        </div>
                                    </div>
                                    <ClipboardCheck size={48} color={colors.primary} style={{opacity: 0.2}} />
                                </div>
                            </div>
                        </div>

                        {/* Contact & Academic Info */}
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem'}}>
                            <div style={styles.card}>
                                <h3 style={{...styles.cardTitle, fontSize: '1.125rem', marginBottom: '1.25rem'}}>
                                    <Mail size={20} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                                    Contact Information
                                </h3>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                                    <div style={{
                                        padding: '1rem',
                                        backgroundColor: colors.light,
                                        borderRadius: '8px',
                                        border: `1px solid ${colors.border}`
                                    }}>
                                        <div style={{fontSize: '0.75rem', color: colors.textSecondary, marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: '600'}}>
                                            Email Address
                                        </div>
                                        <div style={{color: colors.textPrimary, fontWeight: '500', wordBreak: 'break-word'}}>
                                            {student.user?.email || 'Not provided'}
                                        </div>
                                    </div>
                                    <div style={{
                                        padding: '1rem',
                                        backgroundColor: colors.light,
                                        borderRadius: '8px',
                                        border: `1px solid ${colors.border}`
                                    }}>
                                        <div style={{fontSize: '0.75rem', color: colors.textSecondary, marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: '600'}}>
                                            Phone Number
                                        </div>
                                        <div style={{color: colors.textPrimary, fontWeight: '500'}}>
                                            {student.phone || 'Not provided'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.card}>
                                <h3 style={{...styles.cardTitle, fontSize: '1.125rem', marginBottom: '1.25rem'}}>
                                    <BookOpen size={20} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem'}} />
                                    Academic Summary
                                </h3>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: colors.light, borderRadius: '6px'}}>
                                        <span style={{color: colors.textSecondary, fontSize: '0.875rem'}}>Total Courses</span>
                                        <span style={{fontWeight: '700', color: colors.primary}}>{student.courses_enrolled?.length || 0}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: colors.light, borderRadius: '6px'}}>
                                        <span style={{color: colors.textSecondary, fontSize: '0.875rem'}}>Pending Assignments</span>
                                        <span style={{fontWeight: '700', color: colors.warning}}>{getPendingAssignments()}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: colors.light, borderRadius: '6px'}}>
                                        <span style={{color: colors.textSecondary, fontSize: '0.875rem'}}>Total Assignments</span>
                                        <span style={{fontWeight: '700', color: colors.textPrimary}}>{assignments.length}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: colors.light, borderRadius: '6px'}}>
                                        <span style={{color: colors.textSecondary, fontSize: '0.875rem'}}>Quizzes Taken</span>
                                        <span style={{fontWeight: '700', color: colors.textPrimary}}>{quizGrades.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
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
                        
                        {/* Filter Bar */}
                        <div style={styles.filterBar}>
                            <div style={styles.filterGroup}>
                                <label style={styles.filterLabel}>
                                    <Filter size={12} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                    Filter by Course
                                </label>
                                <select 
                                    style={styles.select} 
                                    value={selectedCourse} 
                                    onChange={(e) => setSelectedCourse(e.target.value)}
                                >
                                    <option value="all">All Courses</option>
                                    {getEnrolledCourses().map(c => (
                                        <option key={c.course} value={c.course}>{c.course_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={styles.filterGroup}>
                                <label style={styles.filterLabel}>
                                    <Filter size={12} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                    Status
                                </label>
                                <select 
                                    style={styles.select} 
                                    value={assignmentFilter} 
                                    onChange={(e) => setAssignmentFilter(e.target.value)}
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="submitted">Submitted</option>
                                </select>
                            </div>
                            <div style={{...styles.filterGroup, flex: 1}}>
                                <label style={styles.filterLabel}>
                                    <Search size={12} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                    Search
                                </label>
                                <input 
                                    type="text"
                                    style={styles.searchInput}
                                    placeholder="Search assignments..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            {(selectedCourse !== 'all' || assignmentFilter !== 'all' || searchQuery) && (
                                <button 
                                    style={styles.clearBtn}
                                    onClick={() => {
                                        setSelectedCourse('all');
                                        setAssignmentFilter('all');
                                        setSearchQuery('');
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = colors.border}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = colors.light}
                                >
                                    <X size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                    Clear Filters
                                </button>
                            )}
                        </div>

                        <div style={styles.resultCount}>
                            Showing {getFilteredAssignments().length} of {assignments.length} assignments
                        </div>

                        {getFilteredAssignments().length > 0 ? getFilteredAssignments().map(a => {
                            const submission = submissions.find(s => {
                                // Handle both nested object and direct ID
                                const submissionAssignmentId = typeof s.assignment === 'object' ? s.assignment?.id : s.assignment;
                                return submissionAssignmentId === a.id;
                            });
                            const isSubmitted = !!submission;
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
                                            {isSubmitted && submission && (
                                                <div style={{marginTop: '0.5rem', fontSize: '0.875rem'}}>
                                                    <span style={{color: colors.success, fontWeight: '600'}}>✓ Submitted on {new Date(submission.submitted_at).toLocaleDateString()}</span>
                                                    {submission.grade && (
                                                        <span style={{marginLeft: '1rem', color: colors.primary, fontWeight: '600'}}>
                                                            Grade: {submission.grade}/{a.max_points}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem'}}>
                                            <span style={{
                                                ...styles.badge, 
                                                backgroundColor: isSubmitted ? colors.success : isOverdue ? colors.danger : colors.warning,
                                                color: 'white'
                                            }}>
                                                {isSubmitted ? 'Submitted' : isOverdue ? 'Overdue' : 'Pending'}
                                            </span>
                                            {!isSubmitted && (
                                                <button 
                                                    onClick={() => handleSubmitAssignmentOpen(a)}
                                                    style={{
                                                        padding: '0.5rem 1rem',
                                                        backgroundColor: colors.primary,
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        fontSize: '0.875rem',
                                                        fontWeight: '600',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.backgroundColor = colors.primaryHover}
                                                    onMouseLeave={(e) => e.target.style.backgroundColor = colors.primary}
                                                >
                                                    Submit
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div style={{display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: colors.textSecondary, flexWrap: 'wrap'}}>
                                        <span>📚 {a.course_name}</span>
                                        <span>📅 Due: {dueDate.toLocaleDateString()}</span>
                                        <span>🎯 {a.max_points} points</span>
                                    </div>
                                </div>
                            );
                        }) : <div style={styles.emptyState}>
                            {searchQuery || selectedCourse !== 'all' || assignmentFilter !== 'all' 
                                ? 'No assignments match your filters' 
                                : 'No assignments yet'}
                        </div>}
                    </div>
                )}

                {activeTab==='quizzes' && (
                    <div style={styles.card}>
                        <h2 style={styles.cardTitle}>Quizzes ({quizzes.length})</h2>
                        
                        {/* Filter Bar */}
                        <div style={styles.filterBar}>
                            <div style={styles.filterGroup}>
                                <label style={styles.filterLabel}>
                                    <Filter size={12} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                    Filter by Course
                                </label>
                                <select 
                                    style={styles.select} 
                                    value={selectedCourse} 
                                    onChange={(e) => setSelectedCourse(e.target.value)}
                                >
                                    <option value="all">All Courses</option>
                                    {getEnrolledCourses().map(c => (
                                        <option key={c.course} value={c.course}>{c.course_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={styles.filterGroup}>
                                <label style={styles.filterLabel}>
                                    <Clock size={12} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                    Time Period
                                </label>
                                <select 
                                    style={styles.select} 
                                    value={quizFilter} 
                                    onChange={(e) => setQuizFilter(e.target.value)}
                                >
                                    <option value="all">All Quizzes</option>
                                    <option value="upcoming">Upcoming</option>
                                    <option value="past">Past</option>
                                </select>
                            </div>
                            <div style={{...styles.filterGroup, flex: 1}}>
                                <label style={styles.filterLabel}>
                                    <Search size={12} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                    Search
                                </label>
                                <input 
                                    type="text"
                                    style={styles.searchInput}
                                    placeholder="Search quizzes..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            {(selectedCourse !== 'all' || quizFilter !== 'all' || searchQuery) && (
                                <button 
                                    style={styles.clearBtn}
                                    onClick={() => {
                                        setSelectedCourse('all');
                                        setQuizFilter('all');
                                        setSearchQuery('');
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = colors.border}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = colors.light}
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>

                        <div style={styles.resultCount}>
                            Showing {getFilteredQuizzes().length} of {quizzes.length} quizzes
                        </div>

                        {getFilteredQuizzes().length > 0 ? getFilteredQuizzes().map(q => {
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
                                        {grade ? (
                                            <span style={{...styles.badge, backgroundColor: colors.success, color: 'white', marginLeft: '1rem'}}>
                                                {grade.marks_obtained}/{q.max_marks}
                                            </span>
                                        ) : isPast ? (
                                            <span style={{...styles.badge, backgroundColor: colors.textSecondary, color: 'white', marginLeft: '1rem'}}>
                                                Completed
                                            </span>
                                        ) : (
                                            <span style={{...styles.badge, backgroundColor: colors.secondary, color: 'white', marginLeft: '1rem'}}>
                                                Upcoming
                                            </span>
                                        )}
                                    </div>
                                    <div style={{display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: colors.textSecondary, flexWrap: 'wrap'}}>
                                        <span>📚 {q.course_name}</span>
                                        <span>📅 {quizDate.toLocaleDateString()}</span>
                                        <span>⏱️ {q.duration_minutes} mins</span>
                                        <span>🎯 {q.max_marks} marks</span>
                                    </div>
                                </div>
                            );
                        }) : <div style={styles.emptyState}>
                            {searchQuery || selectedCourse !== 'all' || quizFilter !== 'all' 
                                ? 'No quizzes match your filters' 
                                : 'No quizzes scheduled'}
                        </div>}
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
                        
                        <div style={{marginBottom: '1.5rem', padding: '1.5rem', backgroundColor: colors.light, borderRadius: '10px', border: `1px solid ${colors.border}`}}>
                            <div style={{fontSize: '0.875rem', color: colors.textSecondary, marginBottom: '0.5rem'}}>
                                Overall Attendance Rate
                            </div>
                            <div style={{fontSize: '2.5rem', fontWeight: '700', color: colors.success}}>
                                {getAttendancePercentage()}%
                            </div>
                            <div style={{fontSize: '0.875rem', color: colors.textSecondary, marginTop: '0.5rem'}}>
                                {attendance.length} classes attended
                            </div>
                        </div>

                        {/* Filter Bar */}
                        <div style={styles.filterBar}>
                            <div style={styles.filterGroup}>
                                <label style={styles.filterLabel}>
                                    <Filter size={12} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                    Filter by Course
                                </label>
                                <select 
                                    style={styles.select} 
                                    value={selectedCourse} 
                                    onChange={(e) => setSelectedCourse(e.target.value)}
                                >
                                    <option value="all">All Courses</option>
                                    {getEnrolledCourses().map(c => (
                                        <option key={c.course} value={c.course}>{c.course_name}</option>
                                    ))}
                                </select>
                            </div>
                            {selectedCourse !== 'all' && (
                                <button 
                                    style={styles.clearBtn}
                                    onClick={() => setSelectedCourse('all')}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = colors.border}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = colors.light}
                                >
                                    <X size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem'}} />
                                    Clear Filter
                                </button>
                            )}
                        </div>

                        <div style={styles.resultCount}>
                            Showing {getFilteredAttendance().length} of {attendance.length} records
                        </div>

                        {getFilteredAttendance().length > 0 ? getFilteredAttendance().map(a => (
                            <div key={a.id} style={styles.listItem}>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'}}>
                                    <div>
                                        <h4 style={{margin: 0, color: colors.textPrimary}}>{a.course_name}</h4>
                                        <p style={{margin: '0.25rem 0 0 0', color: colors.textSecondary, fontSize: '0.875rem'}}>
                                            📅 {new Date(a.date).toLocaleDateString()} • 👨‍🏫 Marked by: {a.marked_by_name}
                                        </p>
                                    </div>
                                    <span style={{...styles.badge, backgroundColor: colors.success, color: 'white'}}>
                                        ✓ Present
                                    </span>
                                </div>
                            </div>
                        )) : <div style={styles.emptyState}>
                            {selectedCourse !== 'all' 
                                ? 'No attendance records for this course' 
                                : 'No attendance records yet'}
                        </div>}
                    </div>
                )}
            </div>

            {/* Submit Assignment Modal */}
            {showSubmitModal && (
                <div style={{
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
                }}>
                    <div style={{
                        backgroundColor: colors.cardBg,
                        padding: '2rem',
                        borderRadius: '12px',
                        maxWidth: '500px',
                        width: '90%',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
                    }}>
                        <h2 style={{margin: '0 0 1rem 0', color: colors.textPrimary, fontSize: '1.5rem'}}>
                            Submit Assignment
                        </h2>
                        <div style={{marginBottom: '1rem'}}>
                            <h3 style={{margin: '0 0 0.5rem 0', color: colors.textPrimary, fontSize: '1.125rem'}}>
                                {selectedAssignment?.title}
                            </h3>
                            <p style={{margin: 0, color: colors.textSecondary, fontSize: '0.875rem'}}>
                                {selectedAssignment?.description}
                            </p>
                        </div>
                        <div style={{marginBottom: '1.5rem'}}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: colors.textPrimary,
                                fontSize: '0.875rem',
                                fontWeight: '600'
                            }}>
                                Upload File
                            </label>
                            <input
                                type="file"
                                onChange={(e) => setSubmissionFile(e.target.files[0])}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: `2px dashed ${colors.border}`,
                                    borderRadius: '8px',
                                    fontSize: '0.875rem',
                                    cursor: 'pointer'
                                }}
                            />
                            {submissionFile && (
                                <p style={{margin: '0.5rem 0 0 0', color: colors.success, fontSize: '0.875rem'}}>
                                    ✓ {submissionFile.name}
                                </p>
                            )}
                        </div>
                        <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
                            <button
                                onClick={() => {
                                    setShowSubmitModal(false);
                                    setSelectedAssignment(null);
                                    setSubmissionFile(null);
                                }}
                                disabled={submitting}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: colors.light,
                                    color: colors.textPrimary,
                                    border: `1px solid ${colors.border}`,
                                    borderRadius: '8px',
                                    cursor: submitting ? 'not-allowed' : 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    opacity: submitting ? 0.5 : 1
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitAssignment}
                                disabled={submitting || !submissionFile}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: submitting || !submissionFile ? colors.textSecondary : colors.primary,
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: submitting || !submissionFile ? 'not-allowed' : 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    transition: 'background-color 0.2s',
                                    opacity: submitting || !submissionFile ? 0.5 : 1
                                }}
                                onMouseEnter={(e) => {
                                    if (!submitting && submissionFile) e.target.style.backgroundColor = colors.primaryHover;
                                }}
                                onMouseLeave={(e) => {
                                    if (!submitting && submissionFile) e.target.style.backgroundColor = colors.primary;
                                }}
                            >
                                {submitting ? 'Submitting...' : 'Submit Assignment'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
