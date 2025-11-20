// frontend/src/FacultyDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "./config/api"; // Ensure this file is correct

// Styles object (moved to the end, but kept for completeness)
const styles = {
    container: { fontFamily: 'Arial, sans-serif', padding: '30px', backgroundColor: '#f4f7f6', minHeight: '100vh' },
    loading: { textAlign: 'center', fontSize: '1.2em', marginTop: '50px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '2px solid #e0e0e0' },
    title: { margin: 0, color: '#333' },
    subtitle: { margin: '5px 0 0 0', color: '#666' },
    logoutBtn: { padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' },
    tabs: { display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #e0e0e0', marginTop: '20px' },
    tab: { padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', borderBottom: '3px solid transparent' },
    activeTab: { padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', borderBottom: '3px solid #007bff', color: '#007bff', fontWeight: 'bold' },
    content: { marginTop: '20px' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' },
    statCard: { padding: '20px', backgroundColor: 'white', borderRadius: '10px', textAlign: 'center', border: '1px solid #e0e0e0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
    section: { backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
    listItem: { padding: '15px', backgroundColor: '#fff', borderRadius: '5px', border: '1px solid #e9ecef', marginBottom: '10px' },
    button: { padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px', transition: 'background-color 0.3s' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9', marginBottom: '20px' },
    input: { padding: '10px', border: '1px solid #ddd', borderRadius: '5px' },
    list: { listStyleType: 'none', padding: 0 },
    studentItem: { display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '10px', borderBottom: '1px dotted #e0e0e0' },
    checkboxItem: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', padding: '5px 0' },
};


function FacultyDashboard() {
    const [faculty, setFaculty] = useState(null);
    const [courses, setCourses] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [students, setStudents] = useState([]);
    const [submissions, setSubmissions] = useState([]); // NEW: for Grades tab
    const [quizGrades, setQuizGrades] = useState([]); // NEW: for Grades tab
    
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    // Forms state
    const [showAssignmentForm, setShowAssignmentForm] = useState(false);
    const [showQuizForm, setShowQuizForm] = useState(false);
    const [showAnnouncementForm, setShowAnnouncementForm] = useState({});
    const [assignmentFormData, setAssignmentFormData] = useState({ title:'', description:'', course:'', file: null });
    const [quizFormData, setQuizFormData] = useState({ title:'', course:'', date:'', time_limit:'' });
    const [announcementFormData, setAnnouncementFormData] = useState({ title:'', content:'' });
    
    // Attendance State 
    const [selectedCourseIdForAttendance, setSelectedCourseIdForAttendance] = useState('');
    const [attendanceMark, setAttendanceMark] = useState({}); // {studentId: true/false}

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
                submissionsRes, quizGradesRes 
            ] = await Promise.all([
                axios.get(API_ENDPOINTS.FACULTY, { headers }),
                axios.get(API_ENDPOINTS.COURSES, { headers }),
                axios.get(API_ENDPOINTS.ASSIGNMENTS, { headers }),
                axios.get(API_ENDPOINTS.QUIZZES, { headers }),
                axios.get(API_ENDPOINTS.STUDENTS, { headers }),
                axios.get(API_ENDPOINTS.SUBMISSIONS, { headers }), // For Grades (Assignments)
                axios.get(API_ENDPOINTS.QUIZ_GRADES, { headers }), // For Grades (Quizzes)
            ]);

            if (facultyRes.data.length > 0) setFaculty(facultyRes.data[0]);
            setCourses(coursesRes.data);
            setAssignments(assignmentsRes.data);
            setQuizzes(quizzesRes.data);
            setStudents(studentsRes.data);
            setSubmissions(submissionsRes.data); 
            setQuizGrades(quizGradesRes.data);

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
            if (assignmentFormData.file) formData.append("file", assignmentFormData.file);

            await axios.post(API_ENDPOINTS.ASSIGNMENTS, formData, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
            });

            setShowAssignmentForm(false);
            setAssignmentFormData({ title:'', description:'', course:'', file: null });
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
            alert("Please select a course first.");
            return;
        }

        try {
            // FIX: Endpoint should target a custom action on the CourseViewSet: /api/courses/{id}/mark_attendance/
            await axios.post(`${API_ENDPOINTS.COURSES}${selectedCourseIdForAttendance}/mark_attendance/`, {
                // Collect IDs of students marked present
                student_ids: students.filter(s => attendanceMark[s.id]).map(s => s.id) 
            }, { headers });

            alert(`Attendance marked successfully for Course ID: ${selectedCourseIdForAttendance}!`);
            setSelectedCourseIdForAttendance(''); // Reset course selection
            setAttendanceMark({}); // Reset marks
            fetchFacultyData(); // Refresh data
        } catch(err) {
            console.error("Error marking attendance:", err.response ? err.response.data : err);
            alert("Failed to mark attendance. Check console for details.");
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
        }
        setAttendanceMark(attendanceObj);
    };


    // ---------------- Announcement Submit ----------------
    // In FacultyDashboard.js, inside the handleAnnouncementSubmit function:
const handleAnnouncementSubmit = async (e, courseId) => {
    e.preventDefault();
    try {
        await axios.post(
            `${API_ENDPOINTS.COURSES}${courseId}/post_announcement/`, 
            // 1. Data ko direct object ki tarah bhejein
            announcementFormData, 
            { 
                headers: { 
                    Authorization: `Bearer ${token}`, 
                    // 2. Explicitly batao ki data JSON format mein hai
                    'Content-Type': 'application/json' 
                } 
            }
        );
        setAnnouncementFormData({ title:'', content:'' });
        setShowAnnouncementForm({...showAnnouncementForm, [courseId]: false });
        fetchFacultyData();
    } catch(err) {
        console.error(err);
        alert("Failed to post announcement. Check console for details.");
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
        student: s.student_name || 'N/A',
        grade: s.grade || 'N/A',
        feedback: s.feedback || 'No feedback'
    }));
    
    const allQuizGrades = quizGrades.map(g => ({
        id: g.id,
        quiz: g.quiz_title || 'N/A',
        student: g.student_name || 'N/A',
        score: g.score || 'N/A',
        max: g.max_score || 'N/A'
    }));


    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h2 style={styles.title}>Faculty Dashboard</h2>
                    <p style={styles.subtitle}>{faculty.first_name} {faculty.last_name} - {faculty.designation}</p>
                </div>
                <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </div>
            
            {/* Tabs (UPDATED: Added new tabs) */}
            <div style={styles.tabs}>
                {['overview','courses','assignments','quizzes','students','attendance','grades','materials'].map(tab => (
                    <button 
                        key={tab} 
                        style={activeTab===tab?styles.activeTab:styles.tab} 
                        onClick={()=>setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase()+tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div style={styles.content}>
                
                {/* --- Overview Tab --- */}
                {activeTab === 'overview' && (
                    <div style={styles.statsGrid}>
                        <div style={styles.statCard}><h3>{courses.length}</h3><p>Courses Taught</p></div>
                        <div style={styles.statCard}><h3>{assignments.length}</h3><p>Assignments Posted</p></div>
                        <div style={styles.statCard}><h3>{quizzes.length}</h3><p>Quizzes Scheduled</p></div>
                        <div style={styles.statCard}><h3>{students.length}</h3><p>Total Students</p></div>
                    </div>
                )}

                {/* --- Courses Tab (Existing Logic) --- */}
                {activeTab === 'courses' && (
                    <div style={styles.section}>
                        <h3>My Courses ({courses.length})</h3>
                        {courses.map(c => (
                            <div key={c.id} style={{...styles.listItem, borderLeft: '5px solid #007bff'}}>
                                <h4>{c.code} - {c.name}</h4>
                                <p>{c.description}</p>
                                <p><strong>Credit Hours:</strong> {c.credit_hours} | <strong>Semester:</strong> {c.semester}</p>
                                <p><strong>TAs:</strong> {c.tas_detail?.map(ta => ta.full_name).join(', ') || 'None'}</p>

                                {/* Announcements section */}
                                <div style={{marginTop: '15px', padding: '10px', borderTop: '1px solid #ccc'}}>
                                    <h5>Announcements ({c.announcements_detail?.length || 0})</h5>
                                    {(c.announcements_detail?.length || 0) > 0 ? (
                                        c.announcements_detail.map(a => (
                                            <div key={a.id} style={{backgroundColor: '#e9ecef', padding: '10px', borderRadius: '5px', marginBottom: '5px'}}>
                                                <strong>{a.title}</strong> - <small>{new Date(a.posted_at).toLocaleDateString()}</small>
                                                <p style={{margin: '5px 0 0 0'}}>{a.content}</p>
                                            </div>
                                        ))
                                    ) : <p>No announcements yet.</p>}

                                    {/* Announcement Post Form Toggle */}
                                    <button 
                                        style={{...styles.button, backgroundColor: showAnnouncementForm[c.id] ? '#6c757d' : '#28a745'}}
                                        onClick={() => setShowAnnouncementForm({...showAnnouncementForm, [c.id]: !showAnnouncementForm[c.id]})}
                                    >
                                        {showAnnouncementForm[c.id] ? 'Hide Form' : 'Post New Announcement'}
                                    </button>

                                    {/* Announcement Post Form */}
                                    {showAnnouncementForm[c.id] && (
                                        <form onSubmit={(e) => handleAnnouncementSubmit(e, c.id)} style={{marginTop: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}>
                                            <input type="text" placeholder="Title" value={announcementFormData.title} onChange={e => setAnnouncementFormData({...announcementFormData, title: e.target.value})} required style={styles.input}/>
                                            <textarea placeholder="Content" value={announcementFormData.content} onChange={e => setAnnouncementFormData({...announcementFormData, content: e.target.value})} required style={{...styles.input, minHeight: '80px'}}/>
                                            <button type="submit" style={styles.button}>Post Announcement</button>
                                        </form>
                                    )}
                                </div>
                                
                                {/* Attendance Details (from course serializer) */}
                                <div style={{marginTop: '15px', padding: '10px', borderTop: '1px solid #ccc'}}>
                                    <h5>Recent Attendance History ({c.attendance_detail?.length || 0})</h5>
                                    {(c.attendance_detail?.length || 0) > 0 ? (
                                        c.attendance_detail.slice(0, 3).map(att => (
                                            <p key={att.id} style={{margin: '5px 0'}}>
                                                {new Date(att.date).toLocaleDateString()}: {att.students_present_count} Students Present (Type: {att.attendance_type})
                                            </p>
                                        ))
                                    ) : <p>No attendance records.</p>}
                                    {(c.attendance_detail?.length || 0) > 3 && <p>...and {c.attendance_detail.length - 3} more records.</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {/* --- Assignments Tab (Existing Logic) --- */}
                {activeTab === 'assignments' && (
                    <div style={styles.section}>
                        <h3>Assignments ({assignments.length})</h3>
                        <button style={styles.button} onClick={() => setShowAssignmentForm(!showAssignmentForm)}>
                            {showAssignmentForm ? 'Hide Form' : 'Add New Assignment'}
                        </button>
                        {showAssignmentForm && (
                            <form onSubmit={handleAssignmentSubmit} style={styles.form}>
                                <input type="text" placeholder="Title" value={assignmentFormData.title} onChange={e=>setAssignmentFormData({...assignmentFormData,title:e.target.value})} required style={styles.input}/>
                                <textarea placeholder="Description" value={assignmentFormData.description} onChange={e=>setAssignmentFormData({...assignmentFormData,description:e.target.value})} required style={styles.input}/>
                                <select value={assignmentFormData.course} onChange={e=>setAssignmentFormData({...assignmentFormData,course:e.target.value})} required style={styles.input}>
                                    <option value="">Select Course</option>
                                    {courses.map(c=><option key={c.id} value={c.id}>{c.code} - {c.name}</option>)}
                                </select>
                                <input type="file" onChange={e=>setAssignmentFormData({...assignmentFormData,file:e.target.files[0]})} style={styles.input}/>
                                <button type="submit" style={styles.button}>Save Assignment</button>
                            </form>
                        )}
                        {assignments.length > 0 ? assignments.map(a=>(
                            <div key={a.id} style={{...styles.listItem, borderLeft: '5px solid #ffc107'}}> 
                                <h4>{a.title}</h4>
                                <p><strong>Course:</strong> {a.course_code} - {a.course_name}</p>
                                <p><strong>Due Date:</strong> {new Date(a.due_date).toLocaleDateString()}</p>
                                <p><strong>Max Points:</strong> {a.max_points}</p>
                                <p>{a.description}</p>
                            </div>
                        )) : <p>No assignments posted.</p>}
                    </div>
                )}
                
                {/* --- Quizzes Tab (Existing Logic) --- */}
                {activeTab === 'quizzes' && (
                    <div style={styles.section}>
                        <h3>Quizzes ({quizzes.length})</h3>
                        <button style={styles.button} onClick={() => setShowQuizForm(!showQuizForm)}>
                            {showQuizForm ? 'Hide Form' : 'Add New Quiz'}
                        </button>
                        {showQuizForm && (
                            <form onSubmit={handleQuizSubmit} style={styles.form}>
                                <input type="text" placeholder="Title" value={quizFormData.title} onChange={e=>setQuizFormData({...quizFormData,title:e.target.value})} required style={styles.input}/>
                                <select value={quizFormData.course} onChange={e=>setQuizFormData({...quizFormData,course:e.target.value})} required style={styles.input}>
                                    <option value="">Select Course</option>
                                    {courses.map(c=><option key={c.id} value={c.id}>{c.code} - {c.name}</option>)}
                                </select>
                                <input type="datetime-local" placeholder="Date and Time" value={quizFormData.date} onChange={e=>setQuizFormData({...quizFormData,date:e.target.value})} required style={styles.input}/>
                                <input type="number" placeholder="Time Limit (minutes)" value={quizFormData.time_limit} onChange={e=>setQuizFormData({...quizFormData,time_limit:e.target.value})} required style={styles.input}/>
                                <button type="submit" style={styles.button}>Save Quiz</button>
                            </form>
                        )}
                        {quizzes.length > 0 ? quizzes.map(q=>(
                            <div key={q.id} style={{...styles.listItem, borderLeft: '5px solid #17a2b8'}}> 
                                <h4>{q.title} - {q.course_name}</h4>
                                <p><strong>Date:</strong> {new Date(q.date).toLocaleString()}</p>
                                <p><strong>Max Marks:</strong> {q.max_marks} | <strong>Duration:</strong> {q.duration_minutes} mins</p>
                            </div>
                        )) : <p>No quizzes scheduled.</p>}
                    </div>
                )}

                {/* --- Students Tab (Existing Logic) --- */}
                {activeTab === 'students' && (
                    <div style={styles.section}>
                        <h3>All Registered Students ({students.length})</h3>
                        {students.length > 0 ? (
                            <ul style={styles.list}>
                                {students.map(s => (
                                    <li key={s.id} style={styles.studentItem}>
                                        {s.first_name} {s.last_name} ({s.enrollment_number}) - {s.user?.email || 'No Email'}
                                    </li>
                                ))}
                            </ul>
                        ) : <p>No students found.</p>}
                    </div>
                )}

                {/* --- Attendance Tab (NEW LOGIC) --- */}
                {activeTab === 'attendance' && (
                    <div style={styles.section}>
                        <h3>Mark Daily Attendance</h3>
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

                            {selectedCourseIdForAttendance && (
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
                    <div>
                        <div style={styles.section}>
                            <h3>Submission Grades ({allSubmissions.length})</h3>
                            {allSubmissions.length > 0 ? (
                                <ul style={styles.list}>
                                    {allSubmissions.map(s => (
                                        <li key={s.id} style={{...styles.studentItem, justifyContent: 'space-between', borderLeft: '5px solid #28a745'}}>
                                            <span><strong>{s.student}</strong> | Assignment: {s.assignment}</span>
                                            <span>Grade: <strong>{s.grade}</strong> | <small>{s.feedback}</small></span>
                                        </li>
                                    ))}
                                </ul>
                            ) : <p>No submissions to grade or review.</p>}
                        </div>

                        <div style={styles.section}>
                            <h3>Quiz Grades ({allQuizGrades.length})</h3>
                            {allQuizGrades.length > 0 ? (
                                <ul style={styles.list}>
                                    {allQuizGrades.map(g => (
                                        <li key={g.id} style={{...styles.studentItem, justifyContent: 'space-between', borderLeft: '5px solid #6f42c1'}}>
                                            <span><strong>{g.student}</strong> | Quiz: {g.quiz}</span>
                                            <span>Score: <strong>{g.score} / {g.max}</strong></span>
                                        </li>
                                    ))}
                                </ul>
                            ) : <p>No quiz grades recorded yet.</p>}
                        </div>
                    </div>
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