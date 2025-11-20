// frontend/src/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "./config/api";

function Dashboard() {
    const [student, setStudent] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [attendance, setAttendance] = useState([]);
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
                const [studentRes, assignmentsRes, quizzesRes, attendanceRes] = await Promise.all([
                    axios.get(API_ENDPOINTS.STUDENTS, { headers }),
                    axios.get(API_ENDPOINTS.ASSIGNMENTS, { headers }),
                    axios.get(API_ENDPOINTS.QUIZZES, { headers }),
                    axios.get(API_ENDPOINTS.ATTENDANCE, { headers }),
                ]);
                if (studentRes.data.length > 0) setStudent(studentRes.data[0]);
                setAssignments(assignmentsRes.data);
                setQuizzes(quizzesRes.data);
                setAttendance(attendanceRes.data);
            } catch (err) {
                console.error(err);
                if (err.response?.status === 401) { localStorage.clear(); navigate("/"); }
            } finally { setLoading(false); }
        };
        fetchStudent();
    }, [navigate]);

    const handleLogout = () => { localStorage.clear(); navigate("/"); };

    if (loading) return <div style={{ padding:"20px", textAlign:"center" }}>Loading...</div>;
    if (!student) return (
        <div style={{ padding:"20px", textAlign:"center" }}>
            <p>No student data found</p>
            <button onClick={()=>navigate("/")} style={{marginTop:"20px"}}>Go to Login</button>
        </div>
    );

    return (
        <div style={{ padding:"20px", maxWidth:"1000px", margin:"auto", fontFamily:"Arial" }}>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:"20px"}}>
                <h2>Student Dashboard</h2>
                <button onClick={handleLogout} style={{padding:"10px 20px", backgroundColor:"#dc3545", color:"white", border:"none", borderRadius:"5px", cursor:"pointer"}}>Logout</button>
            </div>

            {/* Tabs */}
            <div style={{display:'flex', gap:'10px', marginBottom:'20px'}}>
                {['overview','courses','assignments','quizzes','attendance'].map(tab=>(
                    <button key={tab} onClick={()=>setActiveTab(tab)} style={{padding:"10px 20px", border:"none", borderBottom: activeTab===tab?"3px solid #007bff":"3px solid transparent", background:"none", cursor:"pointer", color: activeTab===tab?"#007bff":"#000"}}>{tab.charAt(0).toUpperCase()+tab.slice(1)}</button>
                ))}
            </div>

            {/* Content */}
            <div>
                {activeTab==='overview' && (
                    <div>
                        <h3>Profile Information</h3>
                        <p><strong>Full Name:</strong> {student.first_name} {student.last_name}</p>
                        <p><strong>Email:</strong> {student.user?.email || 'N/A'}</p>
                        <p><strong>Enrollment:</strong> {student.enrollment_number}</p>
                        <p><strong>Department:</strong> {student.department}</p>
                        <p><strong>Year/Semester:</strong> {student.year} / {student.semester}</p>
                        <p><strong>CGPA:</strong> {student.cgpa}</p>
                    </div>
                )}
                {activeTab==='courses' && (
                    <div>
                        <h3>Enrolled Courses</h3>
                        <ul>{student.courses_enrolled?.map(c=><li key={c.id}>{c.course_name} | Status: {c.status}</li>)}</ul>
                    </div>
                )}
                {activeTab==='assignments' && (
                    <div>
                        <h3>Assignments</h3>
                        {assignments.length>0 ? assignments.map(a=>(
                            <div key={a.id} style={{padding:"10px", border:"1px solid #ccc", borderRadius:"5px", marginBottom:"10px"}}>
                                <strong>{a.title}</strong> | Course: {a.course_name} | Due: {a.due_date ? new Date(a.due_date).toLocaleDateString():'N/A'}
                            </div>
                        )):<p>No assignments yet.</p>}
                    </div>
                )}
                {activeTab==='quizzes' && (
                    <div>
                        <h3>Quizzes</h3>
                        {quizzes.length>0 ? quizzes.map(q=>(
                            <div key={q.id} style={{padding:"10px", border:"1px solid #ccc", borderRadius:"5px", marginBottom:"10px"}}>
                                <strong>{q.title}</strong> | Course: {q.course_name} | Date: {q.date ? new Date(q.date).toLocaleDateString():'N/A'}
                            </div>
                        )):<p>No quizzes yet.</p>}
                    </div>
                )}
                {activeTab==='attendance' && (
                    <div>
                        <h3>Attendance</h3>
                        {attendance.length>0 ? attendance.map(a=>(
                            <div key={a.id}>{a.course_name} | {a.date} | Status: {a.status}</div>
                        )):<p>No attendance records.</p>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
