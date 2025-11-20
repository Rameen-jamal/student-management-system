// // frontend/src/App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./Login";
// import AdminDashboard from "./AdminDashboard";
// import FacultyDashboard from "./FacultyDashboard";
// import TADashboard from "./TADashboard";
// import Dashboard from "./Dashboard"; // Student dashboard

// // Role-based Private Route
// const PrivateRoute = ({ children, allowedRoles }) => {
//     const token = localStorage.getItem("access_token");
//     const role = localStorage.getItem("role");

//     if (!token) return <Navigate to="/" />; // Not logged in
//     if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" />; // Role mismatch

//     return children;
// };

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Login />} />

//                 {/* Admin Dashboard */}
//                 <Route
//                     path="/admin"
//                     element={
//                         <PrivateRoute allowedRoles={['admin']}>
//                             <AdminDashboard />
//                         </PrivateRoute>
//                     }
//                 />

//                 {/* Faculty Dashboard */}
//                 <Route
//                     path="/faculty"
//                     element={
//                         <PrivateRoute allowedRoles={['faculty']}>
//                             <FacultyDashboard />
//                         </PrivateRoute>
//                     }
//                 />

//                 {/* TA Dashboard */}
//                 <Route
//                     path="/ta"
//                     element={
//                         <PrivateRoute allowedRoles={['ta']}>
//                             <TADashboard />
//                         </PrivateRoute>
//                     }
//                 />

//                 {/* Student Dashboard */}
//                 <Route
//                     path="/student"
//                     element={
//                         <PrivateRoute allowedRoles={['student']}>
//                             <Dashboard />
//                         </PrivateRoute>
//                     }
//                 />

//                 {/* Fallback route */}
//                 <Route path="*" element={<Navigate to="/" />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import FacultyDashboard from "./FacultyDashboard";
import TADashboard from "./TADashboard";
import Dashboard from "./Dashboard"; // Student dashboard
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login />} />

        {/* Protected / role-based routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/faculty"
          element={
            <PrivateRoute allowedRoles={['faculty']}>
              <FacultyDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/ta"
          element={
            <PrivateRoute allowedRoles={['ta']}>
              <TADashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/student"
          element={
            <PrivateRoute allowedRoles={['student']}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
