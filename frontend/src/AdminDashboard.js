// frontend/src/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "./config/api";

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("users");
    const [loading, setLoading] = useState(true);

    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [feeRecords, setFeeRecords] = useState([]);
    const [payments, setPayments] = useState([]);

    const [newUser, setNewUser] = useState({ username: "", password: "", role: "student" });
    const [newCourse, setNewCourse] = useState({ code: "", name: "", credit_hours: 3, semester: "Fall" });

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
            const [usersRes, coursesRes, studentsRes, feeRes, paymentRes] = await Promise.all([
                axios.get(API_ENDPOINTS.ADMIN_USERS, { headers }),
                axios.get(API_ENDPOINTS.ADMIN_COURSES, { headers }),
                axios.get(API_ENDPOINTS.STUDENTS, { headers }),
                axios.get(API_ENDPOINTS.FEE_RECORDS, { headers }),
                axios.get(API_ENDPOINTS.PAYMENTS, { headers }),
            ]);

            setUsers(usersRes.data);
            setCourses(coursesRes.data);
            setStudents(studentsRes.data);
            setFeeRecords(feeRes.data);
            setPayments(paymentRes.data);

        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                localStorage.clear();
                navigate("/");
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
            setNewUser({ username: "", password: "", role: "student" });
            fetchAllData();
        } catch (err) { console.error(err); alert("Failed to add user"); }
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_ENDPOINTS.ADMIN_COURSES, newCourse, { headers });
            setNewCourse({ code: "", name: "", credit_hours: 3, semester: "Fall" });
            fetchAllData();
        } catch (err) { console.error(err); alert("Failed to add course"); }
    };

    const handleLogout = () => { localStorage.clear(); navigate("/"); };

    if (loading) return <div style={{ padding: "20px" }}>Loading...</div>;

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <h2>Admin Dashboard</h2>
                <button
                    onClick={handleLogout}
                    style={{ padding: "10px 20px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                >
                    Logout
                </button>
            </div>

            {/* Tabs */}
            <div style={{ marginBottom: "20px" }}>
                {["users", "courses", "students", "feeRecords", "payments"].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            marginRight: "10px",
                            backgroundColor: activeTab === tab ? "#007bff" : "#ccc",
                            color: activeTab === tab ? "white" : "black",
                            padding: "5px 10px",
                            border: "none",
                            borderRadius: "3px",
                            cursor: "pointer"
                        }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Content */}
            {activeTab === "users" && (
                <div>
                    <h3>Users</h3>
                    <form onSubmit={handleAddUser} style={{ marginBottom: "20px" }}>
                        <input placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
                        <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                        <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                            <option value="student">Student</option>
                            <option value="faculty">Faculty</option>
                            <option value="ta">TA</option>
                        </select>
                        <button type="submit">Add User</button>
                    </form>
                    <ul>
                        {users.map(u => <li key={u.id}>{u.username} - {u.role}</li>)}
                    </ul>
                </div>
            )}

            {activeTab === "courses" && (
                <div>
                    <h3>Courses</h3>
                    <form onSubmit={handleAddCourse} style={{ marginBottom: "20px" }}>
                        <input placeholder="Code" value={newCourse.code} onChange={e => setNewCourse({ ...newCourse, code: e.target.value })} />
                        <input placeholder="Name" value={newCourse.name} onChange={e => setNewCourse({ ...newCourse, name: e.target.value })} />
                        <input type="number" placeholder="Credit Hours" value={newCourse.credit_hours} onChange={e => setNewCourse({ ...newCourse, credit_hours: e.target.value })} />
                        <input placeholder="Semester" value={newCourse.semester} onChange={e => setNewCourse({ ...newCourse, semester: e.target.value })} />
                        <button type="submit">Add Course</button>
                    </form>
                    <ul>
                        {courses.map(c => <li key={c.id}>{c.code} - {c.name} ({c.credit_hours}h) | {c.semester}</li>)}
                    </ul>
                </div>
            )}

            {activeTab === "students" && (
                <div>
                    <h3>Students</h3>
                    <ul>{students.map(s => <li key={s.id}>{s.first_name} {s.last_name} | {s.enrollment_number}</li>)}</ul>
                </div>
            )}

            {activeTab === "feeRecords" && (
                <div>
                    <h3>Fee Records</h3>
                    <ul>
                        {feeRecords.map(f => (
                            <li key={f.id}>{f.student_name} | Semester {f.semester} | Total: {f.total_fee} | Paid: {f.paid_amount} | Due: {f.due_amount}</li>
                        ))}
                    </ul>
                </div>
            )}

            {activeTab === "payments" && (
                <div>
                    <h3>Payments</h3>
                    <ul>
                        {payments.map(p => (
                            <li key={p.id}>{p.fee_record.student_name} | Amount: {p.amount} | Method: {p.payment_method} | Date: {p.payment_date}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
