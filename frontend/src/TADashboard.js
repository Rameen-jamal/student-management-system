import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "./config/api";

function TADashboard() {
    const [ta, setTA] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const navigate = useNavigate();

    const fetchTAData = useCallback(async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("/");
            return;
        }

        try {
            const headers = { Authorization: `Bearer ${token}` };
            
            // Fetch TA profile
            const taRes = await axios.get(API_ENDPOINTS.TAS, { headers });
            if (taRes.data.length > 0) {
                setTA(taRes.data[0]);
            }

            // Fetch tasks
            const tasksRes = await axios.get(`${API_ENDPOINTS.TA_TASKS}`, { headers });
            setTasks(tasksRes.data);

            // Fetch assigned courses
            const coursesRes = await axios.get(API_ENDPOINTS.COURSES, { headers });
            setCourses(coursesRes.data);

        } catch (err) {
            console.error(err);
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

    const handleCompleteTask = async (taskId) => {
        const token = localStorage.getItem("access_token");
        try {
            await axios.post(
                `${API_ENDPOINTS.TA_TASKS}${taskId}/complete/`,
                { notes: 'Task completed' },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchTAData(); // Refresh data
        } catch (err) {
            console.error(err);
            alert('Failed to complete task');
        }
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
                <div>
                    <h2 style={styles.title}>Teaching Assistant Dashboard</h2>
                    <p style={styles.subtitle}>{ta.first_name} {ta.last_name} - {ta.department}</p>
                </div>
                <button onClick={handleLogout} style={styles.logoutBtn}>
                    Logout
                </button>
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
            </div>

            {/* Content */}
            <div style={styles.content}>
                {activeTab === 'overview' && (
                    <div>
                        <div style={styles.statsGrid}>
                            <div style={styles.statCard}>
                                <h3>{pendingTasks.length}</h3>
                                <p>Pending Tasks</p>
                            </div>
                            <div style={styles.statCard}>
                                <h3>{completedTasks.length}</h3>
                                <p>Completed Tasks</p>
                            </div>
                            <div style={styles.statCard}>
                                <h3>{courses.length}</h3>
                                <p>Assigned Courses</p>
                            </div>
                        </div>

                        <div style={styles.section}>
                            <h3>Profile Information</h3>
                            <p><strong>Email:</strong> {ta.user?.email || 'N/A'}</p>
                            <p><strong>Department:</strong> {ta.department}</p>
                            <p><strong>Contact:</strong> {ta.contact_number || 'N/A'}</p>
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
                                            <p><strong>Course:</strong> {task.course_name}</p>
                                            <p><strong>Assigned by:</strong> {task.assigned_by_name}</p>
                                            <p><strong>Due Date:</strong> {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}</p>
                                        </div>
                                        <button
                                            onClick={() => handleCompleteTask(task.id)}
                                            style={styles.completeBtn}
                                        >
                                            Mark Complete
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
                        <h3>Assigned Courses</h3>
                        {courses.length > 0 ? (
                            <div style={styles.list}>
                                {courses.map(course => (
                                    <div key={course.id} style={styles.listItem}>
                                        <h4>{course.code} - {course.name}</h4>
                                        <p>{course.description}</p>
                                        <p><strong>Credit Hours:</strong> {course.credit_hours}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No courses assigned yet.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        paddingBottom: '20px',
        borderBottom: '2px solid #e0e0e0',
    },
    title: {
        margin: 0,
        color: '#333',
    },
    subtitle: {
        margin: '5px 0 0 0',
        color: '#666',
    },
    logoutBtn: {
        padding: '10px 20px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    tabs: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        borderBottom: '1px solid #e0e0e0',
    },
    tab: {
        padding: '10px 20px',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        borderBottom: '3px solid transparent',
    },
    activeTab: {
        padding: '10px 20px',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        borderBottom: '3px solid #007bff',
        color: '#007bff',
        fontWeight: 'bold',
    },
    content: {
        marginTop: '20px',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px',
    },
    statCard: {
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        textAlign: 'center',
        border: '1px solid #e0e0e0',
    },
    section: {
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '20px',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    listItem: {
        padding: '15px',
        backgroundColor: 'white',
        borderRadius: '5px',
        border: '1px solid #e0e0e0',
    },
    taskCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        backgroundColor: 'white',
        borderRadius: '5px',
        border: '1px solid #e0e0e0',
    },
    completeBtn: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    loading: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    button: {
        padding: '10px 20px',
        marginTop: '20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default TADashboard;
