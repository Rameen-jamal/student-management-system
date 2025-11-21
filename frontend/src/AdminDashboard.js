// frontend/src/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "./config/api";
import { 
    Users, BookOpen, GraduationCap, DollarSign, CreditCard, UserCheck, 
    LogOut, Plus, Trash2, Edit, Search, Shield, CheckCircle, XCircle,
    Calendar, TrendingUp, Award, UserPlus, BookPlus, AlertCircle, X
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
                position: 'relative',
                animation: 'slideIn 0.2s ease-out'
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
        alignItems: 'center',
        gap: '0.75rem'
    },
    subtitle: {
        margin: '0.5rem 0 0 0',
        opacity: 0.95,
        fontSize: '1rem'
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
    statIcon: {
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem'
    },
    statLabel: {
        fontSize: '0.875rem',
        color: colors.textSecondary,
        marginBottom: '0.5rem'
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
        color: colors.textPrimary,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    form: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '1rem'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column'
    },
    label: {
        fontSize: '0.875rem',
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: '0.5rem'
    },
    input: {
        padding: '0.75rem',
        border: `1px solid ${colors.border}`,
        borderRadius: '8px',
        fontSize: '1rem',
        transition: 'all 0.3s',
        outline: 'none'
    },
    select: {
        padding: '0.75rem',
        border: `1px solid ${colors.border}`,
        borderRadius: '8px',
        fontSize: '1rem',
        transition: 'all 0.3s',
        outline: 'none',
        cursor: 'pointer'
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
        gap: '0.5rem',
        justifyContent: 'center'
    },
    successButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: colors.success,
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
    warningButton: {
        padding: '0.5rem 1rem',
        backgroundColor: colors.warning,
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '600',
        transition: 'all 0.3s'
    },
    dangerButton: {
        padding: '0.5rem 1rem',
        backgroundColor: colors.danger,
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '600',
        transition: 'all 0.3s'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: 'white',
        borderRadius: '8px',
        overflow: 'hidden'
    },
    tableHeader: {
        backgroundColor: colors.light,
        borderBottom: `2px solid ${colors.border}`
    },
    th: {
        padding: '1rem',
        textAlign: 'left',
        fontSize: '0.875rem',
        fontWeight: '600',
        color: colors.textPrimary,
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    td: {
        padding: '1rem',
        borderBottom: `1px solid ${colors.border}`,
        fontSize: '0.9375rem',
        color: colors.textSecondary
    },
    badge: {
        display: 'inline-block',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem',
        cursor: 'pointer',
        borderRadius: '6px',
        transition: 'background-color 0.2s'
    },
    bulkSection: {
        backgroundColor: '#FFF9E6',
        border: `2px solid ${colors.warning}`,
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem'
    }
};

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("users");
    const [loading, setLoading] = useState(true);

    // Helper function to get semester name
    const getSemesterName = (semesterNum) => {
        const semesters = { 1: "Fall", 2: "Spring", 3: "Summer" };
        return semesters[semesterNum] || `Semester ${semesterNum}`;
    };

    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [feeRecords, setFeeRecords] = useState([]);
    const [payments, setPayments] = useState([]);
    const [enrollments, setEnrollments] = useState([]);

    const [newUser, setNewUser] = useState({ username: "", password: "", role: "student", first_name: "", last_name: "", email: "", department: "Computer Science" });
    const [newCourse, setNewCourse] = useState({ code: "", name: "", credit_hours: 3, semester: 1 });
    const [newFeeRecord, setNewFeeRecord] = useState({ 
        student: "", 
        semester: 1, 
        year: 1, 
        total_fee: 50000 
    });
    const [bulkFeeGeneration, setBulkFeeGeneration] = useState({
        semester: 1,
        year: 1,
        total_fee: 50000,
        selectedStudents: []
    });
    const [newEnrollment, setNewEnrollment] = useState({ student: "", course: "" });
    const [bulkEnrollment, setBulkEnrollment] = useState({ 
        course: "", 
        selectedStudents: [] 
    });
    const [newPayment, setNewPayment] = useState({
        fee_record: "",
        amount: "",
        payment_method: "cash",
        transaction_id: "",
        remarks: ""
    });

    // Dialog state
    const [dialog, setDialog] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info',
        onConfirm: null
    });

    const showDialog = (title, message, type = 'info') => {
        setDialog({ isOpen: true, title, message, type, onConfirm: null });
    };

    const showConfirmDialog = (title, message, onConfirm) => {
        setDialog({ isOpen: true, title, message, type: 'confirm', onConfirm });
    };

    const closeDialog = () => {
        setDialog({ ...dialog, isOpen: false });
    };

    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");
    const headers = { Authorization: `Bearer ${token}` };

    const fetchAllData = async () => {
        if (!token) {
            navigate("/");
            return;
        }
        setLoading(true);
        try {
            const [usersRes, coursesRes, studentsRes, facultyRes, feeRes, paymentRes, enrollmentsRes] = await Promise.all([
                axios.get(API_ENDPOINTS.ADMIN_USERS, { headers }),
                axios.get(API_ENDPOINTS.ADMIN_COURSES, { headers }),
                axios.get(API_ENDPOINTS.STUDENTS, { headers }),
                axios.get(API_ENDPOINTS.FACULTY, { headers }),
                axios.get(API_ENDPOINTS.FEE_RECORDS, { headers }),
                axios.get(API_ENDPOINTS.PAYMENTS, { headers }),
                axios.get(API_ENDPOINTS.ENROLLMENTS, { headers }),
            ]);

            setUsers(usersRes.data || []);
            setCourses(coursesRes.data || []);
            setStudents(studentsRes.data || []);
            setFaculty(facultyRes.data || []);
            setFeeRecords(feeRes.data || []);
            setPayments(paymentRes.data || []);
            setEnrollments(enrollmentsRes.data || []);

        } catch (err) {
            console.error("Error fetching admin data:", err);
            if (err.response?.status === 401 || err.response?.status === 403) {
                showDialog('Access Denied', 'Admin privileges required. Please login as admin.', 'error');
                localStorage.clear();
                navigate("/");
            } else {
                showDialog('Error', 'Failed to load dashboard data. Check console for details.', 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAllData(); }, []); // eslint-disable-line

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_ENDPOINTS.ADMIN_USERS, newUser, { headers });
            setNewUser({ username: "", password: "", role: "student", first_name: "", last_name: "", email: "", department: "Computer Science" });
            showDialog('Success', 'User created successfully!', 'success');
            fetchAllData();
        } catch (err) { 
            console.error('User creation error:', err.response?.data || err); 
            const errorMsg = err.response?.data?.error || err.response?.data?.detail || err.message || 'Failed to add user';
            showDialog('Error', errorMsg, 'error'); 
        }
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_ENDPOINTS.ADMIN_COURSES, newCourse, { headers });
            setNewCourse({ code: "", name: "", credit_hours: 3, semester: 1 });
            showDialog('Success', 'Course added successfully!', 'success');
            fetchAllData();
        } catch (err) { console.error(err); showDialog('Error', 'Failed to add course. Please try again.', 'error'); }
    };

    const handleAddFeeRecord = async (e) => {
        e.preventDefault();
        if (!newFeeRecord.student) {
            showDialog('Validation Error', 'Please select a student.', 'warning');
            return;
        }
        try {
            await axios.post(API_ENDPOINTS.FEE_RECORDS, {
                student: newFeeRecord.student,
                semester: parseInt(newFeeRecord.semester),
                year: parseInt(newFeeRecord.year),
                total_fee: parseFloat(newFeeRecord.total_fee),
                paid_amount: 0
            }, { headers });
            setNewFeeRecord({ student: "", semester: 1, year: 1, total_fee: 50000 });
            showDialog('Success', 'Fee record created successfully!', 'success');
            fetchAllData();
        } catch (err) { 
            console.error(err); 
            showDialog('Error', 'Failed to create fee record: ' + (err.response?.data?.detail || err.message), 'error'); 
        }
    };

    const handleBulkFeeGeneration = async () => {
        if (bulkFeeGeneration.selectedStudents.length === 0) {
            showDialog('Validation Error', 'Please select at least one student.', 'warning');
            return;
        }
        
        showConfirmDialog(
            'Confirm Bulk Fee Generation',
            `Generate fee records for ${bulkFeeGeneration.selectedStudents.length} student(s)?`,
            async () => {
                try {
                    const promises = bulkFeeGeneration.selectedStudents.map(studentId => 
                        axios.post(API_ENDPOINTS.FEE_RECORDS, {
                            student: studentId,
                            semester: parseInt(bulkFeeGeneration.semester),
                            year: parseInt(bulkFeeGeneration.year),
                            total_fee: parseFloat(bulkFeeGeneration.total_fee),
                            paid_amount: 0
                        }, { headers })
                    );
                    
                    await Promise.all(promises);
                    showDialog('Success', `Successfully generated ${bulkFeeGeneration.selectedStudents.length} fee record(s)!`, 'success');
                    setBulkFeeGeneration({
                        semester: 1,
                        year: 1,
                        total_fee: 50000,
                        selectedStudents: []
                    });
                    fetchAllData();
                } catch (err) {
                    console.error(err);
                    showDialog('Error', 'Failed to generate some fee records. Please try again.', 'error');
                }
            }
        );
    };

    const toggleStudentSelection = (studentId) => {
        setBulkFeeGeneration(prev => ({
            ...prev,
            selectedStudents: prev.selectedStudents.includes(studentId)
                ? prev.selectedStudents.filter(id => id !== studentId)
                : [...prev.selectedStudents, studentId]
        }));
    };

    const selectAllStudents = () => {
        setBulkFeeGeneration(prev => ({
            ...prev,
            selectedStudents: students.map(s => s.id)
        }));
    };

    const deselectAllStudents = () => {
        setBulkFeeGeneration(prev => ({
            ...prev,
            selectedStudents: []
        }));
    };

    const handleAssignFaculty = async (courseId, facultyId) => {
        try {
            await axios.post(
                `${API_ENDPOINTS.ADMIN_COURSES}${courseId}/assign_faculty/`,
                { faculty_id: facultyId },
                { headers }
            );
            showDialog('Success', 'Faculty assigned successfully!', 'success');
            fetchAllData();
        } catch (err) {
            console.error(err);
            showDialog('Error', 'Failed to assign faculty: ' + (err.response?.data?.error || err.message), 'error');
        }
    };

    const handleUnassignFaculty = async (courseId) => {
        showConfirmDialog(
            'Remove Faculty Assignment',
            'Are you sure you want to remove faculty assignment from this course?',
            async () => {
                try {
                    await axios.post(
                        `${API_ENDPOINTS.ADMIN_COURSES}${courseId}/unassign_faculty/`,
                        {},
                        { headers }
                    );
                    showDialog('Success', 'Faculty unassigned successfully!', 'success');
                    fetchAllData();
                } catch (err) {
                    console.error(err);
                    showDialog('Error', 'Failed to unassign faculty: ' + (err.response?.data?.error || err.message), 'error');
                }
            }
        );
    };

    const handleEnrollStudent = async (e) => {
        e.preventDefault();
        if (!newEnrollment.student || !newEnrollment.course) {
            showDialog('Validation Error', 'Please select both student and course.', 'warning');
            return;
        }
        try {
            await axios.post(
                `${API_ENDPOINTS.ENROLLMENTS}enroll/`,
                { student_id: newEnrollment.student, course_id: newEnrollment.course },
                { headers }
            );
            setNewEnrollment({ student: "", course: "" });
            showDialog('Success', 'Student enrolled successfully!', 'success');
            fetchAllData();
        } catch (err) {
            console.error(err);
            showDialog('Error', 'Failed to enroll student: ' + (err.response?.data?.error || err.message), 'error');
        }
    };

    const handleBulkEnrollment = async () => {
        if (!bulkEnrollment.course || bulkEnrollment.selectedStudents.length === 0) {
            showDialog('Validation Error', 'Please select a course and at least one student.', 'warning');
            return;
        }
        showConfirmDialog(
            'Confirm Bulk Enrollment',
            `Enroll ${bulkEnrollment.selectedStudents.length} student(s) in this course?`,
            async () => {
                try {
                    const response = await axios.post(
                        `${API_ENDPOINTS.ENROLLMENTS}bulk-enroll/`,
                        { 
                            course_id: bulkEnrollment.course, 
                            student_ids: bulkEnrollment.selectedStudents 
                        },
                        { headers }
                    );
                    showDialog('Success', response.data.message || 'Bulk enrollment completed!', 'success');
                    setBulkEnrollment({ course: "", selectedStudents: [] });
                    fetchAllData();
                } catch (err) {
                    console.error(err);
                    showDialog('Error', 'Failed to bulk enroll: ' + (err.response?.data?.error || err.message), 'error');
                }
            }
        );
    };

    const handleDropEnrollment = async (enrollmentId) => {
        showConfirmDialog(
            'Drop Student',
            'Are you sure you want to drop this student from the course?',
            async () => {
                try {
                    await axios.post(
                        `${API_ENDPOINTS.ENROLLMENTS}${enrollmentId}/drop/`,
                        {},
                        { headers }
                    );
                    showDialog('Success', 'Student dropped from course!', 'success');
                    fetchAllData();
                } catch (err) {
                    console.error(err);
                    showDialog('Error', 'Failed to drop enrollment: ' + (err.response?.data?.error || err.message), 'error');
                }
            }
        );
    };

    const toggleBulkEnrollmentStudent = (studentId) => {
        setBulkEnrollment(prev => ({
            ...prev,
            selectedStudents: prev.selectedStudents.includes(studentId)
                ? prev.selectedStudents.filter(id => id !== studentId)
                : [...prev.selectedStudents, studentId]
        }));
    };

    const handleRecordPayment = async (e) => {
        e.preventDefault();
        if (!newPayment.fee_record || !newPayment.amount) {
            showDialog('Validation Error', 'Please select a fee record and enter amount.', 'warning');
            return;
        }
        try {
            await axios.post(
                API_ENDPOINTS.PAYMENTS,
                {
                    fee_record: parseInt(newPayment.fee_record),
                    amount: parseFloat(newPayment.amount),
                    payment_method: newPayment.payment_method,
                    transaction_id: newPayment.transaction_id || `TXN-${Date.now()}`,
                    remarks: newPayment.remarks
                },
                { headers }
            );
            setNewPayment({
                fee_record: "",
                amount: "",
                payment_method: "cash",
                transaction_id: "",
                remarks: ""
            });
            showDialog('Success', 'Payment recorded successfully!', 'success');
            fetchAllData();
        } catch (err) {
            console.error(err);
            showDialog('Error', 'Failed to record payment: ' + (err.response?.data?.detail || err.message), 'error');
        }
    };

    const handleLogout = () => { localStorage.clear(); navigate("/"); };

    if (loading) return <div style={styles.loading}>Loading Admin Dashboard...</div>;

    const stats = [
        { label: 'Total Users', value: users.length, icon: Users, color: colors.primary },
        { label: 'Courses', value: courses.length, icon: BookOpen, color: colors.secondary },
        { label: 'Students', value: students.length, icon: GraduationCap, color: colors.success },
        { label: 'Faculty', value: faculty.length, icon: Award, color: colors.warning },
        { label: 'Enrollments', value: enrollments.length, icon: UserCheck, color: colors.primary },
        { label: 'Fee Records', value: feeRecords.length, icon: DollarSign, color: colors.danger }
    ];

    const tabs = [
        { id: 'users', label: 'Users', icon: Users },
        { id: 'courses', label: 'Courses', icon: BookOpen },
        { id: 'students', label: 'Students', icon: GraduationCap },
        { id: 'enrollments', label: 'Enrollments', icon: UserCheck },
        { id: 'feeRecords', label: 'Fee Records', icon: DollarSign },
        { id: 'payments', label: 'Payments', icon: CreditCard }
    ];

    return (
        <div style={styles.container}>
            {/* Dialog Component */}
            <Dialog
                isOpen={dialog.isOpen}
                onClose={closeDialog}
                title={dialog.title}
                message={dialog.message}
                type={dialog.type}
                onConfirm={dialog.onConfirm}
            />

            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerContent}>
                    <div>
                        <h1 style={styles.welcomeText}>
                            <Shield size={32} />
                            Admin Dashboard
                        </h1>
                        <p style={styles.subtitle}>System Management & Administration</p>
                    </div>
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </div>

            <div style={styles.content}>
                {/* Statistics Cards */}
                <div style={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <div key={index} style={styles.statCard}>
                            <div style={{
                                ...styles.statIcon,
                                backgroundColor: `${stat.color}15`,
                                color: stat.color
                            }}>
                                <stat.icon size={24} />
                            </div>
                            <div style={styles.statLabel}>{stat.label}</div>
                            <div style={{...styles.statValue, color: stat.color}}>{stat.value}</div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div style={styles.tabs}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={activeTab === tab.id ? styles.activeTab : styles.tab}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
            </div>

            {/* Content */}
            {activeTab === "users" && (
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>
                        <UserPlus size={24} />
                        Add New User
                    </h3>
                    <form onSubmit={handleAddUser}>
                        <div style={styles.form}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Username</label>
                                <input 
                                    style={styles.input}
                                    placeholder="Enter username" 
                                    value={newUser.username} 
                                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Password</label>
                                <input 
                                    style={styles.input}
                                    type="password" 
                                    placeholder="Enter password" 
                                    value={newUser.password} 
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>First Name</label>
                                <input 
                                    style={styles.input}
                                    placeholder="Enter first name" 
                                    value={newUser.first_name} 
                                    onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Last Name</label>
                                <input 
                                    style={styles.input}
                                    placeholder="Enter last name" 
                                    value={newUser.last_name} 
                                    onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Email</label>
                                <input 
                                    style={styles.input}
                                    type="email"
                                    placeholder="Enter email" 
                                    value={newUser.email} 
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Department</label>
                                <select 
                                    style={styles.select}
                                    value={newUser.department} 
                                    onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                                >
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Software Engineering">Software Engineering</option>
                                    <option value="Information Technology">Information Technology</option>
                                    <option value="Electrical Engineering">Electrical Engineering</option>
                                    <option value="Business Administration">Business Administration</option>
                                    <option value="Mathematics">Mathematics</option>
                                    <option value="Physics">Physics</option>
                                </select>
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Role</label>
                                <select 
                                    style={styles.select}
                                    value={newUser.role} 
                                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                >
                                    <option value="student">Student</option>
                                    <option value="faculty">Faculty</option>
                                    <option value="ta">TA</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" style={styles.button}>
                            <Plus size={20} />
                            Create User
                        </button>
                    </form>

                    <div style={{marginTop: '2rem'}}>
                        <h3 style={styles.cardTitle}>
                            <Users size={24} />
                            All Users ({users.length})
                        </h3>
                        <table style={styles.table}>
                            <thead style={styles.tableHeader}>
                                <tr>
                                    <th style={styles.th}>ID</th>
                                    <th style={styles.th}>Username</th>
                                    <th style={styles.th}>Role</th>
                                    <th style={styles.th}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id}>
                                        <td style={styles.td}>{u.id}</td>
                                        <td style={styles.td}>{u.username}</td>
                                        <td style={styles.td}>
                                            <span style={{
                                                ...styles.badge,
                                                backgroundColor: u.role === 'admin' ? '#EF444415' : 
                                                               u.role === 'faculty' ? '#7C3AED15' :
                                                               u.role === 'student' ? '#10B98115' : '#F59E0B15',
                                                color: u.role === 'admin' ? colors.danger :
                                                       u.role === 'faculty' ? colors.secondary :
                                                       u.role === 'student' ? colors.success : colors.warning
                                            }}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td style={styles.td}>
                                            <CheckCircle size={16} color={colors.success} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === "courses" && (
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>
                        <BookPlus size={24} />
                        Add New Course
                    </h3>
                    <form onSubmit={handleAddCourse}>
                        <div style={styles.form}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Course Code</label>
                                <input 
                                    style={styles.input}
                                    placeholder="e.g., CS-101" 
                                    value={newCourse.code} 
                                    onChange={e => setNewCourse({ ...newCourse, code: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Course Name</label>
                                <input 
                                    style={styles.input}
                                    placeholder="e.g., Data Structures" 
                                    value={newCourse.name} 
                                    onChange={e => setNewCourse({ ...newCourse, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Credit Hours</label>
                                <input 
                                    style={styles.input}
                                    type="number" 
                                    placeholder="3" 
                                    value={newCourse.credit_hours} 
                                    onChange={e => setNewCourse({ ...newCourse, credit_hours: parseInt(e.target.value) })}
                                    min="1"
                                    max="6"
                                    required
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Semester</label>
                                <select 
                                    style={styles.input}
                                    value={newCourse.semester} 
                                    onChange={e => setNewCourse({ ...newCourse, semester: parseInt(e.target.value) })}
                                    required
                                >
                                    <option value={1}>1 (Fall)</option>
                                    <option value={2}>2 (Spring)</option>
                                    <option value={3}>3 (Summer)</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" style={styles.successButton}>
                            <Plus size={20} />
                            Add Course
                        </button>
                    </form>

                    <div style={{marginTop: '2rem'}}>
                        <h3 style={styles.cardTitle}>
                            <BookOpen size={24} />
                            All Courses ({courses.length})
                        </h3>
                        <table style={styles.table}>
                            <thead style={styles.tableHeader}>
                                <tr>
                                    <th style={styles.th}>Code</th>
                                    <th style={styles.th}>Name</th>
                                    <th style={styles.th}>Credits</th>
                                    <th style={styles.th}>Semester</th>
                                    <th style={styles.th}>Faculty</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.length > 0 ? courses.map(c => (
                                    <tr key={c.id}>
                                        <td style={{...styles.td, fontWeight: '600'}}>{c.code}</td>
                                        <td style={styles.td}>{c.name}</td>
                                        <td style={styles.td}>{c.credit_hours}h</td>
                                        <td style={styles.td}>{getSemesterName(c.semester)}</td>
                                        <td style={styles.td}>
                                            {c.faculty_detail ? (
                                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                    <span style={{ 
                                                        ...styles.badge,
                                                        backgroundColor: `${colors.secondary}15`,
                                                        color: colors.secondary
                                                    }}>
                                                        {c.faculty_detail.full_name}
                                                    </span>
                                                    <button onClick={() => handleUnassignFaculty(c.id)} style={{
                                                        padding: "4px 8px",
                                                        backgroundColor: colors.danger,
                                                        color: "white",
                                                        border: "none",
                                                        borderRadius: "4px",
                                                        cursor: "pointer",
                                                        fontSize: "0.75rem"
                                                    }}>
                                                        <XCircle size={12} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span style={{ color: colors.textSecondary, fontStyle: "italic" }}>Not assigned</span>
                                            )}
                                        </td>
                                        <td style={styles.td}>
                                            <select
                                                onChange={(e) => {
                                                    if (e.target.value) {
                                                        handleAssignFaculty(c.id, e.target.value);
                                                        e.target.value = "";
                                                    }
                                                }}
                                                style={{
                                                    padding: "6px 12px",
                                                    borderRadius: "6px",
                                                    border: `1px solid ${colors.primary}`,
                                                    backgroundColor: colors.primary,
                                                    color: "white",
                                                    cursor: "pointer",
                                                    fontSize: "0.875rem"
                                                }}
                                            >
                                                <option value="">Assign Faculty</option>
                                                {faculty.map(f => (
                                                    <option key={f.id} value={f.id}>
                                                        {f.first_name} {f.last_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" style={{ ...styles.td, textAlign: "center", padding: "2rem" }}>
                                            No courses found. Add one above.
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
            )}

            {activeTab === "students" && (
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>
                        <GraduationCap size={24} />
                        All Students ({students.length})
                    </h3>
                    <table style={styles.table}>
                        <thead style={styles.tableHeader}>
                            <tr>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>Name</th>
                                <th style={styles.th}>Enrollment Number</th>
                                <th style={styles.th}>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(s => (
                                <tr key={s.id}>
                                    <td style={styles.td}>{s.id}</td>
                                    <td style={styles.td}>{s.first_name} {s.last_name}</td>
                                    <td style={{...styles.td, fontWeight: '600'}}>{s.enrollment_number}</td>
                                    <td style={styles.td}>{s.user?.email || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === "enrollments" && (
                <>
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>
                            <UserCheck size={24} />
                            Enroll Student in Course
                        </h3>
                        <form onSubmit={handleEnrollStudent}>
                            <div style={{...styles.form, gridTemplateColumns: '1fr 1fr auto'}}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Student</label>
                                    <select 
                                        style={styles.select}
                                        value={newEnrollment.student} 
                                        onChange={(e) => setNewEnrollment({ ...newEnrollment, student: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Student</option>
                                        {students.map(s => (
                                            <option key={s.id} value={s.id}>
                                                {s.first_name} {s.last_name} ({s.enrollment_number})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Course</label>
                                    <select 
                                        style={styles.select}
                                        value={newEnrollment.course} 
                                        onChange={(e) => setNewEnrollment({ ...newEnrollment, course: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Course</option>
                                        {courses.map(c => (
                                            <option key={c.id} value={c.id}>
                                                {c.code} - {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" style={{...styles.successButton, marginTop: '1.5rem'}}>
                                    <Plus size={20} />
                                    Enroll
                                </button>
                            </div>
                        </form>
                    </div>

                    <div style={styles.bulkSection}>
                        <h3 style={{...styles.cardTitle, marginTop: 0}}>
                            <Users size={24} />
                            Bulk Enrollment
                        </h3>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Select Course</label>
                            <select 
                                style={styles.select}
                                value={bulkEnrollment.course} 
                                onChange={(e) => setBulkEnrollment({ ...bulkEnrollment, course: e.target.value })}
                            >
                                <option value="">Select Course</option>
                                {courses.map(c => (
                                    <option key={c.id} value={c.id}>
                                        {c.code} - {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={{ marginTop: "1rem" }}>
                            <label style={styles.label}>Select Students ({bulkEnrollment.selectedStudents.length} selected)</label>
                            <div style={{ 
                                maxHeight: "250px", 
                                overflowY: "auto", 
                                border: `1px solid ${colors.border}`, 
                                borderRadius: "8px", 
                                padding: "1rem",
                                marginTop: "0.5rem",
                                backgroundColor: "white"
                            }}>
                                {students.map(s => (
                                    <label key={s.id} style={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            checked={bulkEnrollment.selectedStudents.includes(s.id)}
                                            onChange={() => toggleBulkEnrollmentStudent(s.id)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <span>{s.first_name} {s.last_name} ({s.enrollment_number})</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <button onClick={handleBulkEnrollment} style={{...styles.warningButton, marginTop: '1rem'}}>
                            <UserPlus size={18} />
                            Bulk Enroll Students
                        </button>
                    </div>

                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>
                            <Calendar size={24} />
                            Current Enrollments ({enrollments.length})
                        </h3>
                        <table style={styles.table}>
                            <thead style={styles.tableHeader}>
                                <tr>
                                    <th style={styles.th}>Student</th>
                                    <th style={styles.th}>Course</th>
                                    <th style={styles.th}>Date Enrolled</th>
                                    <th style={styles.th}>Status</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrollments.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" style={{ ...styles.td, textAlign: "center", padding: "2rem" }}>
                                            No enrollments found
                                        </td>
                                    </tr>
                                ) : (
                                    enrollments.map(e => {
                                        const student = students.find(s => s.id === e.student);
                                        const course = courses.find(c => c.id === e.course);
                                        return (
                                            <tr key={e.id}>
                                                <td style={styles.td}>
                                                    {student ? `${student.first_name} ${student.last_name}` : 'N/A'}
                                                </td>
                                                <td style={styles.td}>
                                                    {e.course_name || (course ? `${course.code} - ${course.name}` : 'N/A')}
                                                </td>
                                                <td style={styles.td}>
                                                    {new Date(e.date_enrolled).toLocaleDateString()}
                                                </td>
                                                <td style={styles.td}>
                                                    <span style={{
                                                        ...styles.badge,
                                                        backgroundColor: e.status === 'active' ? `${colors.success}15` : `${colors.danger}15`,
                                                        color: e.status === 'active' ? colors.success : colors.danger
                                                    }}>
                                                        {e.status}
                                                    </span>
                                                </td>
                                                <td style={styles.td}>
                                                    {e.status === 'active' && (
                                                        <button onClick={() => handleDropEnrollment(e.id)} style={styles.dangerButton}>
                                                            <XCircle size={14} />
                                                            Drop
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {activeTab === "feeRecords" && (
                <>
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>
                            <DollarSign size={24} />
                            Create Fee Record
                        </h3>
                        <form onSubmit={handleAddFeeRecord}>
                            <div style={styles.form}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Student</label>
                                    <select 
                                        style={styles.select}
                                        value={newFeeRecord.student} 
                                        onChange={(e) => setNewFeeRecord({ ...newFeeRecord, student: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Student</option>
                                        {students.map(s => (
                                            <option key={s.id} value={s.id}>
                                                {s.first_name} {s.last_name} ({s.enrollment_number})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Total Fee</label>
                                    <input 
                                        style={styles.input}
                                        type="number" 
                                        value={newFeeRecord.total_fee} 
                                        onChange={(e) => setNewFeeRecord({ ...newFeeRecord, total_fee: e.target.value })}
                                        placeholder="50000"
                                        required
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Semester</label>
                                    <input 
                                        style={styles.input}
                                        type="number" 
                                        value={newFeeRecord.semester} 
                                        onChange={(e) => setNewFeeRecord({ ...newFeeRecord, semester: e.target.value })}
                                        min="1"
                                        max="8"
                                        required
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Year</label>
                                    <input 
                                        style={styles.input}
                                        type="number" 
                                        value={newFeeRecord.year} 
                                        onChange={(e) => setNewFeeRecord({ ...newFeeRecord, year: e.target.value })}
                                        min="1"
                                        max="4"
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" style={styles.successButton}>
                                <Plus size={20} />
                                Create Fee Record
                            </button>
                        </form>
                    </div>

                    {/* Record Payment */}
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>
                            <CreditCard size={24} />
                            Record Payment
                        </h3>
                        <form onSubmit={handleRecordPayment}>
                            <div style={styles.form}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Fee Record</label>
                                    <select 
                                        style={styles.select}
                                        value={newPayment.fee_record} 
                                        onChange={(e) => setNewPayment({ ...newPayment, fee_record: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Fee Record</option>
                                        {feeRecords.filter(f => f.due_amount > 0).map(f => (
                                            <option key={f.id} value={f.id}>
                                                {f.student_name} - Sem {f.semester} Year {f.year} (Due: ${f.due_amount})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Amount</label>
                                    <input 
                                        style={styles.input}
                                        type="number" 
                                        value={newPayment.amount} 
                                        onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                                        placeholder="Amount"
                                        step="0.01"
                                        required
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Payment Method</label>
                                    <select 
                                        style={styles.select}
                                        value={newPayment.payment_method} 
                                        onChange={(e) => setNewPayment({ ...newPayment, payment_method: e.target.value })}
                                    >
                                        <option value="cash">Cash</option>
                                        <option value="bank_transfer">Bank Transfer</option>
                                        <option value="credit_card">Credit Card</option>
                                        <option value="online">Online Payment</option>
                                    </select>
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Transaction ID (Optional)</label>
                                    <input 
                                        style={styles.input}
                                        type="text" 
                                        value={newPayment.transaction_id} 
                                        onChange={(e) => setNewPayment({ ...newPayment, transaction_id: e.target.value })}
                                        placeholder="TXN-12345"
                                    />
                                </div>
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Remarks (Optional)</label>
                                <textarea 
                                    style={{...styles.input, minHeight: '80px'}}
                                    value={newPayment.remarks} 
                                    onChange={(e) => setNewPayment({ ...newPayment, remarks: e.target.value })}
                                    placeholder="Additional notes..."
                                />
                            </div>
                            <button type="submit" style={styles.button}>
                                <DollarSign size={20} />
                                Record Payment
                            </button>
                        </form>
                    </div>

                    {/* Bulk Fee Generation */}
                    <div style={{ 
                        backgroundColor: "#e7f3ff", 
                        padding: "20px", 
                        borderRadius: "8px", 
                        marginBottom: "30px",
                        border: "1px solid #007bff"
                    }}>
                        <h4 style={{ marginTop: 0, color: "#007bff" }}>Bulk Fee Generation</h4>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                            <div>
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Semester</label>
                                <input 
                                    type="number" 
                                    value={bulkFeeGeneration.semester}
                                    onChange={(e) => setBulkFeeGeneration({ ...bulkFeeGeneration, semester: e.target.value })}
                                    min="1"
                                    max="8"
                                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                                />
                            </div>
                            <div>
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Year</label>
                                <input 
                                    type="number" 
                                    value={bulkFeeGeneration.year}
                                    onChange={(e) => setBulkFeeGeneration({ ...bulkFeeGeneration, year: e.target.value })}
                                    min="1"
                                    max="4"
                                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                                />
                            </div>
                            <div>
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Total Fee</label>
                                <input 
                                    type="number" 
                                    value={bulkFeeGeneration.total_fee}
                                    onChange={(e) => setBulkFeeGeneration({ ...bulkFeeGeneration, total_fee: e.target.value })}
                                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                <button 
                                    onClick={selectAllStudents}
                                    style={{ 
                                        padding: "8px 15px", 
                                        backgroundColor: "#007bff", 
                                        color: "white", 
                                        border: "none", 
                                        borderRadius: "4px", 
                                        cursor: "pointer",
                                        fontSize: "14px"
                                    }}
                                >
                                    Select All
                                </button>
                                <button 
                                    onClick={deselectAllStudents}
                                    style={{ 
                                        padding: "8px 15px", 
                                        backgroundColor: "#6c757d", 
                                        color: "white", 
                                        border: "none", 
                                        borderRadius: "4px", 
                                        cursor: "pointer",
                                        fontSize: "14px"
                                    }}
                                >
                                    Deselect All
                                </button>
                                <span style={{ marginLeft: "auto", padding: "8px", fontWeight: "bold" }}>
                                    Selected: {bulkFeeGeneration.selectedStudents.length} / {students.length}
                                </span>
                            </div>
                            
                            <div style={{ 
                                maxHeight: "300px", 
                                overflowY: "auto", 
                                border: "1px solid #ced4da", 
                                borderRadius: "4px", 
                                padding: "10px",
                                backgroundColor: "white"
                            }}>
                                {students.map(student => (
                                    <div key={student.id} style={{ padding: "8px", borderBottom: "1px solid #e9ecef" }}>
                                        <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                                            <input 
                                                type="checkbox"
                                                checked={bulkFeeGeneration.selectedStudents.includes(student.id)}
                                                onChange={() => toggleStudentSelection(student.id)}
                                                style={{ marginRight: "10px", cursor: "pointer", width: "18px", height: "18px" }}
                                            />
                                            <span>
                                                {student.first_name} {student.last_name} ({student.enrollment_number}) - 
                                                Year {student.year}, Semester {student.semester}
                                            </span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button 
                            onClick={handleBulkFeeGeneration}
                            disabled={bulkFeeGeneration.selectedStudents.length === 0}
                            style={{ 
                                padding: "12px 30px", 
                                backgroundColor: bulkFeeGeneration.selectedStudents.length === 0 ? "#ccc" : "#007bff",
                                color: "white", 
                                border: "none", 
                                borderRadius: "5px", 
                                cursor: bulkFeeGeneration.selectedStudents.length === 0 ? "not-allowed" : "pointer",
                                fontWeight: "bold",
                                fontSize: "16px",
                                width: "100%"
                            }}
                        >
                            Generate {bulkFeeGeneration.selectedStudents.length} Fee Record(s)
                        </button>
                    </div>

                    {/* Existing Fee Records List */}
                    <div>
                        <h4>Existing Fee Records ({feeRecords.length})</h4>
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white" }}>
                                <thead>
                                    <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #dee2e6" }}>
                                        <th style={{ padding: "12px", textAlign: "left" }}>Student</th>
                                        <th style={{ padding: "12px", textAlign: "center" }}>Semester</th>
                                        <th style={{ padding: "12px", textAlign: "center" }}>Year</th>
                                        <th style={{ padding: "12px", textAlign: "right" }}>Total Fee</th>
                                        <th style={{ padding: "12px", textAlign: "right" }}>Paid</th>
                                        <th style={{ padding: "12px", textAlign: "right" }}>Due</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feeRecords.length > 0 ? feeRecords.map(f => (
                                        <tr key={f.id} style={{ borderBottom: "1px solid #dee2e6" }}>
                                            <td style={{ padding: "12px" }}>{f.student_name}</td>
                                            <td style={{ padding: "12px", textAlign: "center" }}>{f.semester}</td>
                                            <td style={{ padding: "12px", textAlign: "center" }}>{f.year}</td>
                                            <td style={{ padding: "12px", textAlign: "right" }}>{f.total_fee}</td>
                                            <td style={{ padding: "12px", textAlign: "right", color: "#28a745" }}>{f.paid_amount}</td>
                                            <td style={{ padding: "12px", textAlign: "right", color: f.due_amount > 0 ? "#dc3545" : "#28a745", fontWeight: "bold" }}>
                                                {f.due_amount}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="6" style={{ padding: "20px", textAlign: "center", color: "#6c757d" }}>
                                                No fee records found. Create one above.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {activeTab === "payments" && (
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>
                        <CreditCard size={24} />
                        Payment Management
                    </h3>

                    {/* Payment Statistics */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem',
                        marginBottom: '2rem'
                    }}>
                        <div style={{
                            padding: '1rem',
                            backgroundColor: `${colors.success}15`,
                            borderRadius: '8px',
                            border: `1px solid ${colors.success}30`
                        }}>
                            <div style={{ fontSize: '0.875rem', color: colors.textSecondary, marginBottom: '0.5rem' }}>
                                Total Collected
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.success }}>
                                ${payments.reduce((sum, p) => sum + parseFloat(p.amount), 0).toFixed(2)}
                            </div>
                        </div>
                        <div style={{
                            padding: '1rem',
                            backgroundColor: `${colors.primary}15`,
                            borderRadius: '8px',
                            border: `1px solid ${colors.primary}30`
                        }}>
                            <div style={{ fontSize: '0.875rem', color: colors.textSecondary, marginBottom: '0.5rem' }}>
                                Total Transactions
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.primary }}>
                                {payments.length}
                            </div>
                        </div>
                        <div style={{
                            padding: '1rem',
                            backgroundColor: `${colors.danger}15`,
                            borderRadius: '8px',
                            border: `1px solid ${colors.danger}30`
                        }}>
                            <div style={{ fontSize: '0.875rem', color: colors.textSecondary, marginBottom: '0.5rem' }}>
                                Outstanding Dues
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.danger }}>
                                ${feeRecords.reduce((sum, f) => sum + parseFloat(f.due_amount || 0), 0).toFixed(2)}
                            </div>
                        </div>
                    </div>

                    {/* Payment History */}
                    <h4 style={{...styles.cardTitle, fontSize: '1.25rem', marginBottom: '1rem'}}>
                        Payment History
                    </h4>
                    <table style={styles.table}>
                        <thead style={styles.tableHeader}>
                            <tr>
                                <th style={styles.th}>Transaction ID</th>
                                <th style={styles.th}>Student</th>
                                <th style={styles.th}>Amount</th>
                                <th style={styles.th}>Payment Method</th>
                                <th style={styles.th}>Date</th>
                                <th style={styles.th}>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ ...styles.td, textAlign: "center", padding: "2rem" }}>
                                        No payments recorded yet
                                    </td>
                                </tr>
                            ) : (
                                payments.map(p => (
                                    <tr key={p.id}>
                                        <td style={{...styles.td, fontWeight: '600'}}>
                                            {p.transaction_id || `TXN-${p.id}`}
                                        </td>
                                        <td style={styles.td}>
                                            {feeRecords.find(f => f.id === p.fee_record)?.student_name || 'N/A'}
                                        </td>
                                        <td style={{...styles.td, fontWeight: '600', color: colors.success}}>
                                            ${parseFloat(p.amount).toFixed(2)}
                                        </td>
                                        <td style={styles.td}>
                                            <span style={{
                                                ...styles.badge,
                                                backgroundColor: 
                                                    p.payment_method === 'cash' ? `${colors.success}15` :
                                                    p.payment_method === 'bank_transfer' ? `${colors.primary}15` :
                                                    p.payment_method === 'credit_card' ? `${colors.secondary}15` :
                                                    `${colors.warning}15`,
                                                color: 
                                                    p.payment_method === 'cash' ? colors.success :
                                                    p.payment_method === 'bank_transfer' ? colors.primary :
                                                    p.payment_method === 'credit_card' ? colors.secondary :
                                                    colors.warning
                                            }}>
                                                {p.payment_method.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={styles.td}>
                                            {new Date(p.payment_date).toLocaleDateString()}
                                        </td>
                                        <td style={styles.td}>
                                            {p.remarks || '-'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            </div>
        </div>
    );
}

export default AdminDashboard;
